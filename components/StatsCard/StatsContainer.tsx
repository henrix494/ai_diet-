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
      icon: null,
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
