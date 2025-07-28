import HeroV2 from "@/V2/HeroV2/HeroV2";
import HowItWorksV2 from "@/V2/HowItWorksV2/HowItWorksV2";
import Explain from "@/views/Explain/Explain";
import { Footer } from "@/V2/Footer/Footer";
import Hero from "@/views/Hero/Hero";
import WhoAreWe from "@/views/WhoAreWe/WhoAreWe";
export default function HomeV1({ locale }: { locale: string }) {
  return (
    <div>
      <HeroV2 />
      <HowItWorksV2 />
      <Footer />
    </div>
  );
}
