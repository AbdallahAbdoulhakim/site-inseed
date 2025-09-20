import client from "@/lib/strapi";
import DisplayContent from "@/components/commons/DisplayContent";

export default async function page() {
  const tests = client.collection("tests");

  const { data: testsList } = await tests.find();

  const content = testsList;
  return (
    <div className="border border-slate-850 flex flex-col px-10 py-5">
      {testsList.map((elt) => (
        <div key={elt.documentId}>{elt.content}</div>
      ))}

      {testsList.map((elt) => (
        <DisplayContent
          key={elt.documentId}
          className="mt-10 min-w-full grow  [&_td]:text-center [&_tr:first-child]:bg-[#757575] [&_tr:nth-child(2)]:bg-[#757575] [&_tr:nth-child(2)]:text-white [&_tr:nth-child(2)_strong]:text-white! [&_tr:first-child]:text-white  [&_tr:first-child_strong]:text-white [&_tr:first-child]:font-bold  [&_tr:first-child_strong]:font-bold  [&_tr]:odd:bg-white [&_tr]:even:bg-[#f1f1f1] [&_td]:border [&_td]:border-[#e0e0e0] [&_td]:has-[rowspan]:bg-[#757575]"
          htmlContent={elt.content}
        />
      ))}
    </div>
  );
}
