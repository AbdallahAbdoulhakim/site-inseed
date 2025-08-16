import client from "@/lib/strapi";
import LatestArticle from "@/components/base/LatestArticle";

export default async function Actualites() {
  const articles = client.collection("articles");

  const { data: latestArticles } = await articles.find({
    sort: "publicationDate:desc",
    pagination: {
      limit: 3,
    },
    populate: {
      thumbnail: {
        fields: ["name", "url"],
      },
      category: {
        fields: ["name", "slug"],
      },
      author: {
        fields: ["name"],
        populate: {
          image: {
            fields: ["name", "url"],
          },
        },
      },
    },
  });

  if (!latestArticles.length) return;
  return (
    <section id="team" className="px-15 pb-15 mt-10 overflow-hidden mb-15">
      <div className="container m-auto" data-aos="fade-up">
        <div className="text-center pb-15">
          <h2 className="text-4xl font-semibold mb-5 pb-5 relative font-montserrat after:content-[''] after:absolute after:block after:w-[50px] after:h-[3px] after:bg-primary after:left-0 after:right-0 after:bottom-0 after:m-auto">
            Actualités
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
          {latestArticles.map((article, index) => {
            console.log(article);

            return (
              <LatestArticle
                key={article.id}
                category={article.category.name}
                categorySlug={article.category.slug}
                thumbnail={
                  article.thumbnail?.url
                    ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${article.thumbnail.url}`
                    : "/416x312.svg"
                }
                authorImg={
                  article.author?.image?.url
                    ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${article.author.image.url}`
                    : "/default_avatar.png"
                }
                articleSlug={article.slug}
                title={article.title}
                author={article.author.name}
                publicationDate={
                  article.publicationDate
                    ? article.publicationDate
                    : article.createdAt
                }
                delay={(index + 1) * 100}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
