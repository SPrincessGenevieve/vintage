"use client";
import { Suspense, useState, useEffect } from "react";
import withAuth from "@/app/withAuth";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import ItemsPagination from "@/components/items-pagination";
import WinesCard from "@/components/marketplace/wines-card";
import { WineFilters } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { LinkApi } from "@/lib/utils";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import RareWineCard from "@/components/marketplace/rare-wine-card";
import SpecialVolumeCard from "@/components/marketplace/special-volume-card";

function SpecialVolumePage() {
  const router = useRouter();
  const { setUserDetails, big_bottle_list, sessionkey } = useUserContext();
  const [pageList, setPageList] = useState(1);
  const [currentPageSpecialVol, setCurrentPageSpecialVol] = useState(() => {
    return Number(localStorage.getItem("currentPageSpecialVol")) || 1;
  });
  const [searchTerm, setSearchTerm] = useState(""); // Updated here: just store the search term
  const [activeFilter, setActiveFilter] = useState<string | null>("vintex");
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [visible, setVisible] = useState(false);
  const authHeader = "Token " + sessionkey;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const basket = await axios.get(`${LinkApi.href}/special-volumes/`, {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });
        console.log("ASSORTMENT DATA: ", basket.data.results);
        setUserDetails({
          big_bottle_list: basket.data.results,
        });
        setPageList(basket.data.total_pages);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [sessionkey, searchName]);

  const handleNext = async (index: number) => {
    setCurrentPageSpecialVol(index);
    setVisible(true);

    try {
      const response = await axios.get(`${LinkApi.href}/rare/?page=${index}`, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      });

      setPageList(response.data.total_pages);
      setUserDetails({ wine_marketplace: response.data.results });
    } catch (error) {
      setVisible(false);

      console.error("Error fetching user data:", error);
    } finally {
      setVisible(false);
    }
  };

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
      Region: "/dashboard/marketplace/region",
      "Trending Wines": "/dashboard/marketplace/rare",
      "Special Volume": "/dashboard/marketplace/special-volume",
      "Special Bundles": "/dashboard/marketplace/special-bundles",
      "Assortment Cases": "/dashboard/marketplace/assortments",
    };
    if (routes[name]) router.push(routes[name]);
  };


  return (
    <Suspense>
      <Loading visible={visible}></Loading>
      <div className="relative flex h-full w-full flex-col px-4">
        <div className="gap-2 my-2 border rounded-xl flex flex-col justify-between  md:flex-row items-center p-2">
          <div className="ml-auto flex flex-wrap items-start gap-2 w-full">
            <div className="ml-auto flex flex-wrap items-center gap-2 w-full">
              {WineFilters.map((item, index) => (
                <Button
                  variant={item.name === "Special Volume" ? "default" : "ghost"}
                  className={`text-[10px] rounded-full ${
                    item.name === "Special Volume" ? "" : "border"
                  }`}
                  onClick={() => handleClickedFilter(item.name)}
                >
                  {item.name}
                </Button>
              ))}
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
        <>
          <div className="h-[75%] w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto">
            {big_bottle_list.map((item) => (
              <div className="flex h-full max-h-[37vh] bg-white" key={item.id}>
                <SpecialVolumeCard item={item} />
              </div>
            ))}
          </div>
        </>
        <div className="flex gap-2 absolute w-full bottom-1">
          <ItemsPagination
            totalPages={pageList}
            currentPage={currentPageSpecialVol}
            onPageChange={handleNext}
          />
        </div>
      </div>
    </Suspense>
  );
}

export default withAuth(SpecialVolumePage);
