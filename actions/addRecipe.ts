"use server";

import { fetchMutation } from "convex/nextjs";
import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
export interface recipeTypes {
  _id: Id<"recipes">;
  _creationTime: number;
  title: string;
  ingredients: { name: string; quantity: string }[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  isFavorite: boolean;
  calories?: number;
  carbs?: number;
  fats?: number;
  protein?: number;
}
export const addRecipeHandler = async (
  recipe: recipeTypes,
  token: string | undefined
) => {
  console.log(recipe);
  if (!token) return NextResponse.json({ msg: "No Token", status: 401 });
  await fetchMutation(
    api.tasks.createRecipe,
    {
      title: recipe.title,
      ingredients: recipe.ingredients,
      cookTime: recipe.cookTime,
      instructions: recipe.instructions,
      isFavorite: false,
      prepTime: recipe.prepTime,
      servings: recipe.servings,
      calories: recipe.calories,
      carbs: recipe.carbs,
      fats: recipe.fats,
      protein: recipe.protein,
    },
    {
      token: token,
    }
  );
  return NextResponse.json({ msg: "Ok", status: 201 });
};
