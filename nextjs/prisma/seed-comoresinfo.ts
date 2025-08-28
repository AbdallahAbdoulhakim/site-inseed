import prisma from "@/lib/prisma";
import Papa from "papaparse";

import * as fsp from "node:fs/promises";

interface TimePeriodData {
  TimePeriod_NId: string;
  TimePeriod: string;
}

interface UnitData {
  Unit_NId: string;
  Unit_Name: string;
  Unit_GId: string;
  Unit_Global: string;
}

interface SubGroupTypeData {
  Subgroup_Type_NId: string;
  Subgroup_Type_Name: string;
  Subgroup_Type_GId: string;
  Subgroup_Type_Order: string;
  Subgroup_Type_Global: string;
}

interface SubGroupData {
  Subgroup_NId: string;
  Subgroup_Name: string;
  Subgroup_GId: string;
  Subgroup_Global: string;
  Subgroup_Type: string;
}

interface SubGroupValData {
  Subgroup_Val_NId: string;
  Subgroup_Val: string;
  Subgroup_Val_GId: string;
  Subgroup_Val_Global: string;
}

interface SubGroupValSubGroupData {
  Subgroup_Val_Subgroup_NId: string;
  Subgroup_Val_NId: string;
  Subgroup_NId: string;
}

interface IndicatorClassificationData {
  IC_NId: string;
  IC_Parent_GId: string;
  IC_GId: string;
  IC_Name: string;
  IC_Global: string;
  IC_Info: string;
  IC_Type: "SR" | "GL" | "SC";
}

interface IndicatorData {
  Indicator_NId: string;
  Indicator_Name: string;
  Indicator_GId: string;
  Indicator_Info: string;
  Indicator_Global: string;
}

interface IUSData {
  IUSNId: string;
  Unit_GId: string;
  Subgroup_Val_GId: string;
  Indicator_GId: string;
}

interface ICIUSData {
  IC_IUSNId: string;
  IC_NId: string;
  IC_GId: string;
  IUSNId: string;
  Indicator_GId: string;
  Unit_GId: string;
  Subgroup_Val_GId: string;
  RecommendedSource: string;
  IC_IUS_Order: string;
  IC_IUS_Label: string;
}

interface AgePeriodData {
  AgePeriod_NId: string;
  AgePeriod: string;
}

interface AreaLevelData {
  Level_NId: string;
  Area_Level: string;
  Area_Level_Name: string;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("*****Comores INFO - SEED*****");

  const csvTimePeriod = await fsp.readFile(
    "./src/infos/UT_TimePeriod.txt",
    "utf-8"
  );

  const csvUnit = await fsp.readFile("./src/infos/UT_Unit_fr.txt", "utf-8");

  const csvSubgroupType = await fsp.readFile(
    "./src/infos/UT_Subgroup_Type_fr.txt",
    "utf-8"
  );

  const csvSubgroup = await fsp.readFile(
    "./src/infos/UT_Subgroup_fr.txt",
    "utf-8"
  );

  const csvSubgroupVal = await fsp.readFile(
    "./src/infos/UT_Subgroup_Vals_fr.txt",
    "utf-8"
  );

  const csvSubgroupValSubGroups = await fsp.readFile(
    "./src/infos/UT_Subgroup_Vals_Subgroup.txt",
    "utf-8"
  );

  const csvIndicatorClassificationsLev1 = await fsp.readFile(
    "./src/infos/UT_Indicator_Classifications_level_1.txt",
    "utf-8"
  );

  const csvIndicatorClassificationsLev2 = await fsp.readFile(
    "./src/infos/UT_Indicator_Classifications_level_2.txt",
    "utf-8"
  );

  const csvIndicatorClassificationsLev3 = await fsp.readFile(
    "./src/infos/UT_Indicator_Classifications_level_3.txt",
    "utf-8"
  );

  const csvIndicatorClassificationsLev4 = await fsp.readFile(
    "./src/infos/UT_Indicator_Classifications_level_4.txt",
    "utf-8"
  );

