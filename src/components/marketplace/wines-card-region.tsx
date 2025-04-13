import Image from "next/image";
import type { WineCardT } from "@/lib/types";
import StarRating from "./star-rating";
import { TrendingUp, Wine } from "lucide-react";
import Link from "next/link";
import "./../../app/globals.css";
import { VintageWineType, WineType } from "@/app/context/UserContext";
import { useUserContext } from "@/app/context/UserContext";

export default function WinesCardRegion({ item, region }: { item: WineType, region: string }) {

  const { wine_image, wine_vintages } = useUserContext();
  // Find the wine image that matches the wine value from item
  const matchingWineImage = wine_image.find((image) => image.wine === item.id);

  // If a match is found, use the matching image for the src in Image
  const imageSrc = matchingWineImage
    ? matchingWineImage.image
    : "/default-image.jpg"; // Fallback to a default image if no match is found

  const displayValue = (value: string | undefined) => {
    return value === "NA" ? "" : value || "";
  };

  const maximum_price = item.maximum_price || 0;

  // Convert to an integer and format the number with commas
  const formattedMaxPrice = Math.floor(maximum_price).toLocaleString();

  return (
    <Link
      className=" rounded-xl h-auto flex w-full"
      href={`/dashboard/marketplace/region/${item.id}/${region}`}
    >
      <div className=" relative flex flex-col w-full border rounded-xl">
        {/* Image */}
        <div className="relative h-auto flex flex-col items-center justify-center p-2">
          <div className="bg-violet-300 w-full bottom-0 z-0 absolute"></div>{" "}
          {/* TO BE UPDATED LATER */}
          {item.wine_images &&
          Array.isArray(item.wine_images) &&
          item.wine_images.length > 0 ? (
            <Image
              width={400}
              height={400}
              src={item.wine_images[0]}
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
        <div className="p-2 h-full flex flex-col justify-between">
          {/* <div className="w-full">
            <StarRating rating={5} maxRating={5} />
          </div> */}
          <h1 className="text-[12px] font-medium">{displayValue(item.name)}</h1>
          <div className="text-[10px] font-light text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Max Price: </span>
              <span>£{formattedMaxPrice}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Region: </span>
              <span>{displayValue(item.fromm)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Oldest Vintage: </span>
              <span>{item.oldest_vintage || ""}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
