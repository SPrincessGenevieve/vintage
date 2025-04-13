import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";
import BagdeLevel from "../bagde-level";
import { ArrowLeft } from "lucide-react";

interface RareHeaderProps {
  name: string;
}

const SpecialBundleChildHeader: React.FC<RareHeaderProps> = ({ name }) => {
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
export default SpecialBundleChildHeader;
