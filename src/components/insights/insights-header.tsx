import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import BagdeLevel from "../bagde-level";

export default function InsightsHeader() {
  return (
    <div className="flex justify-between items-center px-4 py-8 border-b w-[90%]">
      <div className="">
        <h1 className="font-semibold text-[16px]">Insights Page</h1>
        {/* <p className="font-light text-[12px]  text-muted-foreground">
          Get new tailored market and news update.
        </p> */}
      </div>
    </div>
  );
}
