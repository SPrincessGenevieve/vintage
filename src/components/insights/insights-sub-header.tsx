import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import BagdeLevel from "../bagde-level";

interface insightTitlePage {
  insightPage: string;
}

export default function InsightsSubHeader({ insightPage }: insightTitlePage) {
  return (
    <div className="flex justify-between items-center px-4 py-7 border-b w-full">
      <div>
        <h1 className="font-semibold text-[16px]">
          <Link className="text-blue-500" href={"/dashboard/insights/"}>
            Insights{" "}
          </Link>
          / {insightPage}
        </h1>
        {/* <p className="font-light text-[12px]  text-muted-foreground">
          Get new tailored market and news update.
        </p> */}
      </div>
    </div>
  );
}
