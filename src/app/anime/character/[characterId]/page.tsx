import { useJikanAPI } from "@/hooks/useJikanApi";
import Image from "next/image";
import Link from "next/link";

import AnimeCard from "@/components/AnimeCard";

import CharacterDescription from "@/components/Character";
import { Suspense } from "react";
import { LoadingAnimeCard } from "@/components/AnimeCard/AnimeCardLoading";

export default async function AnimePage({
  params,
}: {
  params: { characterId: number };
}) {
  const api = useJikanAPI();
  const characterId = params.characterId;
  const data = await api.getCharacterById(characterId);

  return (
    <div>
      <head>
        <title>AnimeZeta</title>
      </head>
      <div>
        <div className="w-full flex gap-24 justify-center">
          <div className="drop-shadow-lg">
            <Image
              src={data?.images?.webp.image_url}
              alt={data?.name}
              width={176}
              height={256}
              className="rounded-xl drop-shadow-lg"
            />
          </div>
          <div className=" flex flex-col flex-wrap">
            <h1 className="text-4xl font-medium text-gray-800 mb-2">
              {data.name}
            </h1>
            <div className="w-full h-0.5 rounded bg-gray-300" />
            <div className="flex gap-2 items-center text-gray-700 my-2 pl-2">
              <div className="flex gap-2">
                {data.nicknames?.slice(0, 3).map((nickname: string) => (
                  <p key={nickname}>{nickname} -</p>
                ))}
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600 " />
              <p>{data.favorites}</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-300" />

            <CharacterDescription>{data.about}</CharacterDescription>
          </div>
        </div>

        <section className="w-full pt-36">
          <div className="w-full h-0.5 rounded-full bg-gray-300" />
          <ul className="flex justify-around mt-2">
            <li className="cursor-pointer hover:bg-slate-300 px-8 py-3 rounded relative transition-all text-gray-600 font-medium">
              Appearances
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400 rounded-full" />
            </li>
          </ul>
          <div className="flex flex-wrap gap-6 justify-center mt-12">
            {data?.anime?.slice(0, 25).map((appearances: any) => (
              <Link
                key={appearances.anime.mal_id}
                href={`/anime/${appearances.anime.mal_id}`}
              >
                <Suspense fallback={<LoadingAnimeCard />}>
                  <AnimeCard data={appearances.anime} />
                </Suspense>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
