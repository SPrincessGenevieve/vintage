"use client";
import withAuth from "@/app/withAuth";
import PortfolioLevel from "@/components/portfolio/portfolio-level";
import { Suspense, useEffect, useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import ItemsPagination from "@/components/items-pagination";
import LoadingDot from "@/images/loaddot";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import PortfolioTable from "@/components/portfolio/portfolio-table";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Portfolio() {
  const { is_old_user, setUserDetails } = useUserContext();
  const [pageList, setPageList] = useState(1);
  const [currentPagePort, setCurrentPagePort] = useState(() => {
    return Number(localStorage.getItem("currentPagePort")) || 1;
  });
  const [isPortfolioEmpty, setIsPortfolioEmpty] = useState(false); // State to track if portfolio is empty
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");

  const [message, setMessage] = useState("Loading data..."); // State for the message

  // Function to handle search input
  const handleSearch = async (searchTerm: string) => {};
  const handleNext = async (index: number) => {};
  const handleNextSearch = async (index: number) => {};

  const handlePagination = (index: number) => {};
  return (
    <Suspense>
      {loading ? (
        <>
          <div className="w-full h-full max-h-[800px] flex flex-col justify-center items-center">
            <div className="absolute w-full h-full flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <LoadingDot></LoadingDot>
              </div>
              <p>{loading ? message : ""}</p>{" "}
              {/* Display loading or the message */}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-full">
            {is_old_user === false && (
              <div className={`h-auto`}>
                <PortfolioLevel></PortfolioLevel>
              </div>
            )}

            <div className="flex h-auto w-full flex-col">
              <div className="flex items-center justify-between gap-2 w-full">
                <div className="flex flex-col ml-2">
                  <p className="text-[14px] m-0 p-0">My Wines</p>
                </div>
                <div className="flex p-2">
                  <div className="relative flex items-center justify-between gap-2">
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
                      <Search className=" w-4 search-icon rounded-full" />
                    </Button>
                  </div>
                </div>
              </div>
              {isPortfolioEmpty ? (
                <div className="flex justify-center items-center w-full h-full">
                  <p className="text-lg text-gray-600">No wine investments</p>
                </div>
              ) : (
                <PortfolioTable />
              )}
            </div>
            <div className="flex gap-2 h-[50px] w-full">
              <ItemsPagination
                totalPages={pageList}
                currentPage={currentPagePort}
                onPageChange={(index) => handlePagination(index)}
              ></ItemsPagination>
            </div>
          </div>
        </>
      )}
    </Suspense>
  );
}

export default withAuth(Portfolio);
