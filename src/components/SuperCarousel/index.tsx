"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import Badges from "../Badges";
import { AiFillStar } from "react-icons/ai";
import { inter } from "@/app/fonts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AddToList } from "../AddToList";
import clsx from "clsx";

declare global {
  interface Window {
    my_modal_1: HTMLDialogElement;
  }
}

export default function SuperCarousel({ data }: any) {
  const settings: any = {
    dots: true,
    fade: true,
    arrows: false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="w-full mb-20 drop-shadow-xl rounded-lg">
      <Slider {...settings}>
        {data &&
          data.slice(0, 6).map((anime: any) => (
            <div
              key={anime.mal_id}
              className="relative h-[445px] w-full flex overflow-hidden rounded-lg "
            >
              <div className="absolute h-full w-full bg-neutral-900 -z-10" />
              <div className="flex sm:w-1/2 h-full z-10 w-full relative">
                <div className="w-full flex flex-col justify-between sm:justify-center sm:px-14 sm:mb-10">
                  <div>
                    <h3 className="text-lg md:text-3xl mb-2 text-center font-medium md:text-start text-gray-50 z-10 bg-gradient-to-b from-grayDark via-grayDark/80 to-transparent sm:bg-none w-full sm:px-0 sm:pt-0 sm:pb-0 pt-8 pb-8 px-2">
                      {anime.title}
                    </h3>
                  </div>
                  <div className={inter.className}>
                    <p className="max-w-xl synopsis-clamp overflow-hidden my-5 drop-shadow-sm text-gray-200 ">
                      {anime.synopsis}
                    </p>
                  </div>

                  <div className="hidden md:flex mt-2 items-center">
                    {anime.genres.map((genre: any, index: number) => (
                      <div
                        key={genre.mal_id}
                        className={clsx(
                          "text-gray-300",
                          index !== 0 && "pl-2 ml-2 border-l border-gray-300"
                        )}
                      >
                        {genre.name}
                      </div>
                    ))}
                    <div className="flex gap-2 text-gray-300 text-sm ml-2">
                      -
                      <p className="flex items-center gap-1">
                        <AiFillStar />
                        {anime.score}
                      </p>
                      -<p>{anime.year}</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-t from-grayDark via-grayDark/90 to-transparent sm:bg-none w-full z-20 flex justify-center sm:inline pt-8 pb-6 sm:pt-0 sm:pb-0">
                    <div className="sm:absolute bottom-8 md:bottom-12 z-20 text-white">
                      <AddToList animeData={anime} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-full sm:w-1/2 ">
                <Image
                  src={anime.images.webp.large_image_url}
                  alt={anime.title}
                  fill
                  quality={100}
                  sizes="50%"
                  className="object-center object-cover h-full w-full saturate-150 gradient-mask"
                />
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
