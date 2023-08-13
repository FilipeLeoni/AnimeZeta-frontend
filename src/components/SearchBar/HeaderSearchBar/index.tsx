"use client";
import React, { useEffect, useState } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useQuery } from "react-query";
import { useJikanAPI } from "@/hooks/useJikanApi";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "@/components/SpinnerLoading";

export default function HeaderSearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const router = useRouter();

  const api = useJikanAPI();

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

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleSuggestionSubmit = (query: any) => {
    const queryString = encodeURIComponent(query);
    router.push(`/anime/search?q=${queryString}`);
    setQuery("");
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
          className="w-64 bg-gray-200 h-auto focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-2xl p-1 pl-10 pr-10"
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
            {isLoading && isFetching ? (
              <div className="w-full h-full flex justify-center ">
                <Spinner />
              </div>
            ) : isSearchPerformed && suggestions.length === 0 ? (
              <div className="text-center text-gray-500 p-4">Not found...</div>
            ) : (
              suggestions?.slice(0, 6).map((suggestion: any) => (
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
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
