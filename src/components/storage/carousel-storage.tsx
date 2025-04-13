'use client'

import * as React from "react";
import img1 from "./../../images/circle_1.png";
import img2 from "./../../images/circle_2.png";
import img3 from "./../../images/circle_3.png";
import img4 from "./../../images/circle_4.png";
import Image from "next/image";
import { Button } from "../ui/button";

interface CarouselStorageProps {
  defaultIndex?: number; // Add a prop to control the starting image
}

export function CarouselStorage({ defaultIndex = 0 }: CarouselStorageProps) { // Set defaultIndex to 0 if no value is provided
  const [currentIndex, setCurrentIndex] = React.useState(defaultIndex); // Initialize with the prop value
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const imgLib = [
    {
      image: img1,
    },
    {
      image: img2,
    },
    {
      image: img3,
    },
    {
      image: img4,
    },
    
  ];

  const handleButtonClick = (index: number) => {
    if (index !== currentIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 500); // Adjust this duration to match the CSS transition
    }
  };

  return (
    <div className="flex w-full h-full relative">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div
          className={`w-full h-[80%] flex items-center justify-center relative transition-opacity duration-50 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            className="w-[350px] object-cover"
            src={imgLib[currentIndex].image}
            alt=""
          />
        </div>
        <div className="flex w-full gap-3 items-center justify-center p-2">
          {imgLib.map((_, index: number) => (
            <Button
              key={index}
              className={`w-3 h-3 p-0 m-0 rounded-full ${
                currentIndex === index ? "bg-[#104144]" : "bg-gray-500"
              }`}
              onClick={() => handleButtonClick(index)}
            >
              <div></div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
