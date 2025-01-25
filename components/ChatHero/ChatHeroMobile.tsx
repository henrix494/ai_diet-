"use client";
import React, { useState, useEffect } from "react";
import { useTypeWriter } from "@/hooks/useTypeWriter";
import { useTranslations } from "next-intl";
export default function ChatHeroMobile({ locale }: { locale: string }) {
  const t = useTranslations("Hero");
  const userText = t("userText");
  const lastText = t("botText");
  const [isReadMoreClick, setIsReadMoreClick] = useState(false);
  const writeUserText = useTypeWriter(userText, 35);

  const [writeAiText, setWriteAiText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWriteAiText(lastText);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [lastText]);

  const typedAiText = useTypeWriter(writeAiText, 20);
  const openFullTexthandler = () => {
    setIsReadMoreClick((prev) => !prev);
  };
  return (
    <div
      className={`flex testAni justify-center mt-20 lg:hidden  relative  overflow-hidden ${isReadMoreClick ? "h-max" : "h-[410px]"} `}
    >
      <div className={` bg-base-300 rounded-xl    w-screen h-[1100px]`}>
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
          <div className="chat-bubble ">{writeUserText}</div>
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
            className="chat-bubble h-[1100px] w-[290.89px]"
            dir={locale === "he" ? "rtl" : "ltr"}
            dangerouslySetInnerHTML={{ __html: typedAiText }}
          ></div>
          <div>
            <button
              onClick={openFullTexthandler}
              className={` absolute bottom-1 right-20 text-sm btn btn-xs  ${typedAiText.length < 300 && "hidden"}`}
            >
              {" "}
              {isReadMoreClick
                ? locale === "he"
                  ? "סגור"
                  : "Read less"
                : locale === "he"
                  ? "קרא עוד"
                  : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
