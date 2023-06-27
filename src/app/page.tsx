"use client";
import { useEffect, useState } from "react";
import AnimeCard from "@/components/AnimeCard";
import SubTitle from "@/components/Text/SubTitles";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

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

  const slideWidth = 300; // Largura de cada slide (ajuste de acordo com suas necessidades)
  const containerWidth = 1280;

  const nextSlide = () => {
    const numSlides = dataT.length;
    setCurrentSlide((prevSlide) => (prevSlide + 1) % numSlides);
  };

  const prevSlide = () => {
    const numSlides = dataT.length;
    setCurrentSlide((prevSlide) => (prevSlide - 1 + numSlides) % numSlides);
  };

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 bg-background">
      <SubTitle>Fan Favorites</SubTitle>
      <div className="relative max-w-5xl w-full">
        <div className="carousel-container w-full overflow-hidden max-w-5xl h-auto">
          <div
            className="carousel-track flex ease-in-out duration-500 transition-all flex-wrap gap-6"
            style={{
              transform: `translateX(-${currentSlide * slideWidth}px)`,
              width: `${dataT.length * slideWidth}px`,
            }}
          >
            {dataT.map((data: any, index: any) => (
              <div className="carousel-slide " key={index}>
                <AnimeCard data={data} />
              </div>
            ))}
          </div>

          <button
            className="absolute left-[-42px] top-1/3 mt-4 transform -translate-y-1/2"
            onClick={prevSlide}
          >
            <CaretLeft size={42} />
          </button>
          <button
            className="absolute right-[-42px] top-1/3 mt-4 transform -translate-y-1/2"
            onClick={nextSlide}
          >
            <CaretRight size={42} />
          </button>
        </div>
      </div>
    </main>
  );
}
