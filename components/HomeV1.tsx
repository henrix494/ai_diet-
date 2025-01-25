import Explain from "@/views/Explain/Explain";
import Footer from "@/views/footer/Footer";
import Hero from "@/views/Hero/Hero";
import WhoAreWe from "@/views/WhoAreWe/WhoAreWe";
export default function HomeV1({ locale }: { locale: string }) {
  return (
    <div>
      <Hero locale={locale} />
      <Explain />
      <WhoAreWe />
      <Footer />
    </div>
  );
}
