import React from "react";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import type { Metadata, ResolvingMetadata } from "next";
export default async function page(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
) {
  const { id } = params;

  const recepit = await fetchQuery(api.tasks.getCurrentRecipe, {
    recipeId: id,
  });

  return (
    <div className="flex justify-center items-center h-[70vh] max-lg:mt-[70%]">
      {recepit.map((item) => {
        return (
          <div
            key={item._id}
            className=" bg-base-200 lg:w-[60vw] p-10 rounded-xl shadow-2xl "
          >
            <div className="font-bold text-2xl">{item.title}</div>
            <div dangerouslySetInnerHTML={{ __html: item.recipe }}></div>
          </div>
        );
      })}
    </div>
  );
}
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const id = params.id;

  // fetch data
  const recepit = await fetchQuery(api.tasks.getCurrentRecipe, {
    recipeId: id,
  });

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: recepit[0].title,
  };
}
