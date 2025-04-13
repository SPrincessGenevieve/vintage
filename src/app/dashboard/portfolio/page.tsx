"use client";
import withAuth from "@/app/withAuth";
import PortfolioHeader from "@/components/portfolio/portfolio-header";
import PortfolioLevel from "@/components/portfolio/portfolio-level";
import PortfolioMyWines from "@/components/portfolio/portfolio-my-wines";
import { Suspense, useEffect, useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import ItemsPagination from "@/components/items-pagination";
import LoadingDot from "@/images/loaddot";
import ProgressBar from "@/components/progress-bar";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, ListFilter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Portfolio() {
  const {
    is_old_user,
    email,
    password1,
    sessionkey,
    portfolio,
    user_now_id,
    quantity_to_transfer,
    wine_parent,
    userData,
    gain_loss_filter,
    setUserDetails,
  } = useUserContext();
  const [isVisible, setIsVisible] = useState("");
  const [pageList, setPageList] = useState(1);
  const [currentPagePort, setCurrentPagePort] = useState(() => {
    return Number(localStorage.getItem("currentPagePort")) || 1;
  });
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [isPortfolioEmpty, setIsPortfolioEmpty] = useState(false); // State to track if portfolio is empty
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");

  const [message, setMessage] = useState("Loading data..."); // State for the message

  // Load the saved page from localStorage on mount
  console.log("USER ID NOW: ", user_now_id);
  const authHeader = "Token " + sessionkey;

  

  console.log("FILTER: ", gain_loss_filter);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading before making the API call

      // Determine the appropriate API endpoint based on the conditions
      const url =
        user_now_id === 0
          ? gain_loss_filter
            ? `${apiUrl}/api/wine/investment/?ordering=loss&page=${currentPagePort}`
            : `${apiUrl}/api/wine/investment/?ordering=gain&page=${currentPagePort}`
          : gain_loss_filter
          ? `${apiUrl}/api/wine/investment/?sub_acc_id=${user_now_id}&ordering=loss`
          : `${apiUrl}/api/wine/investment/?sub_acc_id=${user_now_id}&ordering=gain`;

      try {
        // Fetch user data from the API
        const response = await axios.get(url, {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });

        // Set the user details and pagination
        setUserDetails({
          portfolio: response.data.results,
          wine_parent: response.data.results.wine_parent,
        });
        setPageList(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loading after the API call finishes
      }
    };

    fetchUserData();
  }, [sessionkey, gain_loss_filter, searchName]); // Depend on sessionkey, gain_loss_filter, and searchName

  // Function to handle search input
  const handleSearch = async (searchTerm: string) => {
    // Only filter when this function is called (when the button is clicked)
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/wine/investment/?name=${searchTerm}`,
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );

      setPageList(response.data.total_pages);
      setUserDetails({
        portfolio: response.data.results,
        wine_parent: response.data.results.wine_parent,
      });
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleNext = async (index: number) => {
    console.log("CLICKED: ", index);
    setUserDetails({ portfolio: [] });
    setCurrentPagePort(index);
    localStorage.setItem("currentPagePort", String(index)); // Store in localStorage

    try {
      const response = await axios.get(
        gain_loss_filter
          ? `${apiUrl}/api/wine/investment/?ordering=loss&page=${index}`
          : `${apiUrl}/api/wine/investment/?ordering=gain&page=${index}`,
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.results);
      setPageList(response.data.total_pages);
      setUserDetails({
        portfolio: response.data.results,
        wine_parent: response.data.results.wine_parent,
      });
    } catch {}
  };

  const handleNextSearch = async (index: number) => {
    setCurrentPagePort(index);
    localStorage.setItem("currentPagePort", index.toString());

    try {
      const response = await axios.get(
        `${apiUrl}/api/wine/investment/?name=${searchName}&page=${index}`,
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );

      setPageList(response.data.total_pages);
      setUserDetails({
        portfolio: response.data.results,
        wine_parent: response.data.results.wine_parent,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handlePagination = (index: number) => {
    if (searchName.trim() !== "") {
      // If search term is present, call the API for search results
      handleNextSearch(index);
    } else {
      // Otherwise, call the default API
      handleNext(index);
    }
  };
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
                  {/* <Button variant="ghost" className="rounded-full p-2">
                <ListFilter className="asc-icon" strokeWidth={1.5}></ListFilter>
              </Button>
              <Button variant="ghost" className="rounded-full p-2">
                <ArrowDownUp
                  className="asc-icon"
                  strokeWidth={1.5}
                ></ArrowDownUp>
              </Button> */}
                </div>
              </div>
              {isPortfolioEmpty ? (
                <div className="flex justify-center items-center w-full h-full">
                  <p className="text-lg text-gray-600">No wine investments</p>
                </div>
              ) : (
                <PortfolioMyWines
                  portfolio={portfolio}
                  wine_parent={wine_parent}
                ></PortfolioMyWines>
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
