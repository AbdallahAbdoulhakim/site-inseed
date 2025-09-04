import PageHeader from "@/components/public/PageHeader";

export default function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <PageHeader />
      {children}
    </div>
  );
}
