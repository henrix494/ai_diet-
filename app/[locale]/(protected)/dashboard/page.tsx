import Chat from "@/services/chat/Chat";
import Stats from "@/components/StatsCard/Stats";
import Accordion from "@/components/Accordion/Accordion";
import { auth } from "@clerk/nextjs/server";

import type { Metadata } from "next";
import StatsContainer from "@/components/StatsCard/StatsContainer";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "מתכונים",
  description: "מתכונים",
};

export default async function Page({ params }: { params: { locale: string } }) {
  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;
  const { locale } = await params;

  return (
    <div className=" ">
      <StatsContainer />
      <div className="border-b-2 border-[#f1f1f15b]">
        <Chat token={token} locale={locale} />
      </div>
      <div className="border-b-2 border-[#f1f1f15b]">
        <Accordion locale={locale} />
      </div>
    </div>
  );
}
