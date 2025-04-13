"use client";

import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { ImageSliderProps } from "@/lib/types";
import Image from "next/image";
import { ArrowLeft, ArrowRight, HeartIcon } from "lucide-react";
import "@/app/image-gallery.css";
import share from "./../images/share.png";

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoPlay = false,
  slideInterval = 3000,
  showThumbnails = true,
  showFullscreenButton = false,
  showPlayButton = false,
}) => {
  const [imageSize, setImageSize] = useState(40); // Default image size
  const [imageSizeMini, setImageSizeMini] = useState(25); // Default thumbnail size

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight <= 810) {
        setImageSize(20);
        setImageSizeMini(15);
      } else if (window.innerHeight <= 890) {
        setImageSize(25);
        setImageSizeMini(17);
      } else {
        setImageSize(35);
        setImageSizeMini(25); // Adjust for larger screen sizes
      }
    };

    // Set image size on initial load
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ImageGallery
      items={images}
      autoPlay={autoPlay}
      slideInterval={slideInterval}
      showThumbnails={showThumbnails}
      showFullscreenButton={showFullscreenButton}
      showPlayButton={showPlayButton}
      // Custom right navigation
      renderRightNav={(onClick, disabled) => (
        <button
          type="button"
          className="image-gallery-icon image-gallery-right-nav"
          disabled={disabled}
          onClick={onClick}
          aria-label="Next Slide"
          style={{ filter: "none" }}
        >
          <ArrowRight className="text-primary" />
        </button>
      )}
      // Custom left navigation
      renderLeftNav={(onClick, disabled) => (
        <button
          type="button"
          className="image-gallery-icon image-gallery-left-nav"
          disabled={disabled}
          onClick={onClick}
          aria-label="Previous Slide"
          style={{ filter: "none" }}
        >
          <ArrowLeft className="text-primary" />
        </button>
      )}
      // Custom main image rendering
      renderItem={(item) => (
        <div className="flex items-center justify-center border rounded-lg p-4 inner-wine h-auto relative">
          <div className="flex flex-col absolute right-0 top-0 p-5 pr-10">
            <HeartIcon
              fill="red"
              height={20}
              width={20}
              strokeWidth={0}
            ></HeartIcon>
            <Image src={share} height={20} width={20} alt=""></Image>
          </div>
          <Image
            src={item.original}
            alt="wine-img"
            width={imageSize}
            height={imageSize}
            className="main-wine h-auto w-[4vw]"
          />
        </div>
      )}
      // Custom thumbnails rendering
      renderThumbInner={(item) => (
        <div className="flex items-center justify-center border rounded-lg p-2 inner-sub-wine">
          <Image
            src={item.original}
            alt="wine-img"
            className="sub-wine"
            width={imageSizeMini}
            height={imageSizeMini}
          />
        </div>
      )}
    />
  );
};

export default ImageSlider;
