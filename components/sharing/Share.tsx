"use client";
import { Id } from "@/convex/_generated/dataModel";
import React from "react";
interface props {
  id: Id<"recipes">;
}

export default function Share({ id }: props) {
  // navigator.clipboard.writeText(window.location.href + id);

  const shareHandler = () => {
    const result = window.location.href.replace(/(\/dashboard)[^\/]*/, "");
    navigator.clipboard.writeText(result + "/recipes/search?id=" + id);
  };
  return (
    <div>
      <div className="dropdown dropdown-end">
        <div
          onClick={shareHandler}
          tabIndex={0}
          role="button"
          className="btn m-1"
        >
          Share
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>Share Link</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
