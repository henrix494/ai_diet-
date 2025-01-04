"use client";
import React, { useState, useEffect } from "react";
import { RootState } from "@/lib/store";
import { useTypeWriter } from "@/hooks/useTypeWriter";
import { useTranslations } from "next-intl";
export default function ChatHero({ locale }: { locale: string }) {
  const t = useTranslations("Hero");
  const userText = t("userText");
  const lastText = t("botText");

  const writeUserText = useTypeWriter(userText, 80);

  const [writeAiText, setWriteAiText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWriteAiText(lastText);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [lastText]);

  const typedAiText = useTypeWriter(writeAiText, 60);

  return (
    <div className="flex justify-center mt-20 max-lg:hidden min-h-[570px] shadow-2xl overflow-hidden ">
      <div className="lg:w-[50vw] bg-base-300 rounded-xl p-6  shadow-2xl testAni">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://avatars.githubusercontent.com/u/89205895?s=400&u=3a89b13a0654785bf280a1ec70ec144ef202871c&v=4"
              />
            </div>
          </div>
          <div className="chat-header">
            נתן
            <time className="text-xs opacity-50"> 12:45</time>
          </div>
          <div className="chat-bubble">{writeUserText}</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://m.media-amazon.com/images/I/61m0SZMyRzL._AC_SL1500_.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            שפי
            <time className="text-xs opacity-50"> 12:46</time>
          </div>
          <div
            dir={locale === "en" ? "ltr" : "rtl"}
            className="chat-bubble before:left-[1000px]"
            dangerouslySetInnerHTML={{
              __html: typedAiText || "...", // Show AI typing effect or placeholder
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
