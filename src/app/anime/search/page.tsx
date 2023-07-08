"use client";
import SearchBar from "@/components/SearchBar/GlobalSearchBar";
import SelectCustom from "@/components/Select";
import { useJikanAPI } from "@/hooks/useJikanApi";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { useQuery } from "react-query";
import clsx from "clsx";
import TypeOptions from "@/utils/FormatOptions/TypeOptions";
import AnimeCard from "@/components/AnimeCard";
import Spinner from "@/components/SpinnerLoading";
import Link from "next/link";

export default function AnimeSearch() {
  const searchParams = useSearchParams();
  const searchQuery: any = searchParams ? searchParams.get("q") : null;

  const api = useJikanAPI();

  function SearchBarFallback() {
    return <>{searchQuery}</>;
  }

  const { data: Genre } = useQuery("genre", async () => {
    const res = await api.getGenres();
    return res.data;
  });

  const {
    data: Results,
    isLoading,
    error,
  } = useQuery(["results", searchQuery], async () => {
    const res = await api.searchAnime(searchQuery);
    return res.data;
  });

  return (
    <div>
      <h1 className="text-center text-gray-600 font-medium text-4xl mb-10">
        Search
      </h1>
      <div className="flex items-center gap-8 justify-center">
        <div className="shadow-lg">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="w-64 drop-shadow-lg z-10">
          <SelectCustom
            isMulti={true}
            options={Genre?.map((genre: any) => ({
              value: genre.mal_id,
              label: genre.name,
            }))}
            placeholder="Genres..."
          />
        </div>
        <div className="w-64 drop-shadow-lg z-10">
          <SelectCustom
            options={TypeOptions.map((type: any) => ({
              value: type.id,
              label: type.name,
            }))}
            placeholder="Type"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-6 justify-center mt-16">
        {isLoading ? (
          <Spinner />
        ) : (
          Results?.map((results: any) => (
            <Link key={results.mal_id} href={`/anime/${results.mal_id}`}>
              <AnimeCard data={results} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
