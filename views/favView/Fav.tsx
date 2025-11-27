"use client";

import { useQuery, Authenticated } from "convex/react";
import { api } from "@/convex/_generated/api";
import { editFav } from "@/actions/iditFav";
import { useState, useRef, MouseEvent, useEffect } from "react";
import { recipeTypes } from "@/actions/addRecipe";

interface Props {
  user?: string;
}

export default function Fav({ user }: Props) {
  const [searchQ, setSearchQ] = useState<string>("");
  const [detailRecipe, setDetailRecipe] = useState<recipeTypes | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const addToFavHandler = async (id: string) => {
    await editFav(id);
  };

  // Add event listeners to window for drag behavior

  const FavRecipeElement = () => {
    const favRecipe = useQuery(api.tasks.getFavRecipe);
    const filteredFav = favRecipe?.filter((item) =>
      item.title.includes(searchQ)
    );

    return !favRecipe ? (
      <div className="text-center text-gray-400 text-lg font-semibold py-12">אין מועדפים</div>
    ) : (
      <div className="mb-10">
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="חפש מתכון"
            className="w-full max-w-xs text-lg text-gray-800 placeholder-gray-500 bg-white rounded-2xl shadow-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
          />
        </div>

        <div className="flex justify-center flex-wrap gap-8 px-4">
          {filteredFav?.map((item: recipeTypes, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl shadow-md hover:shadow-2xl transition-transform hover:-translate-y-1 lg:w-[30vw] w-full overflow-hidden"
            >
              {/* Card Header */}
              <div className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white font-bold">
                <div className="flex flex-col text-left">
                  <span className="text-lg lg:text-xl">{item.title}</span>
                  <span className="text-sm opacity-90 font-normal mt-1">{item.cookTime} • {item.prepTime} • {item.servings}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="px-6 lg:px-8 pb-6 text-right space-y-4">
                <div className="pt-6">
                  <h3 className="text-gray-700 font-semibold text-md mb-2">מצרכים</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.slice(0, 4).map((ing, i) => (
                      <span key={i} className="text-sm bg-white rounded-md px-3 py-1 shadow-sm">{ing.name} • {ing.quantity}</span>
                    ))}
                    {item.ingredients.length > 4 && <span className="text-sm text-gray-400">+{item.ingredients.length - 4} עוד</span>}
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-700 font-semibold text-md mb-2">הוראות</h3>
                  <p className="text-gray-700 text-sm line-clamp-3">{item.instructions.join(" \n ")}</p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                    <div className="text-sm text-gray-400">קלוריות</div>
                    <div className="font-bold">{item.calories}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                    <div className="text-sm text-gray-400">פחמימות</div>
                    <div className="font-bold">{item.carbs}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                    <div className="text-sm text-gray-400">חלבון</div>
                    <div className="font-bold">{item.protein}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                    <div className="text-sm text-gray-400">שומנים</div>
                    <div className="font-bold">{item.fats}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setDetailRecipe(item)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-blue-600 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span className="text-sm font-semibold">הצג</span>
                  </button>
                  <button
                    disabled={false}
                    onClick={() => addToFavHandler(item._id as string)}
                    className="flex-1 py-2 px-4 rounded-lg shadow-sm font-semibold transition bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                  >
                    הסר
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-10 items-center mt-10 overflow-x-hidden">
      {/* Details Modal */}
      {detailRecipe && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-y-auto p-4" onClick={() => setDetailRecipe(null)}>
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl text-right" onClick={(e) => e.stopPropagation()}>
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 flex justify-between items-start gap-4 p-6 md:p-8 rounded-t-2xl">
              <button className="text-gray-500 hover:text-gray-700 text-xl font-bold" onClick={() => setDetailRecipe(null)}>✕</button>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800">{detailRecipe.title}</h2>
                <div className="text-sm text-gray-500 mt-1">{detailRecipe.cookTime} • {detailRecipe.prepTime} • {detailRecipe.servings}</div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="px-6 md:px-8 pb-6 md:pb-8 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">מצרכים</h3>
                  <ul className="space-y-2 text-gray-700">
                    {detailRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex justify-between items-center">
                        <span className="font-medium">{ing.name}</span>
                        <span className="text-sm text-gray-500">{ing.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">הוראות</h3>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700 pl-4">
                    {detailRecipe.instructions.map((ins, idx) => (
                      <li key={idx}>{ins}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">מידע תזונתי</h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div><span className="font-medium">קלוריות:</span> {detailRecipe.calories}</div>
                  <div><span className="font-medium">פחמימות:</span> {detailRecipe.carbs} ג</div>
                  <div><span className="font-medium">חלבון:</span> {detailRecipe.protein} ג</div>
                  <div><span className="font-medium">שומנים:</span> {detailRecipe.fats} ג</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Authenticated>
        <FavRecipeElement />
      </Authenticated>
    </div>
  );
}