  const csvIndicators = await fsp.readFile(
    "./src/infos/UT_Indicator_fr.txt",
    "utf-8"
  );

  const csvIUS = await fsp.readFile(
    "./src/infos/UT_Indicator_Unit_Subgroup.txt",
    "utf-8"
  );

  const csvICIUS = await fsp.readFile(
    "./src/infos/UT_Indicator_Classifications_IUS.txt",
    "utf-8"
  );

  const csvAgePeriod = await fsp.readFile(
    "./src/infos/UT_AgePeriod_fr.txt",
    "utf-8"
  );

  // TimePeriod SEED
  Papa.parse<TimePeriodData>(csvTimePeriod, {
    header: true,
    complete: (results) => {
      const rows: TimePeriodData[] = results.data;

      rows.forEach(async (row) => {
        if (!row.TimePeriod_NId) return;
        await prisma.timePeriod.upsert({
          where: {
            TimePeriod: row.TimePeriod,
          },
          create: {
            TimePeriod: row.TimePeriod,
          },
          update: {
            TimePeriod: row.TimePeriod,
          },
        });
      });
    },
  });

  // Unit Seed

  Papa.parse<UnitData>(csvUnit, {
    header: true,
    complete: (results) => {
      const rows: UnitData[] = results.data;

      rows.forEach(async (row) => {
        if (!row.Unit_NId) return;

        await prisma.unit.upsert({
          where: {
            Unit_Name: row.Unit_Name,
          },
          create: {
            Unit_NId: parseInt(row.Unit_NId),
            Unit_Name: row.Unit_Name,
            Unit_Global: row.Unit_Global === "0" ? false : true,
            Unit_GId: row.Unit_GId,
          },
          update: {
            Unit_NId: parseInt(row.Unit_NId),
            Unit_Name: row.Unit_Name,
            Unit_Global: row.Unit_Global === "0" ? false : true,
            Unit_GId: row.Unit_GId,
          },
        });
      });
    },
  });

  // Subgroup_Type Seed

  Papa.parse<SubGroupTypeData>(csvSubgroupType, {
    header: true,
    complete: (results) => {
      const rows: SubGroupTypeData[] = results.data;

      rows.forEach(async (row) => {
        if (!row.Subgroup_Type_NId) return;

        await prisma.subGroupType.upsert({
          where: {
            Subgroup_Type_Name: row.Subgroup_Type_Name,
          },
          create: {
            Subgroup_Type_NId: parseInt(row.Subgroup_Type_NId),
            Subgroup_Type_Name: row.Subgroup_Type_Name,
            Subgroup_Type_Order: parseInt(row.Subgroup_Type_Order),
            Subgroup_Type_GId: row.Subgroup_Type_GId,
            Subgroup_Type_Global:
              row.Subgroup_Type_Global === "0" ? false : true,
          },
          update: {
            Subgroup_Type_NId: parseInt(row.Subgroup_Type_NId),
            Subgroup_Type_Name: row.Subgroup_Type_Name,
            Subgroup_Type_Order: parseInt(row.Subgroup_Type_Order),
            Subgroup_Type_GId: row.Subgroup_Type_GId,
            Subgroup_Type_Global:
              row.Subgroup_Type_Global === "0" ? false : true,
          },
        });
      });
    },
  });

  // SubGroup SEED

  Papa.parse<SubGroupData>(csvSubgroup, {
    header: true,
    complete: (results) => {
      const rows: SubGroupData[] = results.data;

      rows.forEach(async (row) => {
        if (!row.Subgroup_NId) return;
        await prisma.subGroup.upsert({
          where: {
            Subgroup_Name: row.Subgroup_Name,
          },
          create: {
            Subgroup_NId: parseInt(row.Subgroup_NId),
            Subgroup_Name: row.Subgroup_Name,
            Subgroup_Type: parseInt(row.Subgroup_Type),
            Subgroup_GId: row.Subgroup_GId,
            Subgroup_Global: row.Subgroup_Global === "0" ? false : true,
          },
          update: {
            Subgroup_NId: parseInt(row.Subgroup_NId),
            Subgroup_Name: row.Subgroup_Name,
            Subgroup_Type: parseInt(row.Subgroup_Type),
            Subgroup_GId: row.Subgroup_GId,
            Subgroup_Global: row.Subgroup_Global === "0" ? false : true,
          },
        });
      });
    },
  });

