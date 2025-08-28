import Hero from "@/components/base/Hero";
import InseedPartners from "@/components/base/InseedPartners";
import LatestNews from "@/components/base/LatestNews";
import Team from "@/components/base/Team";

export default function Home() {
  return (
    <>
      <Hero />
      <LatestNews />
      <InseedPartners />
      <Team title="Équipe INSEED" group="inseed" />
      <Team title="Équipe STATCAP-KM" group="statcap" />
    </>
  );
}
