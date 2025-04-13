import { Button } from "../ui/button";
import { useEffect } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
  MenubarCheckboxItem,
} from "@/components/ui/menubar";

export default function FilterButton({
  name,
  filterQuery,
  activeFilter,
  setActiveFilter,
  regionsData, // Pass regionsData if it's required for the Region Menubar
  selectedRegion,
  setSelectedRegion, // Add this prop to handle region selection
}: {
  name: string;
  filterQuery: string;
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
  regionsData?: string[]; // Optional for Region filter
  selectedRegion?: string; // Optional selected region for the Region filter
  setSelectedRegion?: (region: string) => void; // Handler to update selected region
}) {
  const handleFilter = () => {
    setActiveFilter(activeFilter === filterQuery ? null : filterQuery);
  };

  const handleSelectRegion = (region: string) => {
    if (setSelectedRegion) setSelectedRegion(region);
  };

  const handleDeselectRegionTab = () => {
    if (setSelectedRegion) setSelectedRegion("");
    setActiveFilter("vintex")
  };

  // Conditionally render the Menubar if the filter is "Region"
  if (name === "Region" && regionsData && selectedRegion !== undefined) {
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="p-0">
            <Button
              variant={selectedRegion === "" ? "outline" : "default"}
              size="sm"
              className="text-[10px] rounded-full"
              onClick={handleFilter} // Clicking on Region will activate/deactivate the filter
            >
              {name}
            </Button>
          </MenubarTrigger>
          <MenubarContent>
            {regionsData.map((region_item) => (
              <MenubarCheckboxItem
                className="text-[12px]"
                key={region_item}
                checked={selectedRegion === region_item}
                onClick={() => handleSelectRegion(region_item)}
              >
                {region_item}
              </MenubarCheckboxItem>
            ))}
            <MenubarCheckboxItem
              className="text-[12px]"
              onClick={handleDeselectRegionTab}
            >
              Clear Filter
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  }

  // Default Button for other filters
  return (
    <Button
      variant={activeFilter === filterQuery ? "default" : "outline"}
      onClick={handleFilter}
      size="sm"
      className="text-[10px] rounded-full"
    >
      {name}
    </Button>
  );
}
