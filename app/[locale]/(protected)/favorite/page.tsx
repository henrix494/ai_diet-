import React from "react";
import Fav from "@/views/favView/Fav";
import { auth, currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "מועדפים",
  description: "מתכונים",
};

export default async function page() {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50 py-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 drop-shadow-sm">מועדפים</h2>
        <p className="text-gray-500 mt-2">המתכונים האהובים עלייך</p>
      </div>

      <Fav user={user?.emailAddresses[0].id} />
    </div>
  );
}
