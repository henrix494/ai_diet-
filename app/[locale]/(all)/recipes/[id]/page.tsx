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
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white shadow-lg animate-pulse">🍳</div>
          <p className="text-gray-600 text-lg font-semibold">Loading Recipe...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50">
        <div className="flex flex-col items-center gap-4 bg-white rounded-2xl p-8 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50 py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 drop-shadow-sm">Recipe Details</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {recipe.map((item) => (
          <div
            key={item._id}
            className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl shadow-md hover:shadow-2xl transition-transform hover:-translate-y-1 lg:w-[40vw] w-full overflow-hidden"
          >
            {/* Card Header */}
            <div className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white font-bold">
              <div className="flex flex-col text-left">
                <span className="text-lg lg:text-2xl">{item.title}</span>
                <span className="text-sm opacity-90 font-normal mt-1">{item.cookTime} • {item.servings} servings</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="px-6 lg:px-8 pb-6 text-left space-y-4">
              {/* Ingredients Section */}
              <div className="pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Ingredients</h3>
                <ul className="space-y-2">
                  {item.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span className="text-gray-700">{ingredient.name}</span>
                      <span className="text-sm text-gray-500">{ingredient.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Instructions</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  {item.instructions.map((instruction, idx) => (
                    <li key={idx} className="text-sm">{instruction}</li>
                  ))}
                </ol>
              </div>

              {/* Nutritional Information Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Nutritional Information</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-md p-3 shadow-sm">
                    <span className="text-sm text-gray-500">Calories</span>
                    <div className="font-bold text-gray-800">{item.calories}</div>
                  </div>
                  <div className="bg-white rounded-md p-3 shadow-sm">
                    <span className="text-sm text-gray-500">Carbs</span>
                    <div className="font-bold text-gray-800">{item.carbs}g</div>
                  </div>
                  <div className="bg-white rounded-md p-3 shadow-sm">
                    <span className="text-sm text-gray-500">Protein</span>
                    <div className="font-bold text-gray-800">{item.protein}g</div>
                  </div>
                  <div className="bg-white rounded-md p-3 shadow-sm">
                    <span className="text-sm text-gray-500">Fats</span>
                    <div className="font-bold text-gray-800">{item.fats}g</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
