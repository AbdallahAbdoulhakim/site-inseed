import Actualites from "@/components/base/Actualites";
import Hero from "@/components/base/Hero";
import Team from "@/components/base/Team";

export default function Home() {
  return (
    <>
      <Hero />
      <Actualites />
      <Team title="Équipe INSEED" group="inseed" />
      <Team title="Équipe STATCAP-KM" group="statcap" />
    </>
  );
}
