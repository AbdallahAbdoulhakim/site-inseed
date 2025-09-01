import Hero from "@/components/base/Hero";
import InseedPartners from "@/components/base/InseedPartners";
import KeyIndicators from "@/components/base/KeyIndicators";
import LatestNews from "@/components/base/LatestNews";
import LatestPublications from "@/components/base/LatestPublications";
import Team from "@/components/base/Team";

export default function Home() {
  return (
    <>
      <Hero />
      <LatestNews />
      <LatestPublications />
      <KeyIndicators />
      <InseedPartners />
      <Team title="Équipe INSEED" group="inseed" />
      <Team title="Équipe STATCAP-KM" group="statcap" />
    </>
  );
}
