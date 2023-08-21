import Image from "next/image";
import React from "react";

export default function EditAnimeCard({ data, onClick }: any) {
  const image =
    data.images?.webp?.large_image_url ||
    data.images?.webp?.image_url ||
    data.imageUrl;
  const title = data.title || data.name;

  return (
    <div className="w-44 h-full flex text-grayDark hover:scale-110 transition-all scale-75 md:scale-90 lg:scale-100">
      <div className="w-32 h-full md:w-44 rounded-md relative cursor-pointer flex flex-col items-center text-center gap-2 group ">
        <div className="w-32 h-52 md:w-44 md:h-64 bg-cover bg-center rounded-md drop-shadow-md overflow-hidden relative">
          <Image
            src={image}
            alt={title}
            fill
            sizes="100%"
            style={{ objectFit: "cover" }}
          />
          <button
            className="bg-white/95 py-3 text-sm font-semibold w-full bottom-0 left-0 duration-300 absolute opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onClick}
          >
            EDIT
          </button>
        </div>
        <div className="font-medium text-sm">{title}</div>
      </div>
    </div>
  );
}
