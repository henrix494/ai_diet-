import ChatHero from "@/components/ChatHero/ChatHero";
import ChatHeroMobile from "@/components/ChatHero/ChatHeroMobile";
import Link from "next/link";
import { useTranslations } from "next-intl";
export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations("Hero");
  // TO DO
  //Fix responsive from 1026 to 1400
  return (
    <div className=" relative overflow-x-hidden ">
      <div className="rectangle max-lg:w-[150px] max-lg:h-[150px] "></div>
      <div className=" flex justify-center flex-col items-center   font-bold mt-20 max-lg:text-2xl  min-[1023px]:text-7xl  ">
        <h2 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
          {t("title.main")}
        </h2>
        <h3 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
          AI
        </h3>
        <Link href={"/sign-in"}>
          <button className="btn btn-neutral text-2xl mt-10 cursor-pointer">
            <span className="text-white font-bold tracking-wider">
              {t("title.try")}
            </span>
          </button>
        </Link>
      </div>
      <ChatHero />
      <ChatHeroMobile locale={locale} />
    </div>
  );
}
