"use client";
import SearchBar from "@/components/SearchBar/GlobalSearchBar";
import { useJikanAPI } from "@/hooks/useJikanApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import TypeOptions, { TypeOption } from "@/utils/FormatOptions/TypeOptions";
import Link from "next/link";
import { AnimeTypes, GenreTypes } from "@/@types/anime";
import dynamic from "next/dynamic";
import { LoadingAnimeCard } from "@/components/AnimeCard/AnimeCardLoading";
import AnimeCard from "@/components/AnimeCard";

const SelectCustom = dynamic(() => import("@/components/Select"));

export default function AnimeSearch() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedType, setSelectedType] = useState<TypeOption | null>(null);

  const router = useRouter();

  const pathname = usePathname();

  const searchParams: any = useSearchParams();
  const searchQuery = searchParams ? searchParams.get("q") : null;
  const searchGenres = searchParams ? searchParams.get("genres") : null;
  const searchType = searchParams ? searchParams.get("type") : null;

  const api = useJikanAPI();

  const { data: Genre, isSuccess } = useQuery("genre", async () => {
    const res = await api.getGenres();
    return res.data;
  });

  useEffect(() => {
    if (isSuccess) {
      const selectedGenresIds = searchGenres ? searchGenres.split(",") : [];

      const selectedGenresOptions = selectedGenresIds?.map(
        (genreId: string) => {
          const genreoption = Genre?.find(
            (genre: GenreTypes) => genre.mal_id === parseInt(genreId)
          );
          return { value: genreoption?.mal_id, label: genreoption?.name };
        }
      );
      setSelectedGenres(selectedGenresOptions);
    }
  }, [searchGenres, isSuccess, Genre]);

  useEffect(() => {
    const selectedTypeOption: TypeOption | undefined = TypeOptions.find(
      (type: TypeOption) => type.value.toString() === searchType
    );
    if (selectedTypeOption) {
      setSelectedType(selectedTypeOption);
    } else {
      setSelectedType(null);
    }
  }, [searchType]);

  const { data: Results, isLoading } = useQuery(
    ["searchResults", searchQuery, selectedGenres, selectedType],
    async () => {
      const response = await api.searchAnime(
        searchQuery,
        selectedGenres,
        selectedType
      );
      return response.data;
    }
  );

  const CreateQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleGenreChange = (selectedOption: TypeOption[]) => {
    const genreParams = selectedOption
      .map((genre: any) => genre.value)
      .join(",");

    const queryString = CreateQueryString("genres", genreParams);
    const newUrl = `${pathname}?${queryString}`;

    router.push(newUrl);
  };

  const handleTypeChange = (selectedOption: any) => {
    const typeParams = selectedOption ? selectedOption.value : null;
    const queryString = CreateQueryString("type", typeParams);
    const newUrl = `${pathname}?${queryString}`;
    router.push(newUrl);
  };

  return (
    <div>
      <div className="flex items-center gap-8 justify-center flex-wrap">
        <div className="shadow-lg">
          <SearchBar />
        </div>

        <div className="w-64 drop-shadow-lg z-20">
          <SelectCustom
            isMulti={true}
            onChange={handleGenreChange}
            value={selectedGenres}
            options={Genre?.map((genre: GenreTypes) => ({
              value: genre.mal_id,
              label: genre.name,
            }))}
            placeholder="Genres..."
          />
        </div>
        <div className="w-64 drop-shadow-lg z-10">
          <SelectCustom
            onChange={handleTypeChange}
            value={selectedType}
            options={TypeOptions.map((type: TypeOption) => ({
              value: type.value,
              label: type.label,
            }))}
            placeholder="Type"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 md:gap-6 justify-center mt-16">
        {Results?.map((results: AnimeTypes) => (
          <Link
            key={results.mal_id}
            href={`/anime/${results.mal_id}`}
            prefetch={true}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Suspense fallback={<LoadingAnimeCard />}>
                <AnimeCard data={results} />
              </Suspense>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
