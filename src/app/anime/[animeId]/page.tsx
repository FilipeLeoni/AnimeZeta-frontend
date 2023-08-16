import { useJikanAPI } from "@/hooks/useJikanApi";
import Image from "next/image";

import { GenreTypes } from "@/@types/anime";
import dynamic from "next/dynamic";
import CharacterDescription from "@/components/Character";
import { AddToList } from "@/components/AddToList";
import { Suspense } from "react";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { FaPlay } from "react-icons/fa6";
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
    <div className="flex flex-col items-center gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0">
      <div>
        <div className="w-full flex gap-24">
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
          <div className="max-w-xl flex flex-col flex-wrap">
            <h1 className="text-4xl font-medium text-gray-800 mb-2">
              {data.title}
            </h1>
            <div className="w-full h-0.5 rounded bg-gray-300" />
            <div className="flex gap-2 items-center text-gray-700 my-2 pl-2">
              <p>{data.year}</p>
              <div className="w-1 h-1 rounded-full bg-gray-600" />
              <div className="flex gap-2">
                {data.genres?.slice(0, 3).map((genre: GenreTypes) => (
                  <p key={genre.mal_id}>{genre.name} -</p>
                ))}
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600" />
              <p>{data.duration}</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-300" />
            <CharacterDescription>{data.synopsis}</CharacterDescription>
            <div className="flex mt-20 gap-14">
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
