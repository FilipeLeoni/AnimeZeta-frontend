import { useJikanAPI } from "@/hooks/useJikanApi";
import Image from "next/image";

import { GenreTypes } from "@/@types/anime";
import dynamic from "next/dynamic";
import CharacterDescription from "@/components/Character";
import { AddToList } from "@/components/AddToList";
import { Suspense } from "react";

import WatchTrailer from "@/components/Modal/WatchTrailer";

const ExtraInfo = dynamic(() => import("@/components/ExtraInfo"));

export default async function AnimePage({
  params,
}: {
  params: { animeId: number };
}) {
  const api = useJikanAPI();
  const animeId = params.animeId;
  const { data } = await api.getAnimeById(animeId);

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 xl:max-w-5xl max-w-full mx-2 xl:mx-20">
      <div className="w-full">
        <div className="w-full flex lg:flex-row flex-col gap-6 lg:gap-24 items-center lg:items-start">
          <div className="drop-shadow-lg w-44 h-64">
            <Suspense fallback={<div>Loading...</div>}>
              <Image
                src={data?.images?.webp.large_image_url}
                alt={data?.title}
                fill
                sizes="100%"
                style={{ objectFit: "cover" }}
                className="rounded-lg drop-shadow-lg object-cover"
                loading="lazy"
              />
            </Suspense>
          </div>
          <div className="max-w-xl flex flex-col flex-wrap items-center lg:items-start text-center lg:text-start">
            <h1 className="text-4xl font-medium text-gray-800 mb-2 ">
              {data.title}
            </h1>
            <div className="w-full h-0.5 rounded bg-gray-300" />
            <div className="flex gap-2 items-center text-gray-700 my-2 pl-2 flex-wrap text-sm justify-center md:text-base">
              <p>{data.year}</p>
              <div className="w-1 h-1 rounded-full bg-gray-600" />
              <div className="flex gap-2 flex-wrap">
                {data.genres?.slice(0, 3).map((genre: GenreTypes) => (
                  <p key={genre.mal_id}>{genre.name} -</p>
                ))}
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600" />
              <p>{data.duration}</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-300" />
            <CharacterDescription>{data.synopsis}</CharacterDescription>
            <div className="flex mt-20 gap-14 items-center flex-wrap justify-center">
              <WatchTrailer Link={data.trailer.embed_url} />
              <AddToList animeData={data} />
            </div>
          </div>
        </div>
      </div>

      <ExtraInfo animeId={animeId} />
    </div>
  );
}
