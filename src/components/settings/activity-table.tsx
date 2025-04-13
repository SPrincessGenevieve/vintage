import React, { useState, useEffect, Suspense } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tag,
  Banknote,
  Gift,
  Truck,
  Calendar,
  User2,
  UserX,
  UserPlus,
  Camera,
  Landmark,
  HandCoins,
} from "lucide-react";
import { useUserContext } from "@/app/context/UserContext";
import SearchBar from "../search-bar";
import ActivityFilter from "./activity-filter"; // Ensure that this component exists

type Filters = {
  action: {
    sell: boolean;
    delivery: boolean;
    gift: boolean;
    buy: boolean;
  };
  status: {
    pending: boolean;
    complete: boolean;
    confirmed: boolean;
    idle: boolean;
  };
  search: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ActivityTable() {
  const { first_name, last_name, request, sessionkey } = useUserContext(); // Assuming you're getting first_name and last_name from context
  const [requests, setRequests] = useState<any[]>([]); // All requests fetched from the server
  const [filteredRequests, setFilteredRequests] = useState<any[]>([]); // Filtered requests based on filters
  const [deliverMessage, setDeliverMessage] = useState("");
  const [status, setStatus] = useState("");
  const [filters, setFilters] = useState<Filters>({
    action: {
      sell: false,
      delivery: false,
      gift: false,
      buy: false,
    },
    status: {
      pending: false,
      complete: false,
      confirmed: false,
      idle: false,
    },
    search: "",
  });

  console.log("STATUS : ", request);

  useEffect(() => {
    const fetchRequests = async () => {
      // Use first_name and last_name from the context

      const filteredRequests = request.filter(
        (request: any) =>
          !["complimentary", "Liv ex error", "withdraw_amount", "cancelled_withdrawal"].includes(request.action)
      );

      // Sort requests by time_stamp in descending order (latest first)
      filteredRequests.sort(
        (a, b) =>
          new Date(b.time_stamp).getTime() - new Date(a.time_stamp).getTime()
      );

      setRequests(filteredRequests);
      setFilteredRequests(filteredRequests); // Initialize with all requests
    };

    fetchRequests();
  }, [sessionkey, first_name, last_name]);

  useEffect(() => {
    // Filtering logic based on selected filters
    const filteredData = requests.filter((item) => {
      const actionMatch =
        Object.keys(filters.action).some(
          (key) =>
            filters.action[key as keyof Filters["action"]] &&
            item.action.toLowerCase().includes(key)
        ) || Object.values(filters.action).every((value) => !value);

      const statusMatch =
        Object.keys(filters.status).some(
          (key) =>
            filters.status[key as keyof Filters["status"]] &&
            item.status.toLowerCase().includes(key)
        ) || Object.values(filters.status).every((value) => !value);

      const searchMatch =
        (item.requester &&
          item.requester
            .toLowerCase()
            .includes(filters.search?.toLowerCase() || "")) ||
        (item.action &&
          item.action
            .toLowerCase()
            .includes(filters.search?.toLowerCase() || ""));

      return actionMatch && statusMatch && searchMatch;
    });

    setFilteredRequests(filteredData);
  }, [filters, requests]);

  const handleFilterChange = (filterType: keyof Filters, key: string) => {
    setFilters((prevFilters) => {
      const currentFilter = prevFilters[filterType] as {
        [key: string]: boolean;
      };
      return {
        ...prevFilters,
        [filterType]: {
          ...currentFilter,
          [key]: !currentFilter[key], // Access the key directly
        },
      };
    });
  };

  const handleSearchChange = (searchTerm: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: searchTerm,
    }));
  };

  useEffect(() => {
    if (requests.length > 0) {
      // Iterate through the requests array
      requests.forEach((request) => {
        if (request.address_one === null || request.address_one === "") {
        } else {
          setDeliverMessage(
            `Delivery of ${request.wine_name} Wine to ${first_name} ${last_name}`
          );
          setDeliverMessage(
            `Delivery of ${request.wine_name} Wine to ${first_name} ${last_name} to ${request.address_one}`
          );
        }
      });
    }
  }, [requests, first_name, last_name]);

  const handleSearch = () => {};

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className=" gen-text-sm">Activity log</h1>
          <span className="text-muted-foreground text-sm gen-text-sm">
            Track all your activities
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchBar
              onClick={handleSearch}
              value={filters.search}
              onSearchChange={handleSearchChange}
            />
          </Suspense>
          <ActivityFilter
            onFilterChange={handleFilterChange}
            filters={filters}
          />{" "}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" gen-text-sm">Activity</TableHead>
            <TableHead className=" gen-text-sm">Vintage</TableHead>
            <TableHead className="text-left gen-text-sm">Status</TableHead>
            <TableHead className="text-center gen-text-sm">Case Size</TableHead>
            <TableHead className="text-center gen-text-sm">Quantity</TableHead>
            <TableHead className="text-left gen-text-sm">
              Purchased Price
            </TableHead>
            <TableHead className="text-left gen-text-sm">Time Stamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRequests.map((item, index) => {
            const firstWord = item.action.split(" ")[0];
            return (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2 gen-text-sm">
                  {(() => {
                    switch (firstWord) {
                      case "sell":
                        return (
                          <>
                            <Tag
                              strokeWidth={1.3}
                              className="text-red-400 gen-text-sm"
                            />
                            <p className="capitalize">{item.action}</p>
                            <p>the {item.wine_name || item.basket_name} Wine</p>
                          </>
                        );
                      case "buy":
                        return (
                          <>
                            <Banknote
                              strokeWidth={1.3}
                              className="text-green-400 gen-text-sm"
                            />
                            <p className="capitalize">Bought</p>
                            <p> the {item.wine_name || item.basket_name} Wine</p>
                          </>
                        );
                      case "gift":
                        return (
                          <>
                            <Gift
                              strokeWidth={1.3}
                              className="text-orange-400 gen-text-sm"
                            />
                            <p className="capitalize">{item.action}</p>
                            <p>
                              the {item.wine_name} Wine to {first_name}{" "}
                              {last_name}
                            </p>
                          </>
                        );
                      case "delivery":
                        return (
                          <>
                            <Truck
                              strokeWidth={1.3}
                              className="text-primary gen-text-sm"
                            />
                            <p>{deliverMessage}</p>
                          </>
                        );
                      case "event":
                        return (
                          <>
                            <Calendar
                              strokeWidth={1.3}
                              className="gen-text-sm"
                            />
                            <p className="capitalize">{item.action} </p>
                            <p>
                              on {new Date(item.event_time).toLocaleString()}{" "}
                            </p>
                          </>
                        );
                      case "add_sub_account":
                        return (
                          <>
                            <UserPlus
                              strokeWidth={1.3}
                              color="#2ad32a"
                              className="gen-text-sm"
                            />
                            <p className="">
                              Added {item.wine_name} wine to sub-account
                            </p>
                          </>
                        );

                      case "removed_sub_account":
                        return (
                          <>
                            <UserX
                              strokeWidth={1.3}
                              color="red"
                              className="gen-text-sm"
                            />
                            <p className="">
                              Removed {item.wine_name} wine to sub-account
                            </p>
                          </>
                        );
                      case "photo":
                        return (
                          <>
                            <Camera
                              strokeWidth={1.3}
                              color="gray"
                              className="gen-text-sm"
                            />
                            <p className="">
                              Photo request for wine {item.wine_name} wine
                            </p>
                          </>
                        );
                      case "cancelled_withdrawal":
                        return (
                          <>
                            <Landmark
                              strokeWidth={1.3}
                              color="red"
                              className="gen-text-sm"
                            />
                            <p className="">Cancelled Withdrawal</p>
                          </>
                        );
                      // case "withdraw_amount":
                      //   return (
                      //     <>
                      //       <HandCoins
                      //         strokeWidth={1.3}
                      //         color="blue"
                      //         className="gen-text-sm"
                      //       />
                      //       <p className="">Withdraw Amount</p>
                      //     </>
                      //   );
                      default:
                        return null;
                    }
                  })()}
                </TableCell>
                <TableCell className="text-left gen-text-sm capitalize">
                  {item.vintage}
                </TableCell>
                <TableCell className="text-left gen-text-sm capitalize">
                  {item.status === "idle" ? "Pending" : item.status}
                </TableCell>
                <TableCell className="text-center gen-text-sm capitalize">
                  {item.case_size}
                </TableCell>
                <TableCell className="text-center gen-text-sm capitalize">
                  {item.quantity}
                </TableCell>
                <TableCell className="text-left gen-text-sm capitalize">
                  £{Math.round(item.puchase_price).toLocaleString()}
                </TableCell>

                <TableCell className="text-left gen-text-sm">
                  {new Date(item.time_stamp).toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
