"use client";
import clsx from "clsx";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function CharacterDescription({ children }: Props) {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <div className="max-w-xl hover:bg-slate-200 rounded-lg mt-2 pt-2 px-2 relative">
      <div
        className={clsx(
          "text-overflow-ellipsis text-gray-700",
          showFullText ? "" : "line-clamp-6"
        )}
      >
        {children}
      </div>

      <div
        className="text-xs text-right text-gray-500 hover:underline absolute -bottom-6 right-0 cursor-pointer"
        onClick={() => setShowFullText(!showFullText)}
      >
        {showFullText ? "Show less" : "Show more"}
      </div>
    </div>
  );
}
