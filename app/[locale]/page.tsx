import HomeV1 from "@/components/HomeV1";
export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <main className="">
      <HomeV1 locale={locale} />
    </main>
  );
}
