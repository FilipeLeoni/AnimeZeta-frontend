"use client";
import { useEffect, useRef, useState } from "react";
import AnimeCard from "@/components/AnimeCard";
import SubTitle from "@/components/Text/SubTitles";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Carousel } from "@trendyol-js/react-carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "swiper/css";

import "swiper/css/pagination";

export default function Home() {
  const [dataT, setDataT] = useState<any>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function getData() {
      const res = await fetch("https://api.jikan.moe/v4/top/anime");
      const data = await res.json();
      setDataT(data.data);
    }
    getData();
  }, []);

  const slideWidth = 193;

  const nextSlide = () => {
    const numSlides = dataT.length;
    setCurrentSlide((prevSlide) => (prevSlide + 2) % numSlides);
  };

  const prevSlide = () => {
    const numSlides = dataT.length;
    setCurrentSlide((prevSlide) => (prevSlide - 2 + numSlides) % numSlides);
  };

  const settings = {
    className: "slider variable-width",
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 1,
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
    <main className="flex min-h-screen flex-col items-center pt-24 bg-gradient-to-b from-background to-[#e3e8f4] w-screen px-20">
      <div className="grid grid-cols-1 w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6  lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0">
        <div className="relative w-full col-span-12">
          <Slider {...settings}>
            {dataT.map((data: any, index: any) => (
              <AnimeCard data={data} key={index} />
            ))}
          </Slider>
        </div>
        <div className="relative w-full col-span-12">
          <Slider {...settings}>
            {dataT.map((data: any, index: any) => (
              <AnimeCard data={data} key={index} />
            ))}
          </Slider>
        </div>
        <div className="relative w-full col-span-12">
          <Slider {...settings}>
            {dataT.map((data: any, index: any) => (
              <AnimeCard data={data} key={index} />
            ))}
          </Slider>
        </div>
      </div>
    </main>
  );
}
