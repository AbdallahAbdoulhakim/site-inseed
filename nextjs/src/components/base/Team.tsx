import client from "@/lib/strapi";
import TeamContainer from "@/components/base/TeamContainer";

export default async function Team() {
  const team = client.collection("team-members");

  const { data: allMembers } = await team.find({ locale: "fr", sort: "id" });

  console.log(allMembers);

  if (!allMembers.length) return null;

  return <TeamContainer members={allMembers} />;
}
