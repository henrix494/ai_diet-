"use server";
import { NextResponse, NextRequest } from "next/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
export const editFav = async (id: string) => {
  try {
    const currentRecipe = await fetchQuery(api.tasks.getCurrentRecipe, {
      recipeId: id,
    });

    if (!currentRecipe) {
      return NextResponse.error();
    }
    const updatedIsFavorite = !currentRecipe[0].isFavorite;
    await fetchMutation(api.tasks.EditFav, {
      recipeId: id,
      stats: updatedIsFavorite,
    });
  } catch (error) {
    return NextResponse.error();
  }
};