  // SubGroup Val SEED

  Papa.parse<SubGroupValData>(csvSubgroupVal, {
    header: true,
    complete: (results) => {
      const rows: SubGroupValData[] = results.data;

      rows.forEach(async (row) => {
        if (!row.Subgroup_Val_NId) return;
        await prisma.subgroupVal.upsert({
          where: {
            Subgroup_Val: row.Subgroup_Val,
          },
          create: {
            Subgroup_Val_NId: parseInt(row.Subgroup_Val_NId),
            Subgroup_Val: row.Subgroup_Val,
            Subgroup_Val_GId: row.Subgroup_Val_GId,
            Subgroup_Val_Global: row.Subgroup_Val_Global === "0" ? false : true,
          },
          update: {
            Subgroup_Val_NId: parseInt(row.Subgroup_Val_NId),
            Subgroup_Val: row.Subgroup_Val,
            Subgroup_Val_GId: row.Subgroup_Val_GId,
            Subgroup_Val_Global: row.Subgroup_Val_Global === "0" ? false : true,
          },
        });
      });
    },
  });

  // Indicator Classifications level -1

  Papa.parse<IndicatorClassificationData>(csvIndicatorClassificationsLev1, {
    header: true,
    delimiter: ";",
    complete: (results) => {
      const rows: IndicatorClassificationData[] = results.data;

      rows.forEach(async (row) => {
        await delay(1000);
        if (!row.IC_NId || !row.IC_GId) return;

        await prisma.indicatorClassification.upsert({
          where: {
            IC_GId: row.IC_GId,
          },
          create: {
            IC_GId: row.IC_GId,
            IC_Name: row.IC_Name,
            IC_Global: row.IC_Global === "TRUE" ? true : false,
            IC_Type: row.IC_Type,
            IC_Info: row.IC_Info,
          },
          update: {
            IC_GId: row.IC_GId,
            IC_Name: row.IC_Name,
            IC_Global: row.IC_Global === "TRUE" ? true : false,
            IC_Type: row.IC_Type,
            IC_Info: row.IC_Info,
          },
        });
      });
    },
  });

  // Indicator Classifications level -2

  Papa.parse<IndicatorClassificationData>(csvIndicatorClassificationsLev2, {
    header: true,
    delimiter: ";",
    complete: (results) => {
      const rows: IndicatorClassificationData[] = results.data;

      rows.forEach(async (row) => {
        await delay(1000);
        if (!row.IC_NId || !row.IC_GId) return;

        const parent = await prisma.indicatorClassification.findFirst({
          where: {
            IC_GId: row.IC_Parent_GId,
          },
        });

        await delay(1000);
        await prisma.indicatorClassification.upsert({
          where: {
            IC_GId: row.IC_GId,
          },
          create: {
            IC_GId: row.IC_GId,
            IC_Name: row.IC_Name,
            IC_Global: row.IC_Global === "TRUE" ? true : false,
            IC_Type: row.IC_Type,
            IC_Info: row.IC_Info,
            IC_Parent_NId: parent?.IC_NId,
          },
          update: {
            IC_GId: row.IC_GId,
            IC_Name: row.IC_Name,
            IC_Global: row.IC_Global === "TRUE" ? true : false,
            IC_Type: row.IC_Type,
            IC_Info: row.IC_Info,
            IC_Parent_NId: parent?.IC_NId,
          },
        });
      });
    },
  });

  await delay(5000);

  // Indicator Classifications level -3

