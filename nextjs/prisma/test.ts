import prisma from "@/lib/prisma";

import Papa from "papaparse";

import * as fsp from "node:fs/promises";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface AreaLevelData {
  Level_NId: string;
  Area_Level: string;
  Area_Level_Name: string;
}
interface AreaData {
  Area_NId: string;
  Area_Parent_NId: string;
  Area_ID: string;
  Area_Name: string;
  Area_GId: string;
  Area_Level: string;
  Area_Map: string;
  Area_Block: string;
  Area_Global: string;
}

const main = async () => {
  const csvAreaLevel1 = await fsp.readFile(
    "./src/infos/UT_Area_fr_level-1.txt",
    "utf-8"
  );
  const csvAreaLevel2 = await fsp.readFile(
    "./src/infos/UT_Area_fr_level-2.txt",
    "utf-8"
  );
  const csvAreaLevel3 = await fsp.readFile(
    "./src/infos/UT_Area_fr_level-3.txt",
    "utf-8"
  );
  const csvAreaLevel4 = await fsp.readFile(
    "./src/infos/UT_Area_fr_level-4.txt",
    "utf-8"
  );
  const csvAreaLevel5 = await fsp.readFile(
    "./src/infos/UT_Area_fr_level-5.txt",
    "utf-8"
  );

  // Area Seed

  await prisma.area.deleteMany();

  await delay(3000);

  Papa.parse<AreaData>(csvAreaLevel1, {
    header: true,
    complete: (results) => {
      const rows: AreaData[] = results.data;

      rows.forEach(async (row) => {
        if (!row.Area_NId) return;

        console.log(row);
      });
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
