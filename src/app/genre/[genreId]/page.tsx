"use client";
import AnimeCard from "@/components/AnimeCard";
import { useJikanAPI } from "@/hooks/useJikanApi";
import React, { useEffect, useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import CategoriesOptions from "@/utils/HeaderOptions/CategoriesOptions";
import Spinner from "@/components/SpinnerLoading";
import Link from "next/link";

export default function GenrePage({ params }: { params: { genreId: number } }) {
  const api = useJikanAPI();
  const genreId = params.genreId;

  const genre = CategoriesOptions.find(
    (category: any) => category.id == genreId
  );

  const fetchAnimesByGenre = async (genre: number, page: number) => {
    const res = await api.getAnimesByGenre(genre, page);
    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["genreAnime"],
    queryFn: ({ pageParam = 1 }) => fetchAnimesByGenre(genreId, pageParam),
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
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main className="flex flex-col items-center gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0">
      <h1 className="font-medium text-2xl text-gray-800 mb-12">
        {genre?.name}
      </h1>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap gap-5 justify-center">
          {genreAnime &&
            genreAnime.map((anime: any) => (
              <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
                <AnimeCard data={anime} />
              </Link>
            ))}

          <div ref={ref} className="" />
        </div>
      )}
    </main>
  );
}
