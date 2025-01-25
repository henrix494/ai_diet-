"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { recipeTypes } from "@/actions/addRecipe";
export default function AllRecipe() {
  const allRecipes = useQuery(api.tasks.getAllRecipe);
  const [RecipesState, setRecipesState] = useState<recipeTypes[]>();
  useEffect(() => {
    setRecipesState(allRecipes as recipeTypes[]);
    let seend = new Set();
    let filtered = allRecipes?.filter((item) => {
      const duplicate = seend.has(item.title);
      seend.add(item.title);
      return !duplicate;
    });
    setRecipesState(filtered as recipeTypes[]);
  }, [allRecipes]);
  if (!allRecipes || allRecipes.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <h2 className="text-xl font-semibold text-gray-400 animate-pulse">
          אין מתכונים זמינים כרגע
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-purple-900 to-black p-10">
      <div className="flex flex-wrap justify-center gap-8">
        {RecipesState?.map((item) => {
          const date = new Date(item._creationTime);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const year = date.getFullYear();

          return (
            <Link key={item._id} href={`recipes/search?id=${item._id}`}>
              <div className="relative w-80 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-md hover:shadow-2xl transition-transform duration-300 cursor-pointer overflow-hidden">
                {/* Recipe Header */}
                <div className="p-6 bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 text-white text-lg font-semibold flex justify-between items-center">
                  <span>{item.title}</span>
                  <span className="text-sm opacity-80">
                    {day}.{month}.{year}
                  </span>
                </div>

                {/* Recipe Details */}
                <div className="p-6 space-y-3">
                  <p className="text-gray-300 text-sm">
                    זמן הכנה:{" "}
                    <span className="font-bold text-white">
                      {item.prepTime || "לא ידוע"}
                    </span>
                  </p>
                  <p className="text-gray-300 text-sm">
                    מנות:{" "}
                    <span className="font-bold text-white">
                      {item.servings || "לא ידוע"}
                    </span>
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
