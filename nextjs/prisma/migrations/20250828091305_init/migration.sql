-- CreateEnum
CREATE TYPE "public"."ICType" AS ENUM ('GL', 'SC', 'SR');

-- CreateTable
CREATE TABLE "public"."MenuItem" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "description" VARCHAR(500),
    "url" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "parentId" TEXT,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TimePeriod" (
    "TimePeriod_NId" SERIAL NOT NULL,
    "TimePeriod" TEXT NOT NULL,

    CONSTRAINT "TimePeriod_pkey" PRIMARY KEY ("TimePeriod_NId")
);

-- CreateTable
CREATE TABLE "public"."Unit" (
    "Unit_NId" SERIAL NOT NULL,
    "Unit_Name" TEXT NOT NULL,
    "Unit_GId" TEXT NOT NULL,
    "Unit_Global" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("Unit_NId")
);

-- CreateTable
CREATE TABLE "public"."SubGroupType" (
    "Subgroup_Type_NId" SERIAL NOT NULL,
    "Subgroup_Type_Name" TEXT NOT NULL,
    "Subgroup_Type_GId" TEXT NOT NULL,
    "Subgroup_Type_Order" SERIAL NOT NULL,
    "Subgroup_Type_Global" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SubGroupType_pkey" PRIMARY KEY ("Subgroup_Type_NId")
);

-- CreateTable
CREATE TABLE "public"."SubGroup" (
    "Subgroup_NId" SERIAL NOT NULL,
    "Subgroup_Name" TEXT NOT NULL,
    "Subgroup_GId" TEXT NOT NULL,
    "Subgroup_Global" BOOLEAN NOT NULL DEFAULT false,
    "Subgroup_Type" INTEGER,

    CONSTRAINT "SubGroup_pkey" PRIMARY KEY ("Subgroup_NId")
);

-- CreateTable
CREATE TABLE "public"."SubgroupVal" (
    "Subgroup_Val_NId" SERIAL NOT NULL,
    "Subgroup_Val" TEXT NOT NULL,
    "Subgroup_Val_GId" TEXT NOT NULL,
    "Subgroup_Val_Global" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SubgroupVal_pkey" PRIMARY KEY ("Subgroup_Val_NId")
);

-- CreateTable
CREATE TABLE "public"."SubGroupValSubgroups" (
    "id" SERIAL NOT NULL,
    "Subgroup_Val_NId" INTEGER,
    "Subgroup_NId" INTEGER,

    CONSTRAINT "SubGroupValSubgroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."IndicatorClassification" (
    "IC_NId" SERIAL NOT NULL,
    "IC_GId" TEXT NOT NULL,
    "IC_Name" TEXT NOT NULL,
    "IC_Global" BOOLEAN NOT NULL DEFAULT false,
    "IC_Info" TEXT,
    "IC_Type" "public"."ICType" NOT NULL DEFAULT 'GL',
    "IC_Parent_NId" INTEGER,

    CONSTRAINT "IndicatorClassification_pkey" PRIMARY KEY ("IC_NId")
);

-- CreateTable
CREATE TABLE "public"."Indicator" (
    "Indicator_NId" SERIAL NOT NULL,
    "Indictor_Name" TEXT NOT NULL,
    "Indicator_GId" TEXT NOT NULL,
    "Indicator_Info" TEXT NOT NULL,
    "Indicator_Global" BOOLEAN NOT NULL,

    CONSTRAINT "Indicator_pkey" PRIMARY KEY ("Indicator_NId")
);

-- CreateTable
CREATE TABLE "public"."IUS" (
    "IUSNId" SERIAL NOT NULL,
    "Indicator_NId" INTEGER NOT NULL,
    "Unit_NId" INTEGER NOT NULL,
    "Subgroup_Val_NId" INTEGER NOT NULL,
    "Min_Value" INTEGER,
    "Max_Value" INTEGER,

    CONSTRAINT "IUS_pkey" PRIMARY KEY ("IUSNId")
);

-- CreateTable
CREATE TABLE "public"."IUSIndicatorClassification" (
    "IC_IUSNId" SERIAL NOT NULL,
    "IC_NId" INTEGER NOT NULL,
    "IUSNId" INTEGER NOT NULL,
    "IC_IUS_Order" INTEGER,
    "IC_IUS_Label" TEXT,
    "RecommendedSource" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "IUSIndicatorClassification_pkey" PRIMARY KEY ("IC_IUSNId")
);

-- CreateTable
CREATE TABLE "public"."AgePeriod" (
    "AgePeriod_NId" SERIAL NOT NULL,
    "AgePeriod" TEXT NOT NULL,

    CONSTRAINT "AgePeriod_pkey" PRIMARY KEY ("AgePeriod_NId")
);

