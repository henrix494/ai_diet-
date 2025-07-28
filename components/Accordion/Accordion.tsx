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
            <div
              key={item._id}
              className="bg-white/90 shadow-xl rounded-2xl transition-transform hover:scale-105 hover:shadow-2xl lg:w-[30vw] w-full h-max border border-gray-200"
            >
              {/* Accordion Header with Recipe Title */}
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white text-xl font-bold rounded-t-2xl">
                <span>{item.title}</span>
                <span className="text-sm opacity-90 font-normal">
                  {item.cookTime} • {item.servings}
                </span>
              </div>

              {/* Recipe Content */}
              <div
                className={`p-8 space-y-6 ${locale === "he" ? "text-right" : "text-left"}`}
              >
                {/* Ingredients */}
                <div>
                  <h3 className="text-gray-700 font-semibold text-lg mb-3">
                    {t("ingredients")}
                  </h3>
                  <ul className="space-y-2 text-gray-600 leading-relaxed">
                    {item.ingredients.map((ingredient, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium">{ingredient.name}</span>
                        <span className="text-sm text-gray-400">
                          {ingredient.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Instructions */}
                <div>
                  <h3 className="text-gray-700 font-semibold text-lg mb-3">
                    {t("instructions")}
                  </h3>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700 pl-4 leading-relaxed">
                    {item.instructions.map((instruction, idx) => (
                      <li key={idx} className="text-base">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>
                {/* Nutritional Information */}
                <div className="bg-gray-100 p-4 rounded-md shadow-inner">
                  <h3 className="text-gray-700 font-semibold text-lg mb-3">
                    {t("nutrition_info")}
                  </h3>
                  <ul className="text-gray-600 space-y-2 leading-relaxed grid grid-cols-2 gap-x-4">
                    <li>
                      <span className="font-medium">{t("calories")}: </span>
                      {item.calories}
                    </li>
                    <li>
                      <span className="font-medium">{t("carbs")}: </span>
                      {item.carbs} {t("m")}
                    </li>
                    <li>
                      <span className="font-medium">{t("protein")}: </span>
                      {item.protein} {t("m")}
                    </li>
                    <li>
                      <span className="font-medium">{t("fats")}: </span>
                      {item.fats} {t("m")}
                    </li>
                  </ul>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-white rounded-b-2xl">
                <button
                  onClick={() => openModal(item.title, item._id)}
                  className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition font-semibold"
                >
                  {t("delete")}
                </button>
                <Share id={item._id} />
                <button
                  disabled={isFavLoading}
                  onClick={() => addToFavHanlder(item._id)}
                  className={`py-2 px-6 rounded-lg shadow-md font-semibold transition ${
                    item.isFavorite
                      ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {item.isFavorite
                    ? t("remove_from_favorite")
                    : t("add_to_favorite")}
                </button>
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
