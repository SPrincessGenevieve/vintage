"use client";
import { Button } from "@/components/ui/button";
import { WineFilters } from "@/lib/utils";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import { LinkApi } from "@/lib/utils";
import { FilterIcon, Search } from "lucide-react";
import WinesCardRegion from "@/components/marketplace/wines-card-region";
import ItemsPagination from "@/components/items-pagination";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
  MenubarCheckboxItem,
} from "@/components/ui/menubar";

export default function RegionPage() {
  const router = useRouter();

  const { setUserDetails, wine_marketplace, sessionkey } = useUserContext();

  const authHeader = "Token " + sessionkey;

  const [visible, setVisible] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [pageList, setPageList] = useState(1);
  const [currentPageRegion, setCurrentPageRegion] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState(""); // Updated here: just store the search term
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("Bordeaux");
  const regionFilters = [
    "Bordeaux",
    "Burgundy",
    "Champagne",
    "Italy ",
    "California",
  ];

  // Use useEffect to initialize client-side values
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPage = localStorage.getItem("currentPageRegion");
      const storedRegion = localStorage.getItem("selectedRegion");
      if (storedPage) setCurrentPageRegion(Number(storedPage));
      if (storedRegion) setSelectedRegion(storedRegion);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // https://va.gonearby.app/api/wine/vint-ex/?page=1&region=Italy
        const responseMarketPlace = await axios.get(
          `${
            selectedRegion.trim() === "Italy"
              ? `${
                  LinkApi.href
                }/vint-ex/?page=${currentPageRegion}&region=${selectedRegion.trim()}`
              : `${
                  LinkApi.href
                }/vint-ex/?region=${selectedRegion.trim()}&page=${currentPageRegion}`
          }`,
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );
        setUserDetails({
          wine_marketplace: responseMarketPlace.data.results,
        });
        setPageList(responseMarketPlace.data.total_pages);
        console.log("TOTAL PAGES: ", responseMarketPlace.data.total_pages);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [sessionkey, searchName, selectedRegion]);

  const handleSearch = async (searchTerm: string) => {
    // Only filter when this function is called (when the button is clicked)
    setVisible(true);
    try {
      const response = await axios.get(
        `${LinkApi.href}/vint-ex/?name=${searchTerm}`,
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );

      setPageList(response.data.total_pages);
      setUserDetails({ wine_marketplace: response.data.results });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setVisible(false);
    } finally {
      setVisible(false);
    }
  };

  const handleClickedFilter = (name: string) => {
    setVisible(true);

    const routes: { [key: string]: string } = {
      "Vint-ex": "/dashboard/marketplace",
      "Trending Wines": "/dashboard/marketplace/rare",
      "Special Volume": "/dashboard/marketplace/special-volume",
      "Special Bundles": "/dashboard/marketplace/special-bundles",
      "Assortment Cases": "/dashboard/marketplace/assortments",
    };
    if (routes[name]) router.push(routes[name]);
  };

  const handleNextRegion = async (index: number) => {
    setVisible(true);
    setCurrentPageRegion(index);
    if (typeof window !== "undefined") {
      localStorage.setItem("currentPageRegion", String(index));
    }

    try {
      // API call when region is selected /api/wine/vint-ex/?page=${index}&region=${selectedRegion}
      const response = await axios.get(
        `${LinkApi.href}/vint-ex/?page=${index}&region=${selectedRegion}`,
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );

      setPageList(response.data.total_pages);
      setUserDetails({ wine_marketplace: response.data.results });
    } catch (error) {
      console.error("Error fetching user data by region:", error);
      setVisible(true);
    } finally {
      setVisible(false);
    }
  };

  const handleRegionFilter = (filter: string) => {
    setSelectedFilter(filter);
    setSelectedRegion(filter);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedRegion", filter);
      localStorage.setItem("currentPageRegion", "1"); // Reset to first page when changing region
    }
    setCurrentPageRegion(1); // Reset to first page when changing region
  };

  return (
    <Suspense>
      <Loading visible={visible}></Loading>
      <div className="relative flex h-full w-full flex-col px-4">
        <div className="gap-2 my-2 border rounded-xl flex flex-col justify-between  md:flex-row items-center p-2">
          <div className="ml-auto flex flex-wrap items-start gap-2 w-full">
            <div className="ml-auto flex flex-wrap items-center gap-2 w-full">
              {WineFilters.map((item, index) =>
                item.filter === "region" ? (
                  <>
                    <Menubar>
                      <MenubarMenu>
                        <MenubarTrigger className="p-0 text-[10px] rounded-full bg-[red]">
                          <Button
                            variant={
                              item.name === "Region" ? "default" : "ghost"
                            }
                            size="sm"
                            className="text-[10px] rounded-full p-0 w-[150px] flex items-center justify-center"
                          >
                            <Input
                              value={String(selectedRegion)}
                              placeholder="Filter by Region"
                              className="text-[12px] text-center bg-transparent border-none"
                            ></Input>
                          </Button>
                        </MenubarTrigger>
                        <MenubarContent>
                          {regionFilters.map((region_item) => (
                            <MenubarCheckboxItem
                              className="text-[12px]"
                              key={region_item}
                              checked={selectedRegion === region_item}
                              onClick={() => handleRegionFilter(region_item)}
                            >
                              {region_item}
                            </MenubarCheckboxItem>
                          ))}
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </>
                ) : (
                  <>
                    <Button
                      variant={item.name === "Region" ? "default" : "ghost"}
                      className={`text-[10px] rounded-full ${
                        item.name === "Region" ? "" : "border"
                      }`}
                      onClick={() => handleClickedFilter(item.name)}
                    >
                      {item.name}
                    </Button>
                  </>
                )
              )}
            </div>
          </div>
          <div className="relative flex items-center gap-2">
            <Input
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              type="search"
              placeholder="Search..."
              className="w-full min-w-[300px] h-8 rounded-full bg-background pl-8 text-[10px] search-input"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchName);
                }
              }}
            />
            <Button
              onClick={() => handleSearch(searchName)}
              className="h-auto rounded-full"
            >
              <Search className=" w-4 search-icon" />
            </Button>
          </div>
        </div>
        {/* <div className="w-full flex items-center justify-end pr-2">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="p-0">
                <Button
                  variant={"ghost"}
                  size="sm"
                  className="text-[10px] rounded-full p-0"
                >
                  <Input
                    value={String(selectedRegion)}
                    placeholder="Filter by Region"
                    className="text-[12px]"
                  ></Input>
                  <FilterIcon></FilterIcon>
                </Button>
              </MenubarTrigger>
              <MenubarContent>
                {regionFilters.map((region_item) => (
                  <MenubarCheckboxItem
                    className="text-[12px]"
                    key={region_item}
                    checked={selectedRegion === region_item}
                    onClick={() => handleRegionFilter(region_item)}
                  >
                    {region_item}
                  </MenubarCheckboxItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div> */}
        <>
          <div className="h-[75%] w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto">
            {wine_marketplace
              .filter(
                (item) =>
                  item.name?.toLowerCase().includes(searchTerm.toLowerCase()) // Optional chaining
              )
              .filter((item) => !regionFilter || item.fromm === regionFilter)
              .map((item) => (
                <div
                  className="flex h-full max-h-[37vh] bg-white"
                  key={item.id}
                >
                  <WinesCardRegion region={selectedRegion} item={item} />
                </div>
              ))}
          </div>
        </>

        <div className="flex gap-2 absolute w-full bottom-1">
          <ItemsPagination
            totalPages={pageList}
            currentPage={currentPageRegion}
            onPageChange={(index) => handleNextRegion(index)}
          />
        </div>
      </div>
    </Suspense>
  );
}
