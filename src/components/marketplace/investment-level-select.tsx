"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "../ui/input";
import { Select, SelectTrigger } from "../ui/select";
import PortfolioLevel from "../portfolio/portfolio-level";
import { ChevronDown } from "lucide-react";
import { useUserContext } from "@/app/context/UserContext";

export default function InvestmentLevelSelect() {
  const { level_info } = useUserContext();
  return (
    <div className="flex w-full h-30%  items-center">
      <Collapsible className="w-full">
        <CollapsibleTrigger className="flex items-center justify-center w-full h-full">
          <div className="bg-white border-b pl-5 border-gray-200 w-full h-full flex items-center justify-between p-1">
            <p className="text-[#595B5C]">Investment Level</p>
            <ChevronDown></ChevronDown>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <PortfolioLevel></PortfolioLevel>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
