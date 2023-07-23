import React from "react";

export default function AnimeCard({ data }: any) {
  const image =
    data.images?.webp?.large_image_url ||
    data.images?.webp?.image_url ||
    data.imageUrl;
  const title = data.title || data.name;

  return (
    <div className="w-44 h-full flex text-grayDark hover:scale-110 transition-all">
      <div className="w-44 h-full rounded-lg relative cursor-pointer flex flex-col items-center text-center gap-2 ">
        <div
          className="w-44 h-64 bg-cover bg-center rounded-lg drop-shadow-md"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        <div className="font-medium text-sm">{title}</div>
      </div>
    </div>
  );
}
