import Image from "next/image";
import { useRef, useEffect, useState } from "react";

interface ChatHeroProps {
  writeUserText: string;
  typedAiText: string;
  locale?: string;
}

export default function ChatHero({
  writeUserText,
  typedAiText,
  locale,
}: ChatHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <div
      id="seeHowItWorks"
      ref={ref}
      dir={locale === "he" ? "rtl" : "ltr"}
      className="flex justify-center mt-20 max-lg:hidden min-h-[570px] "
    >
      <div
        className={`lg:w-[50vw] bg-base-300 rounded-xl p-6 shadow-2xl transition-all duration-700 ${
          hasAnimated ? "testAni" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                width={50}
                height={50}
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
              <Image
                width={50}
                height={50}
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
            className="chat-bubble"
            dangerouslySetInnerHTML={{
              __html: typedAiText || "...",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
