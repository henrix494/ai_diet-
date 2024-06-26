"use client";
import { useCompletion } from "ai/react";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import Clerk, { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useStoreUserEffect } from "@/hooks/useStoreUserEffect";
import { useAuth } from "@clerk/nextjs";
export default function Chat({ token }) {
  const { user, isLoaded } = useUser();
  const [userMail, setUserImg] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (user) setUserImg(user.id);
  }, [user]);
  console.log(userMail);
  const [isOK, setIsok] = useState<boolean | null>(false);
  const [isNotOK, setIsNotOK] = useState<boolean | null>(false);
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    body: { userMail: userMail, img: user?.imageUrl, token: token },
  });
  const sentaized = DOMPurify?.sanitize(completion);

  useEffect(() => {
    if (!isLoading && completion.length > 150) {
      setIsok(true);
      setTimeout(() => {
        setIsok(false);
      }, 4000);
    }
    if (!isLoading && completion.length < 150 && completion) {
      setIsNotOK(true);
      setTimeout(() => {
        setIsNotOK(false);
      }, 4000);
    }
  }, [isLoading, completion]);

  return (
    <div className=" border-b-2 border-[#f1f1f15b] flex justify-center pb-4 mt-10 ">
      <div
        className={`toast toast-top top-[20%] toast-center z-40 duration-200  ${
          isOK ? " opacity-1" : " opacity-0"
        }`}
      >
        <div className="alert alert-success ">
          <span className="text-2xl ">מתכון נוסף</span>
        </div>
      </div>{" "}
      <div
        className={`toast toast-top toast-center z-40 duration-200 ${
          isNotOK ? " opacity-1" : " opacity-0"
        }`}
      >
        <div className="alert alert-error">
          <span className="text-2xl">מתכון לא נוסף</span>
        </div>
      </div>
      <div className="    flex flex-col w-[80%]  ">
        <form onSubmit={handleSubmit}>
          <div
            className="chat-bubble"
            dangerouslySetInnerHTML={{ __html: sentaized }}
          ></div>

          <div className=" flex  justify-center gap-7 mt-10 flex-col  w-[80vw]">
            <input
              className="   border border-gray-300 rounded-xl  shadow-xl p-4"
              value={isLoading ? "......." : input}
              placeholder={isLoading ? "..." : " כתוב שאלה על אוכל או מצרכים"}
              onChange={handleInputChange}
            />
            <div className="flex justify-center gap-10  ">
              <div>
                <button
                  className=" btn btn-accent px-16 text-xl "
                  disabled={isLoading}
                  type="submit"
                >
                  שלח
                </button>
              </div>
              <div>
                <button
                  className=" btn btn-warning px-16 text-xl"
                  type="button"
                  onClick={stop}
                >
                  עצור
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
