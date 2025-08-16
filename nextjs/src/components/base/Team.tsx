import client from "@/lib/strapi";
import TeamContainer from "@/components/base/TeamContainer";

interface TeamProps {
  group: string;
  title: string;
}

export default async function Team({ group, title }: TeamProps) {
  const team = client.collection("team-members");

  const { data: allMembers } = await team.find({
    locale: "fr",
    sort: "order:asc",
    filters: {
      group: { $eqi: group },
    },
    populate: {
      photo: {
        fields: ["name", "url"],
      },
    },
  });

  if (!allMembers.length) return null;

  return <TeamContainer members={allMembers} title={title} />;
}
