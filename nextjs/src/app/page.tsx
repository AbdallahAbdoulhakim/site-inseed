import Hero from "@/components/base/Hero";
import Team from "@/components/base/Team";

export default function Home() {
  return (
    <>
      <Hero />
      <Team title="Équipe INSEED" group="inseed" />
      <Team title="Équipe STATCAP-KM" group="statcap" />
    </>
  );
}
