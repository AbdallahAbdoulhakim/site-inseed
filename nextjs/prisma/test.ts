import prisma from "@/lib/prisma";




function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



const main = async () => {

  const arr = await prisma.indicatorClassification.findFirst({
    where:{
      IC_GId:"EA58CD83-9AB1-42A1-8FA4-6C1EE05A4817"
    },
    include:{
      children:{
        include:{
          children:true
        }
      }
    }
  })

  console.log(arr)

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
