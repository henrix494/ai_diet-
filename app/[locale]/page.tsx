import Hero from "@/views/Hero/Hero";
import Explain from "@/views/Explain/Explain";
import Footer from "@/views/footer/Footer";
import WhoAreWe from "@/views/WhoAreWe/WhoAreWe";
export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  return (
    <main className="">
      <Hero locale={locale} />
      <Explain />
      <WhoAreWe />
      <Footer />
    </main>
  );
}
