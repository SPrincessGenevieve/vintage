import Image from "next/image";
import type { WineCardT } from "@/lib/types";
import StarRating from "./star-rating";
import { TrendingUp, Wine } from "lucide-react";
import Link from "next/link";
import "./../../app/globals.css";
import {
  MarketplaceInvest,
  VintageWineType,
  WineType,
} from "@/app/context/UserContext";
import { useUserContext } from "@/app/context/UserContext";

export default function WinesCardMarketInvest({
  item,
}: {
  item: MarketplaceInvest;
}) {
  const { wine_image, marketplace_invest } = useUserContext();
  // Find the wine image that matches the wine value from item
  const matchingWineImage = wine_image.find(
    (image) => image.wine === item.investment_id
  );

  // If a match is found, use the matching image for the src in Image
  const imageSrc = matchingWineImage
    ? matchingWineImage.image
    : "/default-image.jpg"; // Fallback to a default image if no match is found

  const displayValue = (value: string | undefined) => {
    return value === "NA" ? "" : value || "";
  };

  const market_value =
    item && item.wine_vintage_details.market_value
      ? item.wine_vintage_details.market_value
      : "0";

  // Check for zero-like values in market_value and fallback to liv_ex_value if needed
  const formattedMarketValue =
    market_value === "0" || market_value === "0.00"
      ? item.wine_vintage_details.liv_ex_value !== null &&
        item.wine_vintage_details.liv_ex_value !== undefined
        ? item.wine_vintage_details.liv_ex_value.toLocaleString()
        : "Price not available"
      : Math.floor(Number(market_value)).toLocaleString();
  
  
      
  return (
    <Link
      className=" rounded-xl h-auto flex w-full"
      href={`/dashboard/marketplace/rare/${item.investment_id}`}
    >
      <div className="h-auto relative flex flex-col w-full border rounded-xl justify-between">
        {/* Image */}
        <div className="relative h-auto flex flex-col items-center justify-center p-2">
          <div className="bg-violet-300 w-full bottom-0 z-0 absolute"></div>{" "}
          {/* TO BE UPDATED LATER */}
          {item.wine_parent.images &&
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
              {displayValue(item.wine_parent.name)}
            </h1>
          </div>
          <div className="text-[10px] font-light text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Market Value: </span>
              <span>£{formattedMarketValue}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Region: </span>
              <span>{displayValue(item.wine_parent.fromm)}</span>
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
