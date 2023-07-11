"use client";
import SearchBar from "@/components/SearchBar/GlobalSearchBar";
import SelectCustom from "@/components/Select";
import { useJikanAPI } from "@/hooks/useJikanApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import clsx from "clsx";
import { motion } from "framer-motion";
import TypeOptions from "@/utils/FormatOptions/TypeOptions";
import AnimeCard from "@/components/AnimeCard";
import Spinner from "@/components/SpinnerLoading";
import Link from "next/link";

export default function AnimeSearch() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [genre, setGenre] = useState<any>([]);

  const router: any = useRouter();

  const pathname = usePathname();

  const searchParams: any = useSearchParams();
  const searchQuery: any = searchParams ? searchParams.get("q") : null;
  const searchGenres: any = searchParams ? searchParams.get("genres") : null;
  const searchType: any = searchParams ? searchParams.get("type") : null;

  const api = useJikanAPI();

  function SearchBarFallback() {
    return <>{searchQuery}</>;
  }

  const { data: Genre, isSuccess } = useQuery("genre", async () => {
    const res = await api.getGenres();
    return res.data;
  });

  useEffect(() => {
    if (isSuccess) {
      const selectedGenresIds = searchGenres ? searchGenres.split(",") : [];

      const selectedGenresOptions = selectedGenresIds?.map((genreId: any) => {
        const genreoption = Genre?.find(
          (genre: any) => genre.mal_id === parseInt(genreId)
        );
        return { value: genreoption?.mal_id, label: genreoption?.name };
      });
      setSelectedGenres(selectedGenresOptions);
    }
  }, [searchGenres, isSuccess, Genre]);

  useEffect(() => {
    const selectedTypeOption: any = TypeOptions.find(
      (type: any) => type.value.toString() === searchType
    );
    if (selectedTypeOption) {
      setSelectedType(selectedTypeOption);
    } else {
      setSelectedType(null);
    }
  }, [searchType]);

  const {
    data: Results,
    isLoading,
    error,
  } = useQuery(
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

  const handleGenreChange = (selectedOption: any) => {
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
      <header>
        <title>Search Animes - AnimeZeta</title>
      </header>
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
            onChange={handleGenreChange}
            value={selectedGenres}
            options={Genre?.map((genre: any) => ({
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
            options={TypeOptions.map((type: any) => ({
              value: type.value,
              label: type.label,
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
            <Link
              key={results.mal_id}
              href={`/anime/${results.mal_id}`}
              prefetch={false}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <AnimeCard data={results} />
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
