import ChatHero from "@/components/ChatHero/ChatHero";
import ChatHeroMobile from "@/components/ChatHero/ChatHeroMobile";
import Link from "next/link";
export default function Hero() {
  return (
    <div className=" relative ">
      <div className=" flex justify-center flex-col items-center  text-9xl font-bold mt-20 max-lg:text-2xl">
        <h2 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
          המתכון המשולם בעזרת
        </h2>
        <h3 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
          AI
        </h3>
        <Link href={"/sign-in"}>
          <button className="btn btn-neutral text-2xl mt-10 cursor-pointer">
            <span className="text-white font-bold tracking-wider">
              נסה עכשיו
            </span>
          </button>
        </Link>
      </div>
      <ChatHero />
      <ChatHeroMobile />
    </div>
  );
}
