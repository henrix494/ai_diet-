"use client";
import React from "react";
import SpoonSvgComponent from "./Spoon";
import SVGFactory from "./SVGFactory";
import { useTranslations } from "next-intl";
import Link from "next/link";
const HeroV2 = () => {
  const t = useTranslations("v2.hero-v2");
  return (
    <div className="relative h-auto  bg-gradient-to-r  to-gray-100 ">
      <SVGFactory />
      <div className="relative z-10 flex flex-col items-center text-center px-4 lg:px-0 text-3xl lg:text-8xl  gap-5 mt-10">
        <h3>{t("main-text")}</h3>
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <h3>{t("sub-text")}</h3>
          <div className="w-[40px] flex justify-center items-center mt-2">
            <SpoonSvgComponent />
          </div>
        </div>
        <div>
          <p className="text-center text-base lg:text-lg font-normal text-gray-500 max-w-[600px] mt-4">
            {t("paragraph")}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center mt-6 text-lg lg:text-xl gap-4">
          <Link href="/sign-in">
            <button className="px-6 py-3 bg-orange-500 text-white border border-gray-300 rounded-lg shadow-md hover:bg-orange-600 transition-all">
              {t("orange-btn")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroV2;
