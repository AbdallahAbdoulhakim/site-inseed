import client from "@/lib/strapi";
import KeyIndicatorsSwiper from "@/components/base/KeyIndicatorsSwiper";

export default async function KeyIndicators() {
  const keyIndictors = client.collection("key-indicators");

  const { data: listIndicators } = await keyIndictors.find({
    sort: "date:desc",

    populate: {
      dataFile: {
        fields: ["name", "url"],
      },
    },
  });

  if (!listIndicators.length) return;

  const data = listIndicators.map((indicator, index) => {
    return {
      id: indicator.id,
      title: indicator.title,
      subtitle: indicator.subtitle,
      legend: indicator.legend,
      yAxisLegend: indicator.yAxisLegend,
      xAxisLegend: indicator.xAxisLegend,
      dataUrl: indicator.dataFile?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${indicator.dataFile.url}`
        : indicator.dataUrl,
      delay: (index + 1) * 100,
    };
  });

  return (
    <section className="md:px-15 pb-15 mt-10 overflow-hidden mb-15">
      <div className="container m-auto" data-aos="fade-up">
        <div className="text-center pb-15">
          <h2 className="text-4xl font-semibold mb-5 pb-5 relative font-montserrat after:content-[''] after:absolute after:block after:w-[50px] after:h-[3px] after:bg-primary after:left-0 after:right-0 after:bottom-0 after:m-auto">
            Indicateurs Clés
          </h2>
        </div>
        <KeyIndicatorsSwiper data={data} />
      </div>
    </section>
  );
}
