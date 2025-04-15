"use client";

import { Check } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { MockProfileLevelData } from "@/lib/mock-data";
import "./../../app/globals.css";
import { useUserContext } from "@/app/context/UserContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export default function PortfolioLevel() {
  const { level_info, sessionkey, setUserDetails } = useUserContext();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const level_name =
    !level_info || !level_info.name ? "VINTAGE" : level_info.name;

  // Get the current level's index from the MockProfileLevelData
  const currentLevelIndex = MockProfileLevelData.findIndex(
    (item) => item.name === level_name
  );

  return (
    <div>
      <div className="p-2 px-4 mt-2 flex items-center justify-center h-auto bg-white rounded-2xl flex-wrap card-group">
        {MockProfileLevelData.map((item, index) => {
          // Determine whether the current item or previous items should be colored
          const isColored = index <= currentLevelIndex;

          return (
            <HoverCard key={index}>
              <HoverCardTrigger>
                <div className="flex justify-between items-center card-main flex-wrap">
                  <div
                    className="relative flex flex-col items-center h-full p-0 my-2 card-cont"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <Check
                      size={20}
                      color="white"
                      className={`bg-green-500 rounded-full p-1 absolute mt-[-10px] ${
                        isColored ? "" : "hidden" // Show check for all colored levels
                      }`}
                    />

                    <div
                      className="w-40 py-4 px-1 rounded-xl flex flex-col items-center justify-center"
                      style={{
                        background: isColored
                          ? hoverIndex !== null && hoverIndex !== index
                            ? `linear-gradient(to bottom, #D0D0D0, #D0D0D0)` // Grey when hovering over a different item
                            : `linear-gradient(to bottom, ${item.hoverFrom}, ${item.hoverTo})` // Colored
                          : "linear-gradient(to bottom, #D0D0D0, #D0D0D0)", // Default grey
                        transition: "background 0.3s ease",
                      }}
                    >
                      <p className="text-[10px] font-light text-white mb-1">
                        {item.percentage}
                      </p>
                      <Image
                        src={item.level}
                        className="w-auto h-32"
                        alt={item.name}
                      />
                      <h1 className="text-white text-[12px] text-center font-[perdi] gen-text-xs">
                        {item.name}
                      </h1>
                      <p className="text-[10px] font-light text-white gen-text-xxs">
                        {item.price}
                      </p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center line-connect">
                    <p
                      className={`absolute mt-[-25px] text-[10px] ${
                        item.check === "none" ? "hidden" : ""
                      }`}
                    ></p>
                    <div
                      className={`h-0.5 w-32 bg-[#D0D0D0] ${
                        item.display === "none" ? "hidden" : ""
                      }`}
                    ></div>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto">
                <p className="text-[14px] font-semibold">{item.name}</p>
                <p className="text-[12px] text-gray-500">{item.percentage}</p>
                <p className="text-[12px] text-gray-500">{item.liters}</p>
                <p className="text-[12px] text-gray-500">{item.price}</p>
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>
    </div>
  );
}
