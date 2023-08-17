"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import Badges from "../Badges";
import { inter } from "@/app/fonts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AddToList } from "../AddToList";

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
              className="flex super-carousel bg-cover h-96 rounded-xl bg-center"
            >
              <div className="flex md:flex-row flex-col items-center md:items-start md:justify-between w-full bg-gradient-to-r from-grayDark/95 via-grayDark/75 to-grayDark/60 h-full backdrop-blur-sm px-14 md:pt-14 pt-4 relative rounded-lg bg-center">
                <div className="flex flex-col gap-2 text-backgroundSecondary">
                  <h3 className="text-sm md:text-3xl mb-2 text-center md:text-start">
                    {anime.title}
                  </h3>
                  <div className={inter.className}>
                    <p className="max-w-xl overflow-hidden text-overflow-ellipsis line-clamp-5 mt-2 invisible md:visible drop-shadow-sm">
                      {anime.synopsis}
                    </p>
                  </div>
                  <div className="gap-2 hidden md:flex mt-2">
                    {anime.genres.map((genre: any) => (
                      <Badges key={genre.mal_id}>{genre.name}</Badges>
                    ))}
                  </div>
                  <div className="absolute bottom-8 md:bottom-12 z-20">
                    <AddToList animeData={anime} />
                  </div>
                </div>
                <div className="absolute top-1/2 translate-y-[-50%] inset-y-0 w-1/2 md:static md:translate-y-0 md:w-auto drop-shadow-lg">
                  <Image
                    src={anime.images.webp.large_image_url}
                    alt={anime.title}
                    width={176}
                    height={256}
                    className="rounded-lg md:mr-16 mr-0"
                  />
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
