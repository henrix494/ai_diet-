import React from "react";
import Card from "@/components/Card/Card";
import { useTranslations } from "next-intl";
export default function Explain() {
  const t = useTranslations("howToStart");
  const keys = ["cardOne", "cardTwo", "cardThree", "cardFour"];
  return (
    <div className=" mt-[5%] ">
      <div>
        <h2 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text font-bold mt-20 max-lg:text-2xl text-9xl text-center">
          {t("title")}
        </h2>
      </div>
      <div className="flex justify-around max-lg:flex-col items-center flex-wrap">
        {keys.map((key) => {
          return (
            <Card
              key={key}
              title={t(`${key}.title`)}
              explain={t(`${key}.explain`)}
              img={`/steps/${key}.png`}
            />
          );
        })}
      </div>
    </div>
  );
}
