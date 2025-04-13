import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import BagdeLevel from "../bagde-level";
import { useUserContext } from "@/app/context/UserContext";
import { ArrowLeft } from "lucide-react";
// Define the props type
interface MarketHeaderProps {
  name: string;
  region: string;
}

const MarketHeaderRegion: React.FC<MarketHeaderProps> = ({ name, region }) => {
  return (
    <div className="flex border-b justify-between items-center p-4 bg-white">
      <div>
        <h1 className="font-medium text-[16px] gen-text-sm flex gap-4">
          <Link href={"/dashboard/marketplace/"}>
            <ArrowLeft></ArrowLeft>
          </Link>{" "}
          {name}
        </h1>
      </div>
      <BagdeLevel></BagdeLevel>
    </div>
  );
};

export default MarketHeaderRegion;
