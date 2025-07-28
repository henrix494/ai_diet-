import React from "react";
import AllRecipe from "@/components/AllRecipe/AllRecipe";

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-purple-900 to-black">
      {/* Header Section */}
      <div className="h-[120px] flex items-center justify-center mt-10 rounded-2xl mx-auto max-w-4xl shadow-lg bg-[url('https://www.dishgen.com/images/food-tile.jpg')] bg-repeat bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 rounded-2xl" />
        <h2 className="relative z-10 text-center text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">
          כל המתכונים
        </h2>
      </div>
      {/* Recipes List */}
      <AllRecipe />
    </div>
  );
}
