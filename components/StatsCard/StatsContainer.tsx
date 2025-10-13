"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Stats from "./Stats";

export default function StatsContainer() {
  const HeartIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="inline-block w-8 h-8 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      ></path>
    </svg>
  );

  const LightningIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="inline-block w-8 h-8 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      ></path>
    </svg>
  );
  const CreatedCount = () => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="32px"
      width="32px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.263 2.177a1.75 1.75 0 0 1 2.474 0l2.586 2.586a1.75 1.75 0 0 1 0 2.474L19.53 10.03l-.012.013L8.69 20.378a1.753 1.753 0 0 1-.699.409l-5.523 1.68a.748.748 0 0 1-.747-.188.748.748 0 0 1-.188-.747l1.673-5.5a1.75 1.75 0 0 1 .466-.756L14.476 4.963ZM4.708 16.361a.26.26 0 0 0-.067.108l-1.264 4.154 4.177-1.271a.253.253 0 0 0 .1-.059l10.273-9.806-2.94-2.939-10.279 9.813ZM19 8.44l2.263-2.262a.25.25 0 0 0 0-.354l-2.586-2.586a.25.25 0 0 0-.354 0L16.061 5.5Z"></path>
    </svg>
  );
  const { user } = useUser();
  const [_, setUserImg] = useState<string | undefined>(undefined);
  const t = useTranslations("stats");

  useEffect(() => {
    if (user) setUserImg(user.imageUrl);
  }, [user]);

  const RecipeCount = () => {
    const recipes = useQuery(api.tasks.getRecipe);
    return <div className="stat-value">{recipes?.length}</div>;
  };
  const FavCount = () => {
    const favCount = useQuery(api.tasks.getFavRecipe);
    return <div className="stat-value">{favCount?.length}</div>;
  };
  const GetUser = () => {
    const user = useQuery(api.tasks.user);
    return <img src={user?.img} alt="" />;
  };
  const GetCount = () => {
    const user = useQuery(api.tasks.user);
    return <div className="stat-value">{user?.count}</div>;
  };
  const stats = [
    {
      component: <RecipeCount />,
      title: t("created"),
      icon: <CreatedCount />,
      className: "flex items-center justify-around",
    },
    {
      component: <FavCount />,
      title: t("favorites"),
      icon: <HeartIcon />,
      className: "max-lg:hidden",
    },
    {
      component: <GetCount />,
      title: t("questionAsked"),
      icon: <LightningIcon />,
      className: "max-lg:hidden",
    },
  ];
  return (
    <>
      <Stats
        GetUser={GetUser}
        FavCount={FavCount}
        GetCount={GetCount}
        RecipeCount={RecipeCount}
        stats={stats}
      />
    </>
  );
}
