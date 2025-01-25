"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useTypeWriter } from "@/hooks/useTypeWriter";
import ChatHero from "./ChatHero";
export default function ChatHeroContainer({ locale }: { locale: string }) {
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
    <>
      <ChatHero
        typedAiText={typedAiText}
        writeUserText={writeUserText}
        locale={locale}
      />
    </>
  );
}
