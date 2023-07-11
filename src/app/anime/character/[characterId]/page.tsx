"use client";

import AddToList from "@/components/Buttons/AddToList";
import Spinner from "@/components/SpinnerLoading";
import { useJikanAPI } from "@/hooks/useJikanApi";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import AnimeCard from "@/components/AnimeCard";

export default function AnimePage({
  params,
}: {
  params: { characterId: number };
}) {
  const api = useJikanAPI();
  const characterId = params.characterId;

  const { data, isLoading, error } = useQuery(
    ["anime", characterId],
    async () => {
      const res = await api.getCharacterById(characterId);
      return res.data;
    }
  );

  return (
    <div>
      <head>
        <title>AnimeZeta</title>
      </head>
      <main>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="w-full flex gap-24 justify-center">
            <div className="drop-shadow-lg">
              <Image
                src={data.images.webp.image_url}
                alt={data.name}
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
                  {data.nicknames?.slice(0, 3).map((nickname: any) => (
                    <p key={nickname}>{nickname} -</p>
                  ))}
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-600" />
                <p>{data.favorites}</p>
              </div>
              <div className="w-full h-0.5 rounded bg-gray-300" />
              <div className="max-w-xl hover:bg-slate-200 rounded-lg mt-2 pt-2 px-2 relative">
                <p className="text-overflow-ellipsis line-clamp-6 text-gray-700">
                  {data.about}
                </p>
                <a
                  href="#"
                  className="text-xs text-right text-gray-500 hover:underline absolute -bottom-6 right-0"
                >
                  Show more
                </a>
              </div>
              <div className="flex mt-20 gap-14">
                <AddToList />
              </div>
            </div>
          </div>
        )}

        <section className="w-full pt-20">
          <div className="w-full h-1 rounded-full bg-gray-300" />
          <ul className="flex justify-around mt-2">
            <motion.li
              layout
              className="cursor-pointer hover:bg-slate-300 px-8 py-3 rounded relative transition-all"
            >
              Appearances
              <motion.div
                layoutId="underline"
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400 rounded-full"
              />
            </motion.li>
          </ul>
          <div className="flex flex-wrap gap-6 justify-center mt-12">
            {isLoading ? (
              <Spinner />
            ) : (
              data?.anime?.slice(0, 25).map((appearances: any) => (
                <Link
                  key={appearances.anime.mal_id}
                  href={`/anime/${appearances.anime.mal_id}`}
                  prefetch={false}
                >
                  <AnimeCard data={appearances.anime} />
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
