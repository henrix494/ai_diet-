import { useTranslations } from "next-intl";
import React from "react";
import { FaRegLightbulb, FaRegListAlt, FaRegSmile } from "react-icons/fa";
import ChatHero from "@/components/ChatHero/ChatHero";
import ChatHeroContainer from "@/components/ChatHero/ChatHeroContainer";
import ChatHeroMobile from "@/components/ChatHero/ChatHeroMobile";
const HowItWorksV2 = () => {
  const t = useTranslations("v2.how-it-works-v2");
  const steps = [
    {
      icon: <FaRegLightbulb className="text-orange-500 text-4xl mb-4" />,
      title: t("step1.title"),
      desc: t("step1.description"),
    },
    {
      icon: <FaRegListAlt className="text-green-500 text-4xl mb-4" />,
      title: t("step2.title"),
      desc: t("step2.description"),
    },
    {
      icon: <FaRegSmile className="text-blue-500 text-4xl mb-4" />,
      title: t("step3.title"),
      desc: t("step3.description"),
    },
  ];
  return (
    <section className="relative py-16  overflow-hidden">
      {/* Decorative SVGs */}
      <svg
        className="absolute top-0 left-0 w-32 opacity-20"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="50" fill="#FDBA74" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-40 opacity-10"
        viewBox="0 0 100 100"
      >
        <rect width="100" height="100" rx="30" fill="#34D399" />
      </svg>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl  mb-12 text-gray-800">
          {t("title")}
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              {step.icon}
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-16">
        <h3 className="text-2xl font-semibold mb-4">{t("chatTitle")}</h3>
        <p className="text-gray-500 mb-8">{t("chatDescription")}</p>
        <ChatHeroContainer locale="en" />
        <ChatHeroMobile locale="en" />
      </div>
    </section>
  );
};

export default HowItWorksV2;
