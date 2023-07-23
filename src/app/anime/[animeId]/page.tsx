"use client";
import AddToList from "@/components/Buttons/AddToList";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import Spinner from "@/components/SpinnerLoading";
import { useJikanAPI } from "@/hooks/useJikanApi";
import { Play } from "@phosphor-icons/react";
import Image from "next/image";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import AnimeOtherOptions from "@/utils/AnimeOptions/OthersOptions";
import AnimeCard from "@/components/AnimeCard";
import StaffCard from "@/components/StaffCard";
import Accordion from "@/components/AccordionCustom";
import Link from "next/link";
import clsx from "clsx";
import Loading from "./loading";
import Head from "next/head";
import useAddToList from "@/hooks/useAddToList";

export default function AnimePage({ params }: { params: { animeId: number } }) {
  const [selectedItem, setSelectedItem] = useState("characters");
  const [itemsToShow, setItemsToShow] = useState(20);
  const [showFullText, setShowFullText] = useState(false);

  function handleWatchTrailer(link: any) {
    const trailerUrl = link;
    window.open(trailerUrl, "_blank");
  }

  const handleLoadMore = () => {
    console.log("fui chamado");
    setItemsToShow((prevItems) => prevItems + 20);
  };

  console.log(itemsToShow);
  const api = useJikanAPI();
  const animeId = params.animeId;

  const {
    data,
    isLoading: isLoadingAnime,
    error,
  } = useQuery("anime", async () => {
    const res = await api.getAnimeById(animeId);
    return res.data;
  });

  const { data: InfoData, isLoading } = useQuery(
    ["animeInfo", selectedItem, animeId],
    async () => {
      const res = await api.getAnimeInfoByType(
        animeId,
        selectedItem.toLowerCase()
      );
      return res.data;
    }
  );

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0">
        <header>
          <title>AnimeZeta</title>
        </header>
        <main>
          {isLoadingAnime ? (
            <Loading />
          ) : (
            <div className="w-full flex gap-24">
              <div className="drop-shadow-lg">
                <Image
                  src={data.images.webp.large_image_url}
                  alt={data.title}
                  width={176}
                  height={256}
                  className="rounded-lg drop-shadow-lg"
                />
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
                    {data.genres?.slice(0, 3).map((genre: any) => (
                      <p key={genre.mal_id}>{genre.name} -</p>
                    ))}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-600" />
                  <p>{data.duration}</p>
                </div>
                <div className="w-full h-0.5 rounded bg-gray-300" />
                <div className="max-w-xl hover:bg-slate-200 rounded-lg mt-2 pt-2 px-2 relative">
                  <p
                    className={clsx(
                      "text-overflow-ellipsis text-gray-700",
                      showFullText ? "" : "line-clamp-6"
                    )}
                  >
                    {data.synopsis}
                  </p>
                  <div
                    className="text-xs text-right text-gray-500 hover:underline absolute -bottom-6 right-0 cursor-pointer"
                    onClick={() => setShowFullText(!showFullText)}
                  >
                    {showFullText ? "Show less" : "Show more"}
                  </div>
                </div>
                <div className="flex mt-20 gap-14">
                  <SecondaryButton
                    icon={Play}
                    onClick={() => handleWatchTrailer(data.trailer.url)}
                  >
                    Watch trailer
                  </SecondaryButton>
                  <AddToList animeData={data} />
                </div>
              </div>
            </div>
          )}
        </main>

        <section className="w-full pt-20">
          <div className="divider h-0.5 bg-gray-300" />
          <div className="mt-2">
            <ul className="flex justify-around text-gray-500 font-medium">
              {AnimeOtherOptions.map((options) => (
                <li
                  key={options.id}
                  className="cursor-pointer hover:bg-slate-300 px-8 py-3 rounded relative transition-all"
                  onClick={() => handleItemClick(options.endpoint)}
                >
                  {options.name}

                  {selectedItem === options.endpoint && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400 rounded-full"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {selectedItem === "characters" && (
              <>
                {isLoading ? (
                  <Spinner />
                ) : (
                  InfoData &&
                  InfoData.slice(0, itemsToShow).map(
                    (characterData: any, index: number) => (
                      <Link
                        key={characterData.character.mal_id}
                        href={`/anime/character/${characterData.character.mal_id}`}
                        prefetch={false}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                          <AnimeCard data={characterData.character} />
                        </motion.div>
                      </Link>
                    )
                  )
                )}
              </>
            )}

            {selectedItem === "staff" && (
              <>
                {isLoading ? (
                  <Spinner />
                ) : (
                  InfoData &&
                  InfoData.slice(0, 25).map((person: any, index: number) => (
                    <motion.div
                      key={person.person.mal_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <StaffCard data={person} />
                    </motion.div>
                  ))
                )}
              </>
            )}

            {selectedItem === "reviews" && (
              <>
                {isLoading ? (
                  <Spinner />
                ) : (
                  InfoData && (
                    <div className="flex flex-col gap-10 items-center">
                      {InfoData.slice(0, 7).map(
                        (review: any, index: number) => (
                          <motion.div
                            key={review.mal_id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Accordion data={review} />
                          </motion.div>
                        )
                      )}
                    </div>
                  )
                )}
              </>
            )}

            {selectedItem === "recommendations" && (
              <>
                {isLoading ? (
                  <Spinner />
                ) : (
                  InfoData && (
                    <>
                      {InfoData.slice(0, 15).map((anime: any, index: any) => (
                        <motion.div
                          key={anime.entry.mal_id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link href={`/anime/${anime.entry.mal_id}`}></Link>
                          <AnimeCard
                            key={anime.entry.mal_id}
                            data={anime.entry}
                          />
                        </motion.div>
                      ))}
                    </>
                  )
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
