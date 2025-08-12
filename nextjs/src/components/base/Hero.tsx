import MainIndicators from "@/components/base/MainIndicatorsContainer";
import HeroLogo from "@/components/base/HeroLogo";

export default function Hero() {
  return (
    <section className="w-full relative bg-primary pt-15">
      <div className="container mx-auto relative px-2 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="order-2 lg:order-1 flex flex-col justify-center text-center lg:text-start  p-2 ">
            <p className="text-background text-2xl font-montserrat">
              L’Institut National de la Statistique et des Études Économiques et
              Démographiques collecte, produit, analyse et diffuse des
              informations sur l’économie et la société comoriennes.
            </p>
          </div>
          <HeroLogo />
        </div>
      </div>

      <div className="px-2 lg:before:content-[''] lg:before:absolute lg:before:bottom-0 lg:before:left-0 lg:before:right-0 lg:before:h-[calc(50%+20px)] lg:before:bg-background pb-[60px] relative mx-auto">
        <div className="container relative mx-auto">
          <MainIndicators />
        </div>
      </div>
    </section>
  );
}
