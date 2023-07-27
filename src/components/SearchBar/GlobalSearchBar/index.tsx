"use client";

import Spinner from "@/components/SpinnerLoading";
import { useJikanAPI } from "@/hooks/useJikanApi";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

export default function SearchBar() {
  const [query, setQuery] = useState<any>("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams.get("q") : null;

  const api = useJikanAPI();
  const router = useRouter();

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  const {
    data: suggestions,
    isLoading,
    isFetching,
  } = useQuery(
    ["suggestions", debouncedQuery],

    async () => {
      if (debouncedQuery.trim() !== "") {
        const response = await api.searchAnime(debouncedQuery);
        const data = response.data.map((result: any) => result.title);
        setIsSearchPerformed(true);
        return data;
      }
      setIsSearchPerformed(false);
      return [];
    }
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSuggestionSubmit = (query: string) => {
    const queryString = encodeURIComponent(query);
    router.push(`/anime/search?q=${queryString}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSuggestionSubmit(query);
      setIsInputFocused(false);
    }
  };

  const clearText = () => {
    setQuery("");
    setDebouncedQuery("");
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const SuggestionsList = useMemo(() => {
    if (isLoading || isFetching) {
      return (
        <div className="w-full h-full flex justify-center">
          <Spinner />
        </div>
      );
    } else if (isSearchPerformed && suggestions.length === 0) {
      return <div className="text-center text-gray-500 p-4">Not found...</div>;
    } else {
      return (
        <>
          {suggestions?.slice(0, 6).map((suggestion: any) => (
            <motion.li
              key={suggestion}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ delay: 0.3 }}
              onMouseDown={() => handleSuggestionSubmit(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </motion.li>
          ))}
        </>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, isSearchPerformed, suggestions]);

  return (
    <div className="relative text-gray-600">
      <div>
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <MagnifyingGlass size={20} />
        </span>
        <input
          placeholder="Search"
          onChange={handleInputChange}
          value={query}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="w-64 bg-white h-auto focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-xl p-1 pl-10 pr-10 py-2"
        />
        {query !== "" ? (
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-900 transition-all"
            onClick={clearText}
          >
            <X size={16} weight="bold" />
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {isInputFocused && (
          <motion.ul
            className="absolute z-10 bg-white shadow rounded mt-2 w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            exit={{ opacity: 0 }}
          >
            {SuggestionsList}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
