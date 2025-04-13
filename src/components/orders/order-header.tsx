import React from "react";
import { Badge } from "../ui/badge";
import BagdeLevel from "../bagde-level";

export default function OrderHeader() {
  return (
    <div className="w-[90%]">
      <div className="flex justify-between items-center px-4 py-8">
        <div>
          <h1 className="font-semibold text-[16px] gen-text-sm">
            Your Orders
          </h1>
          {/* <p className="font-light text-[12px] gen-text-xs text-muted-foreground">
            Summary of the order you added to cart.
          </p> */}
        </div>
      </div>
    </div>
  );
}
