import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import coverPage from "@/images/terms/terms_1.png";
import backPage from "@/images/terms/terms_5.png";
import page1 from "@/images/terms/page 1.png";
import page2 from "@/images/terms/page 2.png";
import page3 from "@/images/terms/page 3.png";
import page4 from "@/images/terms/page 4.png";
import page5 from "@/images/terms/page 5.png";
import page6 from "@/images/terms/page 6.png";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LinkApi = {
  value: "marketplace",
  href: `${apiUrl}/api/wine`,
};

export const WineFilters = [
  {
    name: "Vint-ex",
    filter: "vintex",
  },
  {
    name: "Region",
    filter: "region",
  },
  {
    name: "Trending Wines",
    filter: "rare",
  },
  {
    name: "Special Volume",
    filter: "special-volume",
  },
  {
    name: "Special Bundles",
    filter: "special-bundles",
  },
  {
    name: "Assortment Cases",
    filter: "assortments",
  },
];

export const WineFilters2 = [
  {
    name: "Rare",
    filter: "rare",
  },
  {
    name: "Special Bundles",
    filter: "special-bundles",
  },
  {
    name: "Assortments",
    filter: "assortments",
  },
];

export const RelationshipSelect = [
  {
    name: "Son",
    value: "son",
  },
  {
    name: "Daughter",
    value: "daughter",
  },
  {
    name: "Niece",
    value: "niece",
  },
  {
    name: "Nephew",
    value: "nephew",
  },
  {
    name: "Other",
    value: "other",
  },
];

export const BookingData = [
  {
    berth: "12-14",
    port: "Felixstowe",
    county: "Suffolk",
    postcode: "IP11 3SY",
    date: "October 19, 2024",
  },
  {
    berth: "5-6",
    port: "Harwich",
    county: "Essex",
    postcode: "CO12 4AA",
    date: "November 19, 2024",
  },
  {
    berth: "7-8",
    port: "Southampton",
    county: "Hampshire",
    postcode: "SO14 3HG",
    date: "December 19, 2024",
  },
];

export const termsPages = [
  {
    image: coverPage,
  },
  {
    image: page1,
  },
  {
    image: page2,
  },
  {
    image: page3,
  },
  {
    image: page4,
  },
  {
    image: page6,
  },
  {
    image: page6,
  },
  {
    image: backPage,
  },
  
]