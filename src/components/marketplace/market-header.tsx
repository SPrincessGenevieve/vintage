import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import BagdeLevel from "../bagde-level";
import { useUserContext } from "@/app/context/UserContext";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
// Define the props type
interface MarketHeaderProps {
  name: string;
}



const MarketHeader: React.FC<MarketHeaderProps> = ({ name }) => {
  const navigate = useRouter()

  const handleBack = () =>{
    navigate.back();
  }
  return (
    <div className="flex border-b justify-between items-center p-4 bg-white">
      <div>
        <h1 className="font-medium text-[16px] gen-text-sm flex gap-4">
          <Link href={""} onClick={handleBack}>
            <ArrowLeft></ArrowLeft>
          </Link>
          {name}
        </h1>
      </div>
      <BagdeLevel></BagdeLevel>
    </div>
  );
};

export default MarketHeader;
