import client from "@/lib/strapi";
import InseedPartnersSwiper from "@/components/base/InseedPartnersSwiper";

export default async function InseedPartners() {
  const partners = client.collection("partners");

  const { data: listPartners } = await partners.find({
    sort: "createdAt:asc",

    populate: {
      image: {
        fields: ["name", "url"],
      },
    },
  });

  if (!listPartners.length) return;

  const data = listPartners.map((partner, index) => {
    return {
      id: partner.id,
      name: partner.name,
      url: partner.url,
      image: partner.image?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${partner.image.url}`
        : "/416x312.svg",
    };
  });

  return (
    <section className="px-15 pb-15 mt-10 overflow-hidden mb-15">
      <div className="container m-auto" data-aos="fade-up">
        <div className="text-center pb-15">
          <h2 className="text-4xl font-semibold mb-5 pb-5 relative font-montserrat after:content-[''] after:absolute after:block after:w-[50px] after:h-[3px] after:bg-primary after:left-0 after:right-0 after:bottom-0 after:m-auto">
            Les partenaires de l'INSEED
          </h2>
        </div>
        <InseedPartnersSwiper data={data} />
      </div>
    </section>
  );
}
