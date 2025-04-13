"use client";

import React, { useState, useEffect } from "react";
import {
  BigBottlesListType,
  MarketplaceInvest,
  useUserContext,
  VintageWineType,
} from "@/app/context/UserContext";
import axios from "axios";
import ItemsPagination from "@/components/items-pagination";
import WinesCard from "@/components/marketplace/wines-card";
import WinesCardMarketInvest from "./wines-card-market-invest";
import StarRating from "./star-rating";
import { TrendingUp, Wine } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SpecialVolumeCard({
  item,
}: {
  item: BigBottlesListType;
}) {
  const displayValue = (value: string | undefined) => {
    return value === "NA" ? "" : value || "";
  };

  const bottle = item.bottle_size;
  const [bottle_label, setBottleLabel] = useState("");


  const bottle_1 = "1500";
  const bottle_2 = "3000";
  const bottle_3 = "6000";
  // Define bottle options outside of useEffect to avoid recreating them every time
  const bottleOptions1500 = "1x150cl";
  const bottleOptions3000 = "1x300cl";
  const bottleOptions6000 = "1x600cl";

  // Set initial bottle select state
  useEffect(() => {
    if (!bottle) {
      return;
    }

    // Check conditions and update bottle_select accordingly
    if (
      bottle.includes(bottle_1) &&
      bottle.includes(bottle_2) &&
      bottle.includes(bottle_3)
    ) {
      // Combine both options when both bottle_1 and bottle_2 are available
      setBottleLabel(
        `${bottleOptions1500}, ${bottleOptions3000}, ${bottleOptions6000}`
      );
    } else if (bottle.includes(bottle_1)) {
      setBottleLabel(bottleOptions1500);
    } else if (bottle.includes(bottle_2)) {
      setBottleLabel(bottleOptions3000);
    } else if (bottle.includes(bottle_3)) {
      setBottleLabel(bottleOptions6000);
    } else {
    }
  }, [bottle]); // Make sure 'bottle' is a dependency

  return (
    <Link
      className=" rounded-xl h-auto flex w-full"
      href={`/dashboard/marketplace/special-volume/${item.id}`}
    >
      <div className="h-auto relative flex flex-col w-full border rounded-xl justify-between">
        <div className="relative h-auto flex flex-col items-center justify-center p-2">
          <div className="flex w-full h-full items-center justify-center p-10">
            <Image
              width={400}
              height={400}
              src={item.wine_images[0]}
              alt="card"
              className="z-20 w-auto h-[15vh]"
            />
          </div>
        </div>
        <div className="p-2 h-auto flex flex-col">
          <div>
            {/* <div className="w-full">
              <StarRating rating={5} maxRating={5} />
            </div> */}
            <h1 className="text-[12px] font-medium">{item.name}</h1>
          </div>
          <div className="text-[10px] font-light text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Price: </span>
              <span>£{item.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Bottle Size: </span>
              <span>{bottle_label}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Vintage: </span>
              <span>{item.vintage || ""}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
