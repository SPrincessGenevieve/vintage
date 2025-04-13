import React from "react";
import { Badge } from "../ui/badge";
import BagdeLevel from "../bagde-level";

export default function CheckoutHeader() {
    return (
        <div className="bg-white">
          <div className="flex justify-between items-center px-4 py-2">
            <div>
              <h1 className="font-semibold text-[16px] gen-text-sm">Check out</h1>
              {/* <p className="font-light text-[12px] gen-text-xs text-muted-foreground">
                Pay the wines with our method
              </p> */}
            </div>
          </div>
        </div>
      );
    }
    