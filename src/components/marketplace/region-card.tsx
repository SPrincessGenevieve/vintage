"use client";

import { Suspense, useState, useEffect } from "react";
import withAuth from "@/app/withAuth";
import {
  MarketplaceInvest,
  useUserContext,
  WineType,
} from "@/app/context/UserContext";
import axios from "axios";
import ItemsPagination from "@/components/items-pagination";
import WinesCard from "@/components/marketplace/wines-card";
import LoadingDot from "@/images/loaddot";
import RareWineCard from "@/components/marketplace/rare-wine-card";
import ProgressBar from "@/components/progress-bar";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const WinesPerPage = 8;

function RegionCard({
  activeFilter,
  wine_marketplace,
  searchTerm,
  regionFilter,
  selected_region,
  loadingTrue,
  loadingFalse,
}: {
  activeFilter: string | null;
  wine_marketplace: WineType[];
  searchTerm: string;
  regionFilter: string | null;
  selected_region: string;
  loadingTrue: () => void;
  loadingFalse: () => void;
}) {
  const { sessionkey, setUserDetails } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Set default current page to 1
  const [wines, setWines] = useState<(WineType | MarketplaceInvest)[]>([]);
  const [winesRare, setWinesRare] = useState<(WineType | MarketplaceInvest)[]>(
    []
  );

  const [totalPage, setTotalPage] = useState(1);
  const [totalPageCount, setPageCount] = useState(1);
  const [filteredWines, setFilteredWines] = useState<WineType[]>([]);
  const [filteredWinesRare, setFilteredWinesRare] = useState<
    MarketplaceInvest[]
  >([]);
  const authHeader = "Token " + sessionkey;

  useEffect(() => {
    // Fetch data from the API
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/wine/vint-ex/?fromm=${selected_region}`,
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );

        const results: WineType[] = response.data.results;
        const totalPages = response.data.total_pages;
        setTotalPage(totalPages);

        // Manually fetch data for all pages if totalPages > 1
        let allResults = [...results];

        if (totalPages > 1) {
          const pageRequests = [];
          for (let page = 2; page <= totalPages; page++) {
            const pageRequest = axios.get(
              `${apiUrl}/api/wine/vint-ex/?fromm=${selected_region}&page=${page}`,
              {
                headers: {
                  Authorization: authHeader,
                  "Content-Type": "application/json",
                },
              }
            );

            pageRequests.push(pageRequest);
          }

          // Wait for all the page requests to finish
          const pageResponses = await Promise.all(pageRequests);
          pageResponses.forEach((res) => {
            allResults = [...allResults, ...res.data.results];
          });
        }

        // Filter the results manually to include only wines from region
        const filtered = allResults.filter(
          (wine: WineType) => wine.fromm === selected_region
        );

        // Set the filtered results
        setWines(allResults);
        setFilteredWines(filtered);

        setPageCount(Math.ceil(filtered.length / WinesPerPage));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchUserDataRare = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/wine/user-for-sale?fromm=${selected_region}`,
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );

        const results: MarketplaceInvest[] = response.data.results;
        const totalPages = response.data.total_pages;
        setTotalPage(totalPages);

        // Manually fetch data for all pages if totalPages > 1
        let allResults = [...results];

        if (totalPages > 1) {
          const pageRequests = [];
          for (let page = 2; page <= totalPages; page++) {
            const pageRequest = axios.get(
              `${apiUrl}/api/wine/user-for-sale?fromm=${selected_region}&page=${page}`,
              {
                headers: {
                  Authorization: authHeader,
                  "Content-Type": "application/json",
                },
              }
            );

            pageRequests.push(pageRequest);
          }

          // Wait for all the page requests to finish
          const pageResponses = await Promise.all(pageRequests);
          pageResponses.forEach((res) => {
            allResults = [...allResults, ...res.data.results];
          });
        }

        // Filter the results manually to include only wines from region
        const filtered = allResults.filter(
          (winesRare: MarketplaceInvest) =>
            winesRare.wine_parent.fromm === selected_region
        );

        // Set the filtered results
        setWinesRare(allResults);
        setFilteredWinesRare(filtered);

        setPageCount(Math.ceil(filtered.length / WinesPerPage));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchUserData();
  }, [sessionkey, selected_region]);

  console.log("TOTAL PAGE COUNT: ", totalPageCount);

  // Get the current wines for pagination
  const indexOfLastWine = currentPage * WinesPerPage;
  const indexOfFirstWine = indexOfLastWine - WinesPerPage;
  const currentWines = filteredWines.slice(indexOfFirstWine, indexOfLastWine);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage); // Update the current page
  };

  return (
    <Suspense>
      {loading ? (
        <div className="absolute w-full h-full flex flex-col items-center justify-center">
          <div className="w-[100px] h-[100px]">
            <LoadingDot />
          </div>

          <p className="mt-2 text-[14px]">Loading Data...</p>

          <div className="w-1/2 flex items-center justify-center">
            <ProgressBar duration={5000}></ProgressBar>
          </div>
        </div>
      ) : (
        <div className="relative flex h-full w-full flex-col">
          {activeFilter === "vintex" && (
            <>
              <div className="h-[85%] mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto">
                {currentWines.length > 0 ? (
                  currentWines
                    .filter((wine) =>
                      wine.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((wine) => (
                      <div
                        className="flex h-full max-h-[37vh] bg-white"
                        key={wine.id}
                      >
                        <WinesCard item={wine} />
                      </div>
                    ))
                ) : (
                  <p>No wines from {selected_region} found.</p>
                )}
              </div>

              <div className="flex gap-2 absolute w-full bottom-1">
                <ItemsPagination
                  totalPages={totalPageCount}
                  currentPage={currentPage}
                  onPageChange={handlePageChange} // Pass handlePageChange to handle pagination
                />
              </div>
            </>
          )}

          {activeFilter === "rare" &&
            wines.map((wine) => {
              if ("investment_id" in wine) {
                return <RareWineCard item={wine} key={wine.investment_id} />;
              }
              return null;
            })}
        </div>
      )}
    </Suspense>
  );
}

export default RegionCard;
