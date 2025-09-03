import prisma from "@/lib/prisma";


function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



const main = async () => {



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
