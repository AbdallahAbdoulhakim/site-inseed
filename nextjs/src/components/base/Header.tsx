import { fetchMenu } from "@/actions/menu";
import HeaderContainer from "@/components/base/HeaderContainer";

export interface MenuItem {
  id: string;
  label: string;
  description: string | null;
  url: string;
  display_order: number;
  is_active: boolean;
  parentId: string | null;
  children: MenuItem[];
}

export default async function Header() {
  const menu = await fetchMenu("MAIN");
  return <HeaderContainer menu={menu} />;
}
