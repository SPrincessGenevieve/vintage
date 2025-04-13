import React from "react";
import { Badge } from "../ui/badge";
import BagdeLevel from "../bagde-level";
export default function StorageHeader() {
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center px-4 py-8">
        <div>
          <h1 className="font-semibold text-[16px] gen-text-sm">Storage</h1>
          {/* <p className="font-light text-[12px]  text-muted-foreground">
            Visit our warehouse to see it in action.
          </p> */}
        </div>
      </div>
    </div>
  );
}