-- CreateTable
CREATE TABLE "public"."AreaLevel" (
    "Level_NId" SERIAL NOT NULL,
    "Area_Level" INTEGER NOT NULL,
    "Area_Level_Name" TEXT NOT NULL,

    CONSTRAINT "AreaLevel_pkey" PRIMARY KEY ("Level_NId")
);

-- CreateTable
CREATE TABLE "public"."Area" (
    "Area_NId" SERIAL NOT NULL,
    "Area_ID" TEXT NOT NULL,
    "Area_Name" TEXT NOT NULL,
    "Area_GId" TEXT NOT NULL,
    "Area_Level" INTEGER NOT NULL,
    "AreaMap" TEXT,
    "AreaBlock" TEXT,
    "Area_Global" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("Area_NId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimePeriod_TimePeriod_key" ON "public"."TimePeriod"("TimePeriod");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_Unit_Name_key" ON "public"."Unit"("Unit_Name");

-- CreateIndex
CREATE UNIQUE INDEX "SubGroupType_Subgroup_Type_Name_key" ON "public"."SubGroupType"("Subgroup_Type_Name");

-- CreateIndex
CREATE UNIQUE INDEX "SubGroupType_Subgroup_Type_Order_key" ON "public"."SubGroupType"("Subgroup_Type_Order");

-- CreateIndex
CREATE UNIQUE INDEX "SubGroup_Subgroup_Name_key" ON "public"."SubGroup"("Subgroup_Name");

-- CreateIndex
CREATE UNIQUE INDEX "SubgroupVal_Subgroup_Val_key" ON "public"."SubgroupVal"("Subgroup_Val");

-- CreateIndex
CREATE UNIQUE INDEX "IndicatorClassification_IC_GId_key" ON "public"."IndicatorClassification"("IC_GId");

-- CreateIndex
CREATE UNIQUE INDEX "Indicator_Indicator_GId_key" ON "public"."Indicator"("Indicator_GId");

-- CreateIndex
CREATE UNIQUE INDEX "AgePeriod_AgePeriod_key" ON "public"."AgePeriod"("AgePeriod");

-- CreateIndex
CREATE UNIQUE INDEX "AreaLevel_Area_Level_key" ON "public"."AreaLevel"("Area_Level");

-- CreateIndex
CREATE UNIQUE INDEX "AreaLevel_Area_Level_Name_key" ON "public"."AreaLevel"("Area_Level_Name");

-- CreateIndex
CREATE UNIQUE INDEX "Area_Area_ID_key" ON "public"."Area"("Area_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Area_Area_GId_key" ON "public"."Area"("Area_GId");

-- AddForeignKey
ALTER TABLE "public"."MenuItem" ADD CONSTRAINT "MenuItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."MenuItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubGroup" ADD CONSTRAINT "SubGroup_Subgroup_Type_fkey" FOREIGN KEY ("Subgroup_Type") REFERENCES "public"."SubGroupType"("Subgroup_Type_NId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubGroupValSubgroups" ADD CONSTRAINT "SubGroupValSubgroups_Subgroup_Val_NId_fkey" FOREIGN KEY ("Subgroup_Val_NId") REFERENCES "public"."SubgroupVal"("Subgroup_Val_NId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubGroupValSubgroups" ADD CONSTRAINT "SubGroupValSubgroups_Subgroup_NId_fkey" FOREIGN KEY ("Subgroup_NId") REFERENCES "public"."SubGroup"("Subgroup_NId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."IndicatorClassification" ADD CONSTRAINT "IndicatorClassification_IC_Parent_NId_fkey" FOREIGN KEY ("IC_Parent_NId") REFERENCES "public"."IndicatorClassification"("IC_NId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."IUS" ADD CONSTRAINT "IUS_Indicator_NId_fkey" FOREIGN KEY ("Indicator_NId") REFERENCES "public"."Indicator"("Indicator_NId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."IUS" ADD CONSTRAINT "IUS_Unit_NId_fkey" FOREIGN KEY ("Unit_NId") REFERENCES "public"."Unit"("Unit_NId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."IUS" ADD CONSTRAINT "IUS_Subgroup_Val_NId_fkey" FOREIGN KEY ("Subgroup_Val_NId") REFERENCES "public"."SubgroupVal"("Subgroup_Val_NId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."IUSIndicatorClassification" ADD CONSTRAINT "IUSIndicatorClassification_IC_NId_fkey" FOREIGN KEY ("IC_NId") REFERENCES "public"."IndicatorClassification"("IC_NId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."IUSIndicatorClassification" ADD CONSTRAINT "IUSIndicatorClassification_IUSNId_fkey" FOREIGN KEY ("IUSNId") REFERENCES "public"."IUS"("IUSNId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Area" ADD CONSTRAINT "Area_Area_Level_fkey" FOREIGN KEY ("Area_Level") REFERENCES "public"."AreaLevel"("Area_Level") ON DELETE RESTRICT ON UPDATE CASCADE;
