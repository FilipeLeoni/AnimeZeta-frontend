"use client";
import React, { ElementType, Suspense } from "react";
import SubTitle from "../Text/SubTitles";
import Slider from "react-slick";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import AnimeCard from "../AnimeCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { AnimeTypes } from "@/@types/anime";
import { LoadingAnimeCard } from "../AnimeCard/AnimeCardLoading";

interface Props {
  AnimeData: AnimeTypes[];
}

export default function GenreCarousel({ AnimeData }: Props) {
  const settings = {
    className: "slider variable-width",
    infinite: false,
    speed: 500,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 1,
    arrows: true,
    prevArrow: (
      <CaretCircleLeft
        color={"#1e1e1e"}
        weight="fill"
        className="md:slick-prev custom-next-arrow"
      />
    ),
    nextArrow: (
      <CaretCircleRight
        color={"#1e1e1e"}
        weight="fill"
        className="md:slick-next custom-next-arrow"
      />
    ),

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },

      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          arrows: false,
          centerMode: true,
          centerPadding: "50px",
        },
      },
    ],
  };

  return (
    <div className="w-full col-span-12 bg-red">
      <Slider
        {...settings}
        className="z-20 h-full max-h-96 w-full flex justify-center"
      >
        {AnimeData?.map((data: any) => (
          <Link
            key={data.mal_id}
            prefetch={false}
            href={`/anime/${data.mal_id}`}
            className="h-full py-10 "
          >
            <Suspense fallback={<LoadingAnimeCard />}>
              <AnimeCard data={data} />
            </Suspense>
          </Link>
        ))}
      </Slider>
    </div>
  );
}
