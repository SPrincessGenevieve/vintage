import React from "react";
import { Button } from "../ui/button";
import { Workflow } from "lucide-react";

export default function PortfolioBuilderHeader() {
  return (
    <div className="bg-white px-4 mr-2 py-2  w-[90%]">
      <div className="flex justify-between">
        <div>
          <h1 className="font-semibold text-[16px]">Marketplace</h1>
          {/* <p className="font-light text-[12px] text-muted-foreground">
            Browse all wines that we have.
          </p> */}

          <Button className="bg-[#5856D6] text-white rounded-full flex items-center justify-center py-1.5 text-[12px] gap-2">
            <div className="flex gap-2">
              <Workflow size={15} />
              Portfolio builder
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
