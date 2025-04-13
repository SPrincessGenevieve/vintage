"use client";

import React, { useState, useEffect } from "react";
import { MarketplaceInvest, useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import ItemsPagination from "@/components/items-pagination";
import WinesCard from "@/components/marketplace/wines-card";
import WinesCardMarketInvest from "./wines-card-market-invest";
import StarRating from "./star-rating";
import { TrendingUp, Wine } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RareWineCard({ item }: { item: MarketplaceInvest }) {
  const displayValue = (value: string | undefined) => {
    return value === "NA" ? "" : value || "";
  };

  const process_case =
    item.wine_vintage_details === null
      ? 1
      : item.wine_vintage_details.processed_case || 0;

  const market_value =
    item.wine_vintage_details === null
      ? "0"
      : item && item.wine_vintage_details.market_value
      ? item.wine_vintage_details.market_value
      : "0";

  // Check for zero-like values in market_value and fallback to liv_ex_value if needed
  const formattedMarketValue =
    market_value === "0" || market_value === "0.00"
      ? item.wine_vintage_details === null
        ? "0"
        : item.wine_vintage_details.liv_ex_value !== null &&
          item.wine_vintage_details.liv_ex_value !== undefined
        ? item.wine_vintage_details.liv_ex_value.toLocaleString()
        : "Price not available"
      : Math.floor(Number(market_value)).toLocaleString();

  const final_market_place = Number(market_value) / process_case;

  return (
    <Link
      className=" rounded-xl h-auto flex w-full"
      href={item.basket_details === null ? `/dashboard/marketplace/rare/${item.investment_id}` : `/dashboard/marketplace/rare/bundle/${item.investment_id}`}
    >
      <div className="h-auto relative flex flex-col w-full border rounded-xl justify-between">
        {/* Image */}
        <div className="relative h-auto flex flex-col items-center justify-center p-2">
          <div className="bg-violet-300 w-full bottom-0 z-0 absolute"></div>{" "}
          {/* TO BE UPDATED LATER */}
          {item.wine_parent === null ? (
            <Image
              width={400}
              height={400}
              src={item.basket_details.image}
              alt="card"
              className="z-20 w-auto h-[15vh]"
            />
          ) : item.wine_parent.images &&
            Array.isArray(item.wine_parent.images) &&
            item.wine_parent.images.length > 0 ? (
            <Image
              width={400}
              height={400}
              src={item.wine_parent.images[0]}
              alt="card"
              className="z-20 w-auto h-[15vh]"
            />
          ) : (
            <span>
              <Wine></Wine>
            </span>
          )}
        </div>
        {/* Description */}
        <div className="p-2 h-auto flex flex-col">
          <div>
            {/* <div className="w-full">
              <StarRating rating={5} maxRating={5} />
            </div> */}
            <h1 className="text-[12px] font-medium">
              {displayValue(
                item.wine_parent === null
                  ? item.basket_details.name
                  : item.wine_parent.name
              )}
            </h1>
          </div>
          <div className="text-[10px] font-light text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Market Value: </span>
              <span>
                £{item.basket_details === null ? Number(item.wine_vintage_details.market_value).toLocaleString() : Number(item.market_value).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Region: </span>
              <span>
                {displayValue(
                  item.wine_parent === null ? "" : item.wine_parent.fromm
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Case Size: </span>
              <span>{item.case_size || ""}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
