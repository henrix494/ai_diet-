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
      className="flex justify-center pb-8 mt-10 bg-gradient-to-br  rounded-3xl  "
      dir={locale === "he" ? "rtl" : "ltr"}
    >
      {/* Toasts */}
      <div
        className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${isOK ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="alert alert-success rounded-xl shadow-lg px-8 py-4 text-lg">
          <span className="text-2xl">{t("add")}</span>
        </div>
      </div>
      <div
        className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${isNotOK ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="alert alert-error rounded-xl shadow-lg px-8 py-4 text-lg">
          <span className="text-2xl">{t("not_added")}</span>
        </div>
      </div>
      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white/80 rounded-2xl shadow-2xl  p-0 md:p-10">
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
          {/* Header */}
          <div className={`${!isFinished && "hidden"}`}>
            <div className="flex flex-col md:flex-row md:justify-around items-center mb-8 text-orange-500 font-extrabold text-2xl md:text-3xl space-y-4 md:space-y-0 md:space-x-4">
              <div>
                <div className="text-center md:flex-1 text-3xl md:text-4xl font-bold text-gray-800">
                  <span>{object?.title}</span>
                </div>
                <div className="flex justify-between mt-10">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-400">
                      {t("timeToCook")}
                    </span>
                    <span>{object?.cookTime || "N/A"}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-400">
                      {t("serving")}
                    </span>
                    <span>{object?.servings || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Ingredients */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl text-gray-700 font-semibold mb-4">
                {t("items")}
              </h3>
              {object?.ingredients?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-center text-lg text-gray-700 bg-gray-100 px-4 md:px-5 py-2 md:py-3 rounded-lg shadow-sm hover:bg-orange-100 transition-colors duration-200"
                >
                  <p className="font-medium">{item?.name}</p>
                  <p className="text-gray-500">{item?.quantity}</p>
                </div>
              ))}
            </div>
            {/* Instructions */}
            <div className="mt-8 md:mt-10 space-y-3 md:space-y-4 text-gray-700">
              <h3 className="text-xl md:text-2xl text-gray-700 font-semibold mb-4">
                {t("howTo")}
              </h3>
              {object?.instructions?.map((item, index) => (
                <p
                  key={index}
                  className="bg-gray-100 p-3 md:p-4 rounded-lg shadow-sm hover:bg-orange-100 transition-colors duration-200"
                >
                  {item}
                </p>
              ))}
            </div>
            {/* Nutrition */}
            <div className="mt-8 md:mt-10 space-y-6 md:space-y-8 text-gray-700">
              <h3 className="text-xl md:text-2xl text-gray-700 font-semibold mb-4">
                {t("nutritional_facts")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="flex flex-col items-center bg-gray-100 p-4 md:p-6 rounded-lg shadow-sm hover:bg-orange-100 transition-colors duration-200">
                  <span className="text-sm text-gray-400">{t("calories")}</span>
                  <span className="text-xl md:text-2xl font-bold">
                    {object?.calories || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col items-center bg-gray-100 p-4 md:p-6 rounded-lg shadow-sm hover:bg-orange-100 transition-colors duration-200">
                  <span className="text-sm text-gray-400">{t("carbs")}</span>
                  <span className="text-xl md:text-2xl font-bold">
                    {object?.carbs || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col items-center bg-gray-100 p-4 md:p-6 rounded-lg shadow-sm hover:bg-orange-100 transition-colors duration-200">
                  <span className="text-sm text-gray-400">{t("fats")}</span>
                  <span className="text-xl md:text-2xl font-bold">
                    {object?.fats || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col items-center bg-gray-100 p-4 md:p-6 rounded-lg shadow-sm hover:bg-orange-100 transition-colors duration-200">
                  <span className="text-sm text-gray-400">{t("protein")}</span>
                  <span className="text-xl md:text-2xl font-bold">
                    {object?.protein || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Loader & Inputs */}
          <div className="flex flex-col items-center gap-7 mt-10 w-full ">
            {isLoading && (
              <div className="flex items-center justify-center w-full">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
            <input
              className=" rounded-xl shadow-xl p-4 w-full max-w-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder={isLoading ? "..." : t("question")}
              onChange={(e) => setRecipe(e.target.value)}
              disabled={isLoading}
            />
            <div
              className={`${isCaloriesClicked ? "block" : "hidden"} w-full max-w-xl`}
            >
              <input
                type="number"
                value={calories as number}
                min={1}
                className=" rounded-xl  p-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder={isLoading ? "..." : t("number_of_calories")}
                onChange={handleCaloreChange}
                disabled={isLoading}
              />
            </div>
            <div className="form-control w-full max-w-xl flex flex-row items-center justify-center gap-3">
              <label className="label cursor-pointer flex items-center gap-2">
                <span className="label-text text-xl">{t("with_calories")}</span>
                <input
                  onChange={handleCaloreClick}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={isCaloriesClicked}
                  disabled={isLoading}
                />
              </label>
            </div>
            <div className="flex justify-center gap-6 w-full">
              <button
                className="btn btn-accent px-10 text-xl rounded-xl shadow-md transition-all duration-200 hover:scale-105"
                disabled={isLoading}
                type="submit"
              >
                {t("send")}
              </button>
              <button
                className="btn btn-warning px-10 text-xl rounded-xl shadow-md transition-all duration-200 hover:scale-105"
                type="button"
                onClick={stop}
                disabled={!isLoading}
              >
                {t("stop")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
