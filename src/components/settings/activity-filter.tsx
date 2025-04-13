import React from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";

// Define the valid keys for action and status filters
type FilterType = "sell" | "delivery" | "gift" | "buy" ;
type StatusType = "pending" | "complete" | "confirmed" | "idle";

interface Filters {
  action: { [key in FilterType]: boolean };
  status: { [key in StatusType]: boolean };
}

interface ActivityFilterProps {
  onFilterChange: (filterType: keyof Filters, key: string) => void;
  filters: Filters;
}

export default function ActivityFilter({
  onFilterChange,
  filters,
}: ActivityFilterProps) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="border-none p-0 m-0 shadow-none">
          <Button
            variant="ghost"
            size="icon"
            className="p-0 border-none shadow-none"
          >
            <SlidersHorizontal strokeWidth={1.3} />
          </Button>
        </MenubarTrigger>
        <MenubarContent>
          <div className="p-2">
            <p className="text-[14px]">Action Filter</p>
          </div>
          <MenubarSeparator />
          {[
            "sell",
            "delivery",
            "gift",
            "buy",
            "add_sub_account",
            "removed_sub_account",
            "photo request",
          ].map((action) => (
            <MenubarCheckboxItem
              key={action}
              checked={filters.action[action as FilterType]} // Type assertion here
              onCheckedChange={() => onFilterChange("action", action)}
            >
              <p className="capitalize">
                {action === "add_sub_account"
                  ? "Added Sub-account"
                  : action === "removed_sub_account"
                  ? "Removed Sub-account"
                  : action === "photo request"
                  ? "Photo Request"
                  : action}
              </p>
            </MenubarCheckboxItem>
          ))}
          <MenubarSeparator />
          <div className="p-2">
            <p className="text-[14px]">Status Filter</p>
          </div>
          <MenubarSeparator />
          {["pending", "complete", "confirmed", "idle"].map((status) => (
            <MenubarCheckboxItem
              key={status}
              checked={filters.status[status as StatusType]} // Type assertion here
              onCheckedChange={() => onFilterChange("status", status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </MenubarCheckboxItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
