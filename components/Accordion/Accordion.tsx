"use client";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useUser } from "@clerk/clerk-react";
import { useQuery, Authenticated } from "convex/react";
import { api } from "@/convex/_generated/api";
import { editFav } from "@/actions/iditFav";
import { deleteRecipeHandler } from "@/actions/delRecipe";
import { Id } from "@/convex/_generated/dataModel";
import { recipeTypes } from "@/actions/addRecipe";
import { useTranslations } from "next-intl";
import Share from "../sharing/Share";

interface recipeTypeEach extends recipeTypes {
  userId: string;
  _creationTime: number;
  _id: Id<"recipes">;
}

export default function Accordion({ locale }: { locale: string }) {
  const t = useTranslations("accordion");
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [detailRecipe, setDetailRecipe] = useState<recipeTypeEach | null>(null);
  const [isFavLoading, setIsFavLoaing] = useState(false);

  const deleteItem = async (id: Id<"recipes">) => {
    try {
      if (user && user.primaryEmailAddressId && data) {
        await deleteRecipeHandler(id);
        closeModal();
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const { modal, openModal, closeModal, data, id } = useModal({
    children: (
      <>
        <h1 className="text-2xl font-bold py-6 text-center text-gray-800">
          אתה בטוח שאתה רוצה למחוק?
        </h1>
        <div className="flex items-center w-full gap-10 justify-center">
          <button
            className="btn btn-error px-6 py-2 rounded-lg font-semibold"
            onClick={() => deleteItem(id)}
          >
            מחק
          </button>
          <button
            className="btn px-6 py-2 rounded-lg font-semibold"
            onClick={() => closeModal()}
          >
            בטל
          </button>
        </div>
      </>
    ),
  });

  const addToFavHanlder = async (id: string) => {
    setIsFavLoaing(true);
    await editFav(id);
    setIsFavLoaing(false);
  };

  const AuthCotant = () => {
    const recipes = useQuery(api.tasks.getRecipe);
    const filterRecipes = recipes?.filter((item) => {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
      <div className="flex flex-col gap-10 relative">
        <h2 className="text-center text-4xl font-extrabold mt-5 text-gray-800 drop-shadow-sm">
          {t("title")}
        </h2>
        <div className="flex gap-8 flex-wrap justify-center max-lg:flex-col py-10 min-h-screen">
          {filterRecipes?.length === 0 && (
            <div className="text-center text-gray-400 text-xl font-semibold py-12">
              {t("no_results")}
            </div>
          )}
          {filterRecipes?.map((item: recipeTypeEach) => (
            <div key={item._id.toString()} className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-md hover:shadow-2xl transition-transform hover:-translate-y-1 lg:w-[30vw] w-full overflow-hidden">
              {/* Card Header with Recipe Title */}
              <div className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white font-bold">
                <div className="flex flex-col text-left">
                  <span className="text-lg lg:text-xl">{item.title}</span>
                  <span className="text-sm opacity-90 font-normal mt-1">{item.cookTime} • {item.servings}</span>
                </div>
                <div className="text-sm opacity-90">{item._creationTime ? new Date(item._creationTime).toLocaleDateString() : null}</div>
              </div>

              {/* Recipe Content (visible) */}
              <div className={`px-6 lg:px-8 pb-6 ${locale === "he" ? "text-right" : "text-left"}`}>
                <div className="pt-6 space-y-4">
                  {/* Ingredients (short list preview) */}
                  <div>
                    <h3 className="text-gray-700 font-semibold text-md mb-2">{t("ingredients")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.ingredients.slice(0, 4).map((ing, i) => (
                        <span key={i} className="text-sm bg-white rounded-md px-3 py-1 shadow-sm">{ing.name} • {ing.quantity}</span>
                      ))}
                      {item.ingredients.length > 4 && <span className="text-sm text-gray-400">+{item.ingredients.length - 4} more</span>}
                    </div>
                  </div>

                  {/* Short instruction preview */}
                  <div>
                    <h3 className="text-gray-700 font-semibold text-md mb-2">{t("instructions")}</h3>
                    <p className="text-gray-700 text-sm line-clamp-3">{item.instructions.join(" \n ")}</p>
                  </div>

                  {/* Nutritional quick info */}
                  <div className="flex gap-3 flex-wrap">
                    <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                      <div className="text-sm text-gray-400">{t("calories")}</div>
                      <div className="font-bold">{item.calories}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                      <div className="text-sm text-gray-400">{t("carbs")}</div>
                      <div className="font-bold">{item.carbs}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                      <div className="text-sm text-gray-400">{t("protein")}</div>
                      <div className="font-bold">{item.protein}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                      <div className="text-sm text-gray-400">{t("fats")}</div>
                      <div className="font-bold">{item.fats}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-3 pt-2 flex-wrap">
                    <div className="flex items-center gap-3">
                        <button onClick={() => openModal(item.title, item._id)} className="inline-flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-red-600 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                        <span className="text-sm font-semibold">{t("delete")}</span>
                      </button>
                        <button onClick={() => setDetailRecipe(item)} className="inline-flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-blue-600 transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                          <span className="text-sm font-semibold">{t("view")}</span>
                        </button>
                      <Share id={item._id} />
                    </div>

                    <button disabled={isFavLoading} onClick={() => addToFavHanlder(item._id)} className={`py-2 px-4 rounded-lg shadow-sm font-semibold transition ${item.isFavorite ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500" : "bg-green-500 text-white hover:bg-green-600"}`}>
                      {item.isFavorite ? t("remove_from_favorite") : t("add_to_favorite")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    );
  };

  return (
    <>
      {modal}
      {/* Details Modal */}
      {detailRecipe && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-y-auto p-4" onClick={() => setDetailRecipe(null)}>
          <div className={`relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl ${locale === "he" ? "text-right" : "text-left"}`} onClick={(e) => e.stopPropagation()}>
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 flex justify-between items-start gap-4 p-6 md:p-8 rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800">{detailRecipe.title}</h2>
                <div className="text-sm text-gray-500 mt-1">{detailRecipe.cookTime} • {detailRecipe.servings}</div>
              </div>
              <button className="text-gray-500 hover:text-gray-700 text-xl font-bold" onClick={() => setDetailRecipe(null)}>✕</button>
            </div>

            {/* Scrollable Content */}
            <div className="px-6 md:px-8 pb-6 md:pb-8 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">{t("ingredients")}</h3>
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
                <h3 className="text-lg font-semibold mb-3">{t("instructions")}</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700 pl-4">
                  {detailRecipe.instructions.map((ins, idx) => (
                    <li key={idx}>{ins}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">{t("nutrition_info")}</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div><span className="font-medium">{t("calories")}:</span> {detailRecipe.calories}</div>
                <div><span className="font-medium">{t("carbs")}:</span> {detailRecipe.carbs} {t("m")}</div>
                <div><span className="font-medium">{t("protein")}:</span> {detailRecipe.protein} {t("m")}</div>
                <div><span className="font-medium">{t("fats")}:</span> {detailRecipe.fats} {t("m")}</div>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-12 mb-8">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder={t("search")}
            className="input input-bordered w-full max-w-xs rounded-xl shadow-md focus:ring-2 focus:ring-orange-400 transition"
            id="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <Authenticated>
        <AuthCotant />
      </Authenticated>
    </>
  );
}
