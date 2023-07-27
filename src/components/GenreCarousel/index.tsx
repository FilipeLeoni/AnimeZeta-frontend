"use client";
import React, { ElementType } from "react";
import SubTitle from "../Text/SubTitles";
import Slider from "react-slick";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import AnimeCard from "../AnimeCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

interface Props {
  AnimeData: any;
  Title: string;
}

export default function GenreCarousel({ AnimeData, Title }: Props) {
  const settings = {
    className: "slider variable-width",
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 1,
    prevArrow: (
      <CaretCircleLeft color={"#1e1e1e"} weight="fill" className="slick-prev" />
    ),
    nextArrow: (
      <CaretCircleRight
        color={"#1e1e1e"}
        weight="fill"
        className="slick-next"
      />
    ),

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full col-span-12">
      <SubTitle>{Title}</SubTitle>
      <Slider {...settings} className="z-20 h-96">
        {AnimeData &&
          AnimeData.map((data: any) => (
            <Link
              key={data.mal_id}
              prefetch={false}
              href={`/anime/${data.mal_id}`}
              className="h-full py-10 mx-6"
            >
              <AnimeCard data={data} />
            </Link>
          ))}
      </Slider>
    </div>
  );
}
