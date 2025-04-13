import { Badge } from "../ui/badge";
import React from "react";
import './../../app/globals.css'
import BagdeLevel from "../bagde-level";

export default function IndicesHeader() {
  return (
    <div className="bg-white w-[90%]">
      <div className="flex justify-between items-center px-4 py-2">
        <div>
          <h1 className="font-semibold text-[16px] gen-text-sm">
          Indicies
          </h1>
          {/* <p className="font-light text-[12px] gen-text-xs text-muted-foreground">
          View the other broker indicies and our custom indicies.
          </p> */}
        </div>
      </div>
    </div>
  );
}
