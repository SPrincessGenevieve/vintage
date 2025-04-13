"use client";

import React, { useState } from "react";
import { MockProfileLevelData } from "@/lib/mock-data";
import Image from "next/image";
import { useUserContext } from "@/app/context/UserContext";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";

export default function LevelGradient() {
  const { level_info } = useUserContext();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const level_name = !level_info || !level_info.name ? "VINTAGE" : level_info.name;

  return (
    <>
      {" "}
      {MockProfileLevelData.filter(
        (item) => item.name === level_name
      ).map((item, index) => (
        <HoverCard>
          <HoverCardTrigger>
            <div
              className="relative w-40 py-4 px-1 rounded-xl flex flex-col items-center justify-center port-card-cont"
              style={{
                background:
                  item.name === level_name
                    ? hoverIndex !== null && hoverIndex !== index
                      ? "linear-gradient(to bottom, #D0D0D0, #D0D0D0)" // Change to grey if hovering over another item
                      : `linear-gradient(to bottom, ${item.hoverFrom}, ${item.hoverTo})` // Default for VINTAGE
                    : hoverIndex === index
                    ? `linear-gradient(to bottom, ${item.hoverFrom}, ${item.hoverTo})` // Hover effect for other items
                    : "linear-gradient(to bottom, #D0D0D0, #D0D0D0)", // Default grey for other items
                transition: "background 0.3s ease", // Smooth transition on hover
              }}
              key={index}
            >
              <p className="text-[10px] font-light text-white mb-1">
                {item.percentage}
              </p>
              <Image
                src={item.level}
                className="w-auto h-32 port-card"
                alt={""}
              />
              <h1 className="text-white text-[12px] text-center font-[perdi] gen-text-xs">
                {item.name}
              </h1>
              <p className="text-[10px] font-light text-white gen-text-xxs">
                {item.price}
              </p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-auto">
            <p className="text-[12px]">{item.name}</p>
            <p className="text-[12px]">{item.percentage}</p>
            <p className="text-[12px]">{item.liters}</p>
            <p className="text-[12px]">{item.price}</p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </>
  );
}
