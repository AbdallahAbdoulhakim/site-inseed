import {
  CategoriesCount,
  LatestArticle,
} from "@/components/public/ArticlePage";

interface Props {
  categoriesCount: CategoriesCount[];
  articlesList: LatestArticle[];
}

export default function ArticleSidebar({
  categoriesCount,
  articlesList,
}: Props) {
  return <div>ArticleSidebar</div>;
}
