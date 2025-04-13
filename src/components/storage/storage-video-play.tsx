"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { CirclePause, CirclePlay } from "lucide-react";
import play from "./../../images/play.png";
import Image from "next/image";

export default function StorageVideoPlay() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Track whether the video is playing
  const [indexSet, setIndexSet] = useState("");

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && isPlaying) {
      videoElement.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    } else if (videoElement && !isPlaying) {
      videoElement.pause(); // Pause the video when state is false
    }
  }, [isPlaying]); // Re-run effect when play state changes

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying); // Toggle play state
  };

  useEffect(() => {
    const video = videoRef.current;

    const handlePlay = () => {
      console.log("Video is playing");
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log("Video is paused");
      setIsPlaying(false);
    };

    if (video) {
      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
    }

    return () => {
      if (video) {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying === true) {
      setIndexSet("hidden");
    } else {
      setIndexSet("");
    }
  }, [isPlaying]);

  return (
    <div className="w-full h-full flex relative  bg-[black]">
      <div className="w-full">
        <video
          ref={videoRef}
          className="top-0 left-0 w-full h-[100%] object-cover "
          style={{ objectPosition: "50% 50%" }} // Adjust vertical position here
          src="https://vintage-associates-django-development.s3.eu-west-2.amazonaws.com/media/va-storage-small.mp4"
          autoPlay
          loop
          controls
        />
      </div>
      {/* Play/Pause button */}
      <Button
        onClick={togglePlayPause}
        className={`absolute bg-[red] w-full h-full p-0  bg-transparent hover:bg-transparent ${indexSet}`}
      >
        <div className="flex relative w-full h-full  ">
          <div className="w-full h-full flex items-center justify-center  ">
            {isPlaying ? (
              <div className="bg-transparent w-full h-full  "></div>
            ) : (
              <div className="flex relative w-full h-full items-center justify-center bg-[url('/storage-bg.png')] bg-no-repeat bg-cover bg-center  ">
                <Image
                  className="w-auto h-[30%] absolute"
                  src={play}
                  alt={""}
                ></Image>
              </div>
            )}
          </div>
        </div>
      </Button>
    </div>
  );
}
