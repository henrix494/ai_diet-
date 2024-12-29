import Hero from "@/views/Hero/Hero";
import Explain from "@/views/Explain/Explain";
import Footer from "@/views/footer/Footer";
import WhoAreWe from "@/views/WhoAreWe/WhoAreWe";
import HomeV1 from "@/components/HomeV1";
export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  return (
    <main className="">
      <HomeV1 locale={locale} />
    </main>
  );
}
