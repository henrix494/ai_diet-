"use client";
import React, { ChangeEvent, useTransition } from "react";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { addRecipeHandler, recipeTypes } from "@/actions/addRecipe";
import { useTranslations } from "next-intl";
import { z } from "zod";
export const maxDuration = 300;

export default function Chat({
  token,
  locale,
}: {
  token: string | undefined;
  locale: string;
}) {
  const t = useTranslations("chat");
  const { user, isLoaded } = useUser();
  const [userMail, setUserImg] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (user) setUserImg(user.id);
  }, [user]);

  const [isOK, setIsok] = useState<boolean | null>(false);
  const [isNotOK, setIsNotOK] = useState<boolean | null>(false);
  const [isCaloriesClicked, setIsCaloriesClicked] = useState<boolean>(false);
  const [calories, setCalories] = useState<number | null>(null);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState<Boolean>(false);
  const handleCaloreClick = () => {
    setIsCaloriesClicked((prev) => !prev);
    if (isCaloriesClicked) setCalories(null);
  };
  const handleCaloreChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCalories(Number(e.target.value));
  };

  const recipe_schema_hebrew_with_calories = z.object({
    title: z.string().describe("שם המתכון"),
    ingredients: z
      .array(
        z.object({
          name: z.string().describe("שם המרכיב"),
          quantity: z
            .string()
            .describe("כמות המרכיב, למשל '1 כוס' או '2 כפות'"),
        })
      )
      .describe(
        `רשימת מרכיבים עם כמויות כך שהסך הכולל של הקלוריות יעמוד בדיוק על ${calories}`
      ),
    instructions: z.array(z.string()).describe("הוראות הכנה שלב-אחר-שלב"),
    prepTime: z.string().describe("זמן הכנה, למשל '15 דקות'"),
    cookTime: z.string().describe("זמן בישול, למשל '30 דקות'"),
    servings: z.number().describe("מספר מנות"),
    calories: z
      .number()
      .describe("סך הכל מספר קלוריות חייב להיות בדיוק שווה ל-" + calories),
    carbs: z.number().describe("סך הכל מספר הפחמימות במנה"),
    protein: z.number().describe("סך הכל מספר החלבונים במנה"),
    fats: z.number().describe("סך הכל מספר השומנים במנה"),
  });
  const recipe_schema_english_with_calories = z.object({
    title: z.string().describe("The recipe name"),
    ingredients: z
      .array(
        z.object({
          name: z.string().describe("The name of the ingredient"),
          quantity: z
            .string()
            .describe(
              "The quantity of the ingredient, e.g., '1 cup' or '2 tablespoons'"
            ),
        })
      )
      .describe(
        `A list of ingredients with quantities such that the total calorie count is **exactly** ${
          calories ? calories : "the number of calories per serving"
        } calories 🍽️`
      ),
    instructions: z
      .array(z.string())
      .describe(
        "📝 Preparation steps: step-by-step instructions that are clear and easy to follow"
      ),
    prepTime: z.string().describe("Preparation time, e.g., '15 minutes'"),
    cookTime: z.string().describe("Cooking time, e.g., '30 minutes'"),
    servings: z.number().describe("The number of servings the recipe yields"),
    calories: z
      .number()
      .describe(
        `The total number of calories **must be exactly equal to ${calories ? calories : "total calories"} calories**`
      ),
    carbs: z
      .number()
      .describe("The total amount of carbohydrates in the dish (grams)"),
    protein: z
      .number()
      .describe("The total amount of protein in the dish (grams)"),
    fats: z.number().describe("The total amount of fats in the dish (grams)"),
  });

  const { isLoading, stop, object, submit } = useObject({
    api: "/api/completion",
    schema:
      locale === "he"
        ? recipe_schema_hebrew_with_calories
        : recipe_schema_english_with_calories,
    onFinish(event) {
      setIsFinished(true);
      addRecipeHandler(event.object as recipeTypes, token);
      setIsok(true);
      setTimeout(() => {
        setIsok(false);
      }, 3000);
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-6 bg-gradient-to-br from-indigo-50 via-white to-orange-50"
      dir={locale === "he" ? "rtl" : "ltr"}
    >
      {/* Toasts (top-right) */}
      <div
        className={`fixed top-8 right-8 z-50 transition-transform duration-350 ${isOK ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}`}
      >
        <div className="flex items-center gap-3 bg-emerald-500 text-white rounded-xl px-5 py-3 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div className="font-semibold">{t("add")}</div>
        </div>
      </div>
      <div
        className={`fixed top-8 right-8 z-40 transition-transform duration-350 ${isNotOK ? "translate-y-16 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}`}
      >
        <div className="flex items-center gap-3 bg-red-500 text-white rounded-xl px-5 py-3 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <div className="font-semibold">{t("not_added")}</div>
        </div>
      </div>

      {/* Main Card (glass) */}
      <div className="w-full max-w-3xl bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 border border-white/30">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            submit({
              userMail: userMail,
              img: user?.imageUrl,
              token: token,
              calories,
              recipe,
              locale,
            });
          }}
        >
          {/* Header (results) */}
          <div className={`${!isFinished ? "hidden" : "block"}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shadow-inner">
                  {user?.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user?.imageUrl} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">🍽️</div>
                  )}
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-gray-800">{object?.title}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center bg-white rounded-xl px-4 py-3 shadow-sm border">
                  <span className="text-sm text-gray-400">{t("timeToCook")}</span>
                  <span className="font-bold">{object?.cookTime || "N/A"}</span>
                </div>
                <div className="flex flex-col items-center bg-white rounded-xl px-4 py-3 shadow-sm border">
                  <span className="text-sm text-gray-400">{t("serving")}</span>
                  <span className="font-bold">{object?.servings || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-700">{t("items")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {object?.ingredients?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-white rounded-lg p-3 shadow transition-transform hover:translate-y-[-2px]">
                    <p className="font-medium text-gray-700">{item?.name}</p>
                    <p className="text-sm text-gray-500">{item?.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-700">{t("howTo")}</h3>
              <div className="space-y-3">
                {object?.instructions?.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="text-gray-700">{item}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition */}
            <div className="mt-4">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-700">{t("nutritional_facts")}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
                  <span className="text-sm text-gray-400">{t("calories")}</span>
                  <span className="text-xl font-bold">{object?.calories || "N/A"}</span>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
                  <span className="text-sm text-gray-400">{t("carbs")}</span>
                  <span className="text-xl font-bold">{object?.carbs || "N/A"}</span>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
                  <span className="text-sm text-gray-400">{t("fats")}</span>
                  <span className="text-xl font-bold">{object?.fats || "N/A"}</span>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
                  <span className="text-sm text-gray-400">{t("protein")}</span>
                  <span className="text-xl font-bold">{object?.protein || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Loader & Inputs */}
          <div className="flex flex-col items-center gap-6 mt-8 w-full">
            {isLoading && (
              <div className="w-full max-w-xl">
                <div className="h-2 w-full rounded-full overflow-hidden bg-gray-200">
                  <div className="h-full w-1/3 bg-gradient-to-r from-orange-400 via-pink-500 to-indigo-500 animate-[marquee_1.8s_linear_infinite]"></div>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white shadow-lg animate-pulse">AI</div>
                </div>
              </div>
            )}

            <input
              className="rounded-2xl shadow-lg p-4 w-full max-w-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400 bg-white"
              placeholder={isLoading ? "..." : t("question")}
              onChange={(e) => setRecipe(e.target.value)}
              disabled={isLoading}
            />

            <div className={`${isCaloriesClicked ? "block" : "hidden"} w-full max-w-xl`}>
              <input
                type="number"
                value={calories as number}
                min={1}
                className="rounded-2xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white"
                placeholder={isLoading ? "..." : t("number_of_calories")}
                onChange={handleCaloreChange}
                disabled={isLoading}
              />
            </div>

            <div className="w-full max-w-xl flex items-center justify-between">
              <label className="flex items-center gap-3">
                <span className="text-lg font-medium">{t("with_calories")}</span>
                <input
                  onChange={handleCaloreClick}
                  type="checkbox"
                  className="w-5 h-5 rounded-md text-orange-500"
                  checked={isCaloriesClicked}
                  disabled={isLoading}
                />
              </label>

              <div className="flex gap-4">
                <button
                  className={`px-6 py-3 rounded-2xl text-white font-semibold shadow-lg transition transform ${isLoading ? "opacity-60 cursor-not-allowed" : "hover:scale-105"} bg-gradient-to-r from-orange-400 to-pink-500`}
                  disabled={isLoading}
                  type="submit"
                >
                  {t("send")}
                </button>
                <button
                  className="px-6 py-3 rounded-2xl font-semibold border border-gray-200 bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50"
                  type="button"
                  onClick={stop}
                  disabled={!isLoading}
                >
                  {t("stop")}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
