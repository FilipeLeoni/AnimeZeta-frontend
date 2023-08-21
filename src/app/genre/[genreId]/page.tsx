"use client";
import AnimeCard from "@/components/AnimeCard";
import { useJikanAPI } from "@/hooks/useJikanApi";
import React, { Suspense, startTransition, useEffect, useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import CategoriesOptions, {
  CategoriesTypes,
} from "@/utils/HeaderOptions/CategoriesOptions";
import Spinner from "@/components/SpinnerLoading";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimeTypes } from "@/@types/anime";
import { LoadingAnimeCard } from "@/components/AnimeCard/AnimeCardLoading";

export default function GenrePage({ params }: { params: { genreId: number } }) {
  const api = useJikanAPI();
  const genreId = params.genreId;

  const genre = CategoriesOptions.find(
    (category: CategoriesTypes) => category.id == genreId
  );

  const fetchAnimesByGenre = async (genre: number, page: number) => {
    const res = await api.getAnimesByGenre(genre, page);
    return res.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["genreAnime", genreId],
      queryFn: ({ pageParam = 1 }) => fetchAnimesByGenre(genreId, pageParam),
      keepPreviousData: false,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    });

  const genreAnime = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      startTransition(() => {
        fetchNextPage();
      });
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main className="flex flex-col items-center gap-4 sm:gap-6 lg:max-w-5xl md:mx-20 max-w-full">
      <header>
        <title>Genre - AnimeZeta</title>
      </header>
      <h1 className="font-medium text-2xl text-gray-800 mb-12">
        {genre?.name}
      </h1>

      <div className="flex flex-wrap gap-2 md:gap-5 justify-center">
        {genreAnime?.map((anime: AnimeTypes) => (
          <Link
            key={anime.mal_id}
            href={`/anime/${anime.mal_id}`}
            prefetch={false}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Suspense fallback={<LoadingAnimeCard />}>
                <AnimeCard data={anime} />
              </Suspense>
            </motion.div>
          </Link>
        ))}

        <div ref={ref} />
      </div>
    </main>
  );
}
