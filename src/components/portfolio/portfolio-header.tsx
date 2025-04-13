import React from "react";
import { Badge } from "../ui/badge";
import BagdeLevel from "../bagde-level";

export default function PortfolioHeader() {
  return (
    <div className="bg-white w-[90%]">
      <div className="flex justify-between items-center pl-4 pr-6 py-2">
        <div>
          <h1 className="font-semibold text-[16px]">Portfolio & Status</h1>
          {/* <p className="font-light text-[12px] text-muted-foreground">
            Your wine collection.
          </p> */}
        </div>
      </div>
    </div>
  );
}