  Papa.parse<IndicatorClassificationData>(csvIndicatorClassificationsLev3, {
    header: true,
    delimiter: ";",
    complete: (results) => {
      const rows: IndicatorClassificationData[] = results.data;

      rows.forEach(async (row) => {
        await delay(2000);
        if (!row.IC_NId || !row.IC_GId) return;

        const parent = await prisma.indicatorClassification.findFirst({
          where: {
            IC_GId: row.IC_Parent_GId,
          },
        });

        await delay(2000);

        await prisma.indicatorClassification.upsert({
          where: {
            IC_GId: row.IC_GId,
          },
          create: {
            IC_GId: row.IC_GId,
            IC_Name: row.IC_Name,
            IC_Global: row.IC_Global === "TRUE" ? true : false,
            IC_Type: row.IC_Type,
            IC_Info: row.IC_Info,
            IC_Parent_NId: parent?.IC_NId,
          },
          update: {
            IC_GId: row.IC_GId,
            IC_Name: row.IC_Name,
            IC_Global: row.IC_Global === "TRUE" ? true : false,
            IC_Type: row.IC_Type,
            IC_Info: row.IC_Info,
            IC_Parent_NId: parent?.IC_NId,
          },
        });
      });
    },
  });

  await delay(5000);

  // Indicator Classifications level -4

  Papa.parse<IndicatorClassificationData>(csvIndicatorClassificationsLev4, {
    header: true,
    delimiter: ";",
    complete: (results) => {
      const rows: IndicatorClassificationData[] = results.data;

      rows.forEach(async (row) => {
        await delay(5000);
        if (!row.IC_NId || !row.IC_GId) return;

        const parent = await prisma.indicatorClassification.findFirst({
          where: {
            IC_GId: row.IC_Parent_GId,
          },
        });

        await delay(5000);

        await prisma.indicatorClassification.upsert({
          where: {
            IC_GId: row.IC_GId,
          },
          create: {
            IC_GId: row.IC_GId,
            IC_Name: row.IC_Name,
            IC_Global: row.IC_Global === "TRUE" ? true : false,
            IC_Type: row.IC_Type,
            IC_Info: row.IC_Info,
            IC_Parent_NId: parent?.IC_NId,
          },
          update: {
            IC_GId: row.IC_GId,
            IC_Name: row.IC_Name,
            IC_Global: row.IC_Global === "TRUE" ? true : false,
            IC_Type: row.IC_Type,
            IC_Info: row.IC_Info,
            IC_Parent_NId: parent?.IC_NId,
          },
        });
      });
    },
  });

  // Indicators

  Papa.parse<IndicatorData>(csvIndicators, {
    header: true,
    delimiter: ";",
    complete: (results) => {
      const rows: IndicatorData[] = results.data;

      rows.forEach(async (row) => {
        await delay(1000);
        if (!row.Indicator_NId) return;

        await prisma.indicator.upsert({
          where: {
            Indicator_GId: row.Indicator_GId,
          },
          create: {
            Indicator_GId: row.Indicator_GId,
            Indicator_Info: row.Indicator_Info,
            Indictor_Name: row.Indicator_Name,
            Indicator_Global: row.Indicator_Global === "0" ? true : false,
          },
          update: {
            Indicator_GId: row.Indicator_GId,
            Indicator_Info: row.Indicator_Info,
            Indictor_Name: row.Indicator_Name,
            Indicator_Global: row.Indicator_Global === "0" ? true : false,
          },
        });
      });
    },
  });

  // IUS
  Papa.parse<IUSData>(csvIUS, {
    header: true,
    complete: (results) => {
      const rows: IUSData[] = results.data;

      rows.forEach(async (row) => {
        await delay(1000);
        if (!row.IUSNId) return;

        const [indicator, unit, subgroup] = await prisma.$transaction([
          prisma.indicator.findFirst({
            where: { Indicator_GId: row.Indicator_GId },
          }),
          prisma.unit.findFirst({
            where: { Unit_GId: row.Unit_GId },
          }),
          prisma.subgroupVal.findFirst({
            where: { Subgroup_Val_GId: row.Subgroup_Val_GId },
          }),
        ]);

        if (!indicator || !unit || !subgroup) return;

        await delay(1000);

        await prisma.iUS.upsert({
          where: {
            IUSNId: parseInt(row.IUSNId),
          },
          update: {
            Indicator_NId: indicator?.Indicator_NId,
            Unit_NId: unit.Unit_NId,
            Subgroup_Val_NId: subgroup.Subgroup_Val_NId,
          },
          create: {
            Indicator_NId: indicator?.Indicator_NId,
            Unit_NId: unit.Unit_NId,
            Subgroup_Val_NId: subgroup.Subgroup_Val_NId,
          },
        });
      });
    },
  });

