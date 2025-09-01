import client from "@/lib/strapi";
import { truncateString } from "@/lib/miscellaneous";
import LatestPublicationsSwiper from "@/components/base/LatestPublicationsSwiper";

export default async function LatestPublications() {
  const publications = client.collection("publications");

  const { data: latestPublications } = await publications.find({
    sort: "parutionDate:desc",
    pagination: {
      limit: 10,
    },
  });

  if (!latestPublications.length) return;

  const data = latestPublications.map((publication, index) => {
    return {
      id: publication.id,
      type: publication.type,
      title: truncateString(publication.title, 150),
      publicationSlug: `/publications/${publication.publicationSlug}`,
      publicationDate: publication.parutionDate
        ? publication.parutionDate
        : publication.createdAt,
      delay: (index + 1) * 100,
    };
  });

  return (
    <section className="px-15 pb-15 mt-10 overflow-hidden mb-15">
      <div className="container m-auto" data-aos="fade-up">
        <div className="text-center pb-15">
          <h2 className="text-4xl font-semibold mb-5 pb-5 relative font-montserrat after:content-[''] after:absolute after:block after:w-[50px] after:h-[3px] after:bg-primary after:left-0 after:right-0 after:bottom-0 after:m-auto">
            Dernières Publications
          </h2>
        </div>

        <LatestPublicationsSwiper data={data} />
      </div>
    </section>
  );
}
