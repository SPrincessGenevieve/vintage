"use client";

import React, { useState, useEffect } from "react";
import {
  BigBottlesListType,
  MarketplaceInvest,
  SpecialBundlesList,
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

export default function SpecialBundlesCard({
  item,
}: {
  item: SpecialBundlesList;
}) {
  return (
    <Link
      className=" rounded-xl h-auto flex w-full"
      href={`/dashboard/marketplace/special-bundles/${item.id}`}
    >
      <div className="h-auto relative flex flex-col w-full border rounded-xl justify-between">
        <div className="relative h-auto flex flex-col items-center justify-center p-2">
          <div className="flex w-full h-full items-center justify-center p-10">
            <Image
              width={400}
              height={400}
              src={item.image}
              alt="card"
              className="z-20 w-auto h-[15vh]"
            />
          </div>
        </div>
        <div className="p-2 h-auto flex flex-col">
          <div className="flex flex-col gap-2">
            <h1 className="text-[12px] font-medium">{item.name}</h1>
            <div className="text-[10px] font-light text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Max Price: </span>
                <span>£{item.market_value.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Region: </span>
                <span>{item.fromm}</span>
              </div>
              {/* <div className="flex items-center justify-between">
                <span>Vintage: </span>
                <span>{item.vintage || ""}</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