  //IUS Indicator Classification

  Papa.parse<ICIUSData>(csvICIUS, {
    header: true,
    complete: (results) => {
      const rows: ICIUSData[] = results.data;

      rows.forEach(async (row) => {
        await delay(3000);
        if (!row.IC_IUSNId) return;

        const [ic, ius] = await prisma.$transaction([
          prisma.indicatorClassification.findFirst({
            where: {
              IC_GId: row.IC_GId,
            },
          }),
          prisma.iUS.findFirst({
            where: {
              AND: [
                {
                  Indicator: {
                    Indicator_GId: row.Indicator_GId,
                  },
                },
                {
                  SubgroupVal: {
                    Subgroup_Val_GId: row.Subgroup_Val_GId,
                  },
                },
                {
                  Unit: {
                    Unit_GId: row.Unit_GId,
                  },
                },
              ],
            },
          }),
        ]);

        if (!ic || !ius) return;

        await delay(3000);

        await prisma.iUSIndicatorClassification.create({
          data: {
            IC_NId: ic?.IC_NId,
            IUSNId: ius?.IUSNId,
          },
        });
      });
    },
  });

  // SubGroup Subgroup_Val SEED
  /*
  Papa.parse<SubGroupValSubGroupData>(csvSubgroupValSubGroups, {
    header: true,
    complete: (results) => {
      const rows: SubGroupValSubGroupData[] = results.data;

      rows.forEach(async (row) => {
        if (!row.Subgroup_Val_Subgroup_NId) return;

        await prisma.subGroupValSubgroups.upsert({
          where: {
            id: parseInt(row.Subgroup_Val_Subgroup_NId),
          },
          create: {
            Subgroup_Val_NId: parseInt(row.Subgroup_Val_NId),
            Subgroup_NId: parseInt(row.Subgroup_NId),
          },
          update: {
            Subgroup_Val_NId: parseInt(row.Subgroup_Val_NId),
            Subgroup_NId: parseInt(row.Subgroup_NId),
          },
        });
      });
    },
  });
  */

  // Age Period SEED
  Papa.parse<AgePeriodData>(csvAgePeriod, {
    header: true,
    complete: (results) => {
      const rows: AgePeriodData[] = results.data;
      rows.forEach(async (row) => {
        if (!row.AgePeriod_NId) return;

        await prisma.agePeriod.create({
          data: {
            AgePeriod: row.AgePeriod,
          },
        });
      });
    },
  });

  // Area Level SEED

  const areaLevels = [
    {
      Level_NId: 1,
      Area_Level: 1,
      Area_Level_Name: "Level-1",
    },
    {
      Level_NId: 2,
      Area_Level: 2,
      Area_Level_Name: "Level-2",
    },
    {
      Level_NId: 3,
      Area_Level: 3,
      Area_Level_Name: "Level-3",
    },
    {
      Level_NId: 4,
      Area_Level: 4,
      Area_Level_Name: "Level-4",
    },
    {
      Level_NId: 5,
      Area_Level: 5,
      Area_Level_Name: "Level-5",
    },
  ];

  areaLevels.forEach(async (row) => {
    if (!row.Level_NId) {
      console.log(row);
      return;
    }
    await prisma.areaLevel.create({
      data: {
        Area_Level: row.Area_Level,
        Area_Level_Name: row.Area_Level_Name,
      },
    });

    await delay(1000);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
