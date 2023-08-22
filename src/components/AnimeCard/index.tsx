import Image from "next/image";
import React from "react";

export default async function AnimeCard({ data }: any) {
  const image =
    data.images?.webp?.large_image_url ||
    data.images?.webp?.image_url ||
    data.imageUrl;
  const title = data.title || data.name;

  return (
    <div className="w-32 flex text-grayDark md:hover:scale-110 transition-all">
      <div className="w-32 h-full md:w-44 rounded-md relative cursor-pointer flex flex-col items-center text-center gap-2">
        <div className="w-32 h-52 md:w-44 md:h-64 bg-cover bg-center rounded-md drop-shadow-md overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="100%"
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </div>
        <div className="font-medium text-sm">{title}</div>
      </div>
    </div>
  );
}
