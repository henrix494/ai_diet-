"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { DataModel } from "@/convex/_generated/dataModel";

export default function RecipePage() {
  const [recipe, setRecipe] = useState<DataModel["recipes"]["document"][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.getAll("id")[0];

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setError("Invalid recipe ID.");
        setLoading(false);
        return;
      }

      try {
        const recepit = await fetchQuery(api.tasks.getCurrentRecipe, {
          recipeId: id,
        });

        if (!recepit || recepit.length === 0) {
          setError("Recipe not found.");
        } else {
          setRecipe(recepit);
        }
      } catch (err) {
        setError("Failed to fetch recipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <p className="text-white text-lg animate-pulse tracking-widest">
          Loading Recipe...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <p className="text-red-400 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-5  ">
      <h2 className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-12 mt-10">
        Recipe Details
      </h2>

      <div className="flex flex-wrap justify-center gap-8 ">
        {recipe.map((item) => (
          <div
            key={item._id}
            className="glass-effect rounded-xl shadow-lg p-6 lg:w-[40vw] w-full hover:scale-105 transition-transform duration-300 font-bold"
          >
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-3xl font-bold ">{item.title}</h1>
              <p className="text-sm text-gray-400">
                {item.cookTime} • {item.servings} servings
              </p>
            </div>

            {/* Ingredients Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-pink-300 mb-3">
                Ingredients
              </h3>
              <ul className="space-y-2 ">
                {item.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>{ingredient.name}</span>
                    <span className="text-sm text-gray-400">
                      {ingredient.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-pink-300 mb-3">
                Instructions
              </h3>
              <ol className="list-decimal pl-5 space-y-3 ">
                {item.instructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ol>
            </div>

            {/* Nutritional Information Section */}
            <div className="mb-6 bg-gray-800 p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold text-pink-300 mb-3">
                Nutritional Information
              </h3>
              <ul className="text-gray-200 space-y-2">
                <li>
                  <span className="font-medium">Calories: </span>
                  {item.calories}
                </li>
                <li>
                  <span className="font-medium">Carbs: </span>
                  {item.carbs} g
                </li>
                <li>
                  <span className="font-medium">Protein: </span>
                  {item.protein} g
                </li>
                <li>
                  <span className="font-medium">Fats: </span>
                  {item.fats} g
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
