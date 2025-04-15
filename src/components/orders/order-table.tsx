"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertCircle,
  ArrowRight,
  CircleAlert,
  Delete,
  DeleteIcon,
  Minus,
  Plus,
  Trash,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OrderDeleteConfirmation from "./order-delete-confirmation";
import { CalculationType, CartItemsType } from "@/app/context/UserContext";
import { Input } from "../ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import OrderDeleteSingle from "./order-delete-single";
import CheckoutCalculation from "../checkout/checkout-calculation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function OrderTable() {
  const { sessionkey, balance, cartCount, pay_method, setUserDetails } =
    useUserContext();
  const [dataOrders, setDataOrders] = useState<CartItemsType[]>([]);
  const [calculationData, setCalculationData] = useState<CalculationType[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchDataOrder() {
      const authHeader = "Token " + sessionkey;
      try {
        // Make a request to your backend to get the SetupIntent clientSecret using axios
        const response = await axios.get(`${apiUrl}/api/wine/cart-items/`, {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });
        setDataOrders(response.data);
        setUserDetails({
          cartCount: response.data.length,
        });

        // Select all items by default
        const allItemIds = response.data.map((item: CartItemsType) => item.id);
        setSelectedWines(allItemIds); // Set all items as selected by default

        // Set all checkboxes to true by default
        setPhotoRequestChecked(response.data.map(() => false));
        setDeliveryRequestChecked(response.data.map(() => true));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    if (!pay_method) {
      setIsDisabled(true);
      setOpen(true);
      console.log("User has no payment method");
    } else {
      setIsDisabled(false);
      setOpen(false);
      console.log("User has payment method");
    }

    if (sessionkey) {
      fetchDataOrder();
    }
  }, [sessionkey]);

  useEffect(() => {
    setOrderItems(dataOrders);
  }, [dataOrders]); // Syncs `orderItems` with `dataOrders` whenever `dataOrders` changes
  // Syncs `orderItems` with `dataOrders` whenever `dataOrders` changes

  const router = useRouter(); // Using useRouter from next/navigation
  const [orderItems, setOrderItems] = useState<CartItemsType[]>(
    dataOrders ?? []
  );

  const [loading, setLoading] = useState("hidden"); // Loading state added
  const [dialog, setDialog] = useState(false);

  const [selectedWines, setSelectedWines] = useState<number[]>([]);

  const [selectAll, setSelectAll] = useState<boolean>(true);
  const [photoRequestChecked, setPhotoRequestChecked] = useState<boolean[]>(
    dataOrders.map(() => false) // Track the checkbox state for each wine item
  );

  const [hoverStates, setHoverStates] = useState(
    orderItems.map(() => ({
      hoverOpen: false,
      hoverColor: "text-gray-500",
      hoverMsg: "Select your quantity",
      isHidden: "hidden",
    }))
  );

  // Sync hoverStates with orderItems if orderItems changes
  useEffect(() => {
    setHoverStates(
      orderItems.map(() => ({
        hoverOpen: false,
        hoverColor: "text-gray-500",
        hoverMsg: "Select your quantity",
        isHidden: "hidden",
      }))
    );
  }, [orderItems]);

  const [deliveryRequestChecked, setDeliveryRequestChecked] = useState<
    boolean[]
  >(
    dataOrders.map(() => false) // Track the checkbox state for each wine item
  );

  const market_price = dataOrders.map((item) => {
    // Check if stock_wine_vintage or user_investment_wine_vintage exists
    let marketValue: string | null =
      (item.stock_wine_vintage &&
        String(item.stock_wine_vintage.market_value)) ||
      (item.user_investment_wine_vintage &&
        String(item.user_investment_wine_vintage.market_value)) ||
      null;

    // If both stock_wine_vintage and user_investment_wine_vintage are null, use basket.market_value
    if (marketValue === null && item.basket) {
      marketValue = String(item.basket.market_value) || null;
    }

    // Check if the market value is "0" or "0.00" and use liv_ex_value instead for stock_wine_vintage or user_investment_wine_vintage
    if (marketValue === "0" || marketValue === "0.00") {
      marketValue =
        (item.stock_wine_vintage &&
          String(item.stock_wine_vintage.liv_ex_value)) ||
        (item.user_investment_wine_vintage &&
          String(item.user_investment_wine_vintage.liv_ex_value)) ||
        null;
    }

    // Return parsed market value or 0 if unavailable or invalid
    return marketValue ? parseFloat(marketValue) || 0 : 0;
  });

  // const how_many_bottles = orders.quantity

  const authHeader = "Token " + sessionkey; // Basic Authentication header

  // Handle the deletion of selected items
  const handleMultipleDelete = async (selectedItemIds: number[]) => {
    setLoading(""); // Show loading state

    const deletePromises = selectedItemIds.map((itemId) => {
      return axios
        .delete(`${apiUrl}/api/wine/cart-items/${itemId}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        })
        .then((response) => {
          if (response.status === 204) {
            console.log(`Item ${itemId} deleted successfully`);
          }
        })
        .catch((error) => {
          console.error(`Error deleting item ${itemId}:`, error);
        });
    });

    try {
      await Promise.all(deletePromises);
      const response = await axios.get(`${apiUrl}/api/wine/cart-items/`, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      });
      const itemCount = Array.isArray(response.data) ? response.data.length : 0;

      setUserDetails({
        cartCount: itemCount,
      });
      setDataOrders(response.data);
      setDialog(false);
      setLoading("hidden");
    } catch (error) {
      console.error("Error deleting items:", error);
      setLoading("hidden");
      setDialog(false); // Fallback closure
    } finally {
      location.reload();
    }
  };

  const handleSingleDelete = async (itemId: number) => {
    setLoading("");
    try {
      const response = await axios.delete(
        `${apiUrl}/api/wine/cart-items/${itemId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );

      if (response.status === 204) {
        console.log("Item deleted successfully");
        setLoading("hidden");
        // Update the list of items after deletion
        const response = await axios.get(`${apiUrl}/api/wine/cart-items/`, {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });

        const itemCount = Array.isArray(response.data)
          ? response.data.length
          : 0;

        setUserDetails({
          cartCount: itemCount,
        });

        setDataOrders(response.data);
        setOrderItems(orderItems.filter((item) => item.id !== itemId)); // Assuming `id` is the unique identifier
        // window.location.reload();
      } else {
        console.error("Failed to delete some items");
        setLoading("hidden");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setLoading("hidden");
    } finally {
      location.reload();
    }
  };

  const handleCheckout = () => {
    const selectedData = dataOrders
      .map((item, index) => {
        if (selectedWines.includes(item.id)) {
          // Log the item details to debug mapping
          console.log(`Processing item at index ${index}:`, item);

          // Determine the correct wine_vintage and user_investment based on stock_wine_vintage and user_investment_wine_vintage
          const wineVintage =
            item.stock_wine_vintage !== null
              ? item.stock_wine_vintage.id
              : item.user_investment_wine_vintage?.id;

          const userInvestment =
            item.stock_wine_vintage !== null
              ? item.stock_wine_vintage.is_user_investment
              : item.user_investment_wine_vintage?.is_user_investment;

          const investmentId =
            item.user_investment_wine_vintage !== null
              ? item.user_investment_wine_vintage.investment_id
              : null; // Assign null or another fallback value if necessary

          const bottleSize =
            item.basket !== null
              ? ""
              : item.stock_wine_vintage !== null
              ? item.stock_wine_vintage.bottle_size
              : item.user_investment_wine_vintage.bottle_size;

          console.log("BOTTLE SIZE: ", bottleSize);

          return {
            name:
              item.basket === null
                ? item && item.stock_wine_vintage
                  ? item.stock_wine_vintage.name
                  : item?.user_investment_wine_vintage?.name
                : item.basket.name,
            description: item.short_description,
            image: item.basket === null ? item.images[0] : item.basket.image,
            price:
              item.is_special_volumes === true
                ? market_price[index] && dataOrders[index]
                  ? market_price[index] * Number(dataOrders[index].quantity)
                  : "0"
                : item.basket
                ? market_price[index] * 1
                : market_price[index] && dataOrders[index]
                ? (market_price[index] /
                    Number(
                      (dataOrders[index].stock_wine_vintage &&
                        dataOrders[index].stock_wine_vintage.processed_case) ||
                        (dataOrders[index].user_investment_wine_vintage &&
                          dataOrders[index].user_investment_wine_vintage
                            .processed_case) ||
                        1 // Fallback to 1 to prevent division by zero or null
                    )) *
                  (Number(dataOrders[index].quantity) *
                    Number(dataOrders[index].case_size))
                : "0",

            total_price:
              item.is_special_volumes === true
                ? market_price[index] && dataOrders[index]
                  ? market_price[index] * Number(dataOrders[index].quantity) +
                    (photoRequestChecked[index] ? 16.28 : 0)
                  : "0"
                : item.basket
                ? market_price[index] * 1 +
                  (photoRequestChecked[index] ? 16.28 : 0)
                : market_price[index] && dataOrders[index]
                ? (market_price[index] /
                    Number(
                      (dataOrders[index].stock_wine_vintage &&
                        dataOrders[index].stock_wine_vintage.processed_case) ||
                        (dataOrders[index].user_investment_wine_vintage &&
                          dataOrders[index].user_investment_wine_vintage
                            .processed_case) ||
                        1 // Fallback to 1 to prevent division by zero or null
                    )) *
                    (Number(dataOrders[index].quantity) *
                      Number(dataOrders[index].case_size)) +
                  (photoRequestChecked[index] ? 16.28 : 0)
                : "0",
            wine_vintage: wineVintage, // Use the computed wineVintage
            bottle_size: bottleSize,
            cart_id: item.id, // Ensure correct cart_id is used here
            quantity: item.basket ? 1 : item.quantity ?? 1,
            request_photo: photoRequestChecked[index],
            deliveryRequestChecked: deliveryRequestChecked[index],
            user_investment: userInvestment, // Use the computed userInvestment
            investment_id: investmentId, // Use the computed investmentId if available
            total_investment: userInvestment ? market_price[index] : 0,
            case_size: item.case_size,
            is_special_volumes: item.is_special_volumes,
            basket: item.basket,
          };
        }
        return null;
      })
      .filter((item) => item !== null); // Filter out unselected wines

    // Save the selected data to localStorage
    localStorage.setItem("selectedWines", JSON.stringify(selectedData));
    console.log("Selected Wines Data:", selectedData);
    setUserDetails({
      calculation_list: selectedData,
    });
    // Navigate to checkout page
    router.push("/dashboard/orders/checkout");
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedWines([]); // Deselect all
    } else {
      setSelectedWines(dataOrders.map((item) => item.id)); // Select all by storing their ids
    }
    setSelectAll(!selectAll); // Toggle select all state
  };

  const handleSelectWine = (itemId: number) => {
    setSelectedWines((prevSelectedWines) => {
      if (prevSelectedWines.includes(itemId)) {
        return prevSelectedWines.filter((id) => id !== itemId); // Deselect the wine
      } else {
        return [...prevSelectedWines, itemId]; // Select the wine by its id
      }
    });
  };

  const handleIncrease = (index: number) => {
    const currentQuantity = orderItems[index].quantity || 1;
    const newQuantity = currentQuantity + 1;
    updateOrderQuantity(index, newQuantity);
  };

  const handleDecrease = (index: number) => {
    const currentQuantity = orderItems[index].quantity;
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateOrderQuantity(index, newQuantity);
    }
  };

  const handleQuantityChange = (value: number, index: number) => {
    const newQuantity = Math.min(Number(value)); // Ensure value is valid
    updateOrderQuantity(index, newQuantity);
  };

  const updateOrderQuantity = async (index: number, newQuantity: number) => {
    const updatedOrders = [...orderItems];
    updatedOrders[index].quantity = newQuantity;
    setOrderItems(updatedOrders);

    const authHeader = "Token " + sessionkey;
    const data = { quantity: newQuantity };

    try {
      const response = await axios.put(
        `${apiUrl}/api/wine/cart-items/${updatedOrders[index].id}/`,
        data,
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("QUANTITY UPDATED SUCCESSFULLY");
      } else {
        console.log("Nope");
      }
    } catch (error: any) {
      const errorDetails = error.response?.data?.details || "An error occurred";
      const statusCode = error.response?.status;

      if (statusCode === 400) {
        console.log("400 Bad Request details: ", errorDetails);
        updateHoverState(index, {
          hoverColor: "text-red-500",
          hoverMsg: errorDetails,
          isHidden: "", // Unhide the hover content
          hoverOpen: true, // Open the hover card
        });
      }
      if (statusCode === 500) {
        console.log("500 Internal Server Error details: ", errorDetails);
        updateHoverState(index, {
          hoverColor: "text-red-500",
          hoverMsg: errorDetails,
          isHidden: "", // Unhide the hover content
          hoverOpen: true, // Open the hover card
        });
      }
    } finally {
      setTimeout(() => {}, 5000);
    }
  };

  const truncateString = (str: string): string => {
    return str.length > 200 ? `${str.slice(0, 197)}...` : str;
  };

  const handlePhotoRequestChange = (index: number) => {
    const updatedPhotoRequest = [...photoRequestChecked];
    updatedPhotoRequest[index] = !updatedPhotoRequest[index];
    setPhotoRequestChecked(updatedPhotoRequest);
  };

  const handleDeliveryRequestChange = (index: number) => {
    const updatedDeliveryRequest = [...deliveryRequestChecked];
    updatedDeliveryRequest[index] = !deliveryRequestChecked[index];
    setDeliveryRequestChecked(updatedDeliveryRequest);
  };

  const updateHoverState = (
    index: number,
    updates: Partial<(typeof hoverStates)[0]>
  ) => {
    setHoverStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, ...updates } : state
      )
    );
  };

  const total = dataOrders.reduce((total, item, index) => {
    if (selectedWines.includes(item.id)) {
      // Ensure we are calculating for selected wine by `id`
      const processedCase =
        Number(item.stock_wine_vintage?.processed_case) ||
        Number(item.user_investment_wine_vintage?.processed_case) ||
        1; // Default to 1 if both are undefined

      const marketPrice = market_price[index] || 1; // Ensure market_price is not undefined
      const quantity = item.quantity || 1;
      const caseSize = item.case_size || 1; // Default to 1 if undefined

      total +=
        item.is_special_volumes === true
          ? marketPrice * quantity
          : item.basket
          ? marketPrice * 1
          : (marketPrice / processedCase) * (quantity * caseSize);

      if (photoRequestChecked[index]) {
        total += 16.87;
      }
    }
    return total;
  }, 0);

  const formattedTotal = total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="py-2 relative w-full flex ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader className="font-semibold">
            Payment Method Required
          </DialogHeader>
          <p className="text-[14px]">
            You cannot checkout your items without a payment method.
          </p>
          <div className=" w-full flex gap-2 justify-end">
            <Button
              onClick={() => setOpen(false)}
              variant="ghost"
              className="rounded-full border border-gray-300"
            >
              Back
            </Button>
            <Button className="rounded-full">Setup Payment Method</Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="bg-white border-t px-4 fixed z-30 w-[90%] bottom-0 min-h-[90px] h-auto flex justify-between">
        <div className="flex flex-col justify-center">
          <p className="text-[12px]">
            Selected: {selectedWines.filter(Boolean).length} Wines
          </p>
          <p className="text-[12px]">
            Total (Excluding Fees): £{formattedTotal}
          </p>
        </div>
        <div className="gap-4 flex items-center mr-12">
          <div>
            <Link
              href={"/dashboard/marketplace"}
              className="underline text-[12px]"
            >
              Continue Looking
            </Link>
          </div>

          <Button
            disabled={isDisabled}
            onClick={handleCheckout}
            className="rounded-full text-[12px] "
          >
            Check out <ArrowRight></ArrowRight>
          </Button>
        </div>
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%] p-0 pl-5 ">
              <div className="h-full w-full flex items-center justify-start">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
                {selectedWines.some((isSelected) => isSelected) && (
                  <OrderDeleteConfirmation
                    open={dialog}
                    loading={loading}
                    selectedItems={orderItems.filter(
                      (_, index) => selectedWines[index]
                    )} // Filter the selected items
                    onDelete={() => handleMultipleDelete(selectedWines)}
                  >
                    <button className="flex text-gray-400 p-1 px-2 ml-2 rounded-xl w-auto h-auto text-[15px]">
                      <Trash color="red" size={20} className="w-[40px]" />
                      {selectedWines.filter(Boolean).length}
                    </button>
                  </OrderDeleteConfirmation>
                )}
              </div>
            </TableHead>
            {/* <TableHead className="text-[12px] text-center">ID</TableHead> */}
            <TableHead className="text-[12px] text-center">Wine</TableHead>
            <TableHead className="w-[25%] min-w-[300px]"></TableHead>
            <TableHead className="text-[12px] text-center">
              Photo Request
            </TableHead>
            <TableHead className="text-[12px] text-center">Price</TableHead>
            <TableHead className="text-[12px] text-center">Quantity</TableHead>
            <TableHead className="text-[12px] text-center">Total</TableHead>
            <TableHead className="text-[12px] text-center"></TableHead>
          </TableRow>
        </TableHeader>
        {dataOrders.map((item, index) => (
          <TableBody key={index}>
            <TableRow className="h-full">
              <TableCell className="p-0 h-full pl-5">
                <div className="h-full w-full flex items-center  justify-start">
                  <Checkbox
                    // disabled={item.is_available ? false : true}
                    checked={selectedWines.includes(item.id)} // Check if the item is selected
                    onCheckedChange={() => handleSelectWine(item.id)} // Pass item id to handle selection
                  />
                </div>
              </TableCell>
              {/* <TableCell className="h-full">
                <div className="h-full flex items-center justify-center">
                  <p className="text-[12px] text-center">{item.id}</p>
                </div>
              </TableCell> */}
              <TableCell className="p-0 h-full pl-5">
                <div className="relative py-4 w-full h-full min-h-[250px] min-w-[100px] flex items-center justify-center bg-white hover:bg-[#FAFAFA]">
                  <div
                    className={`${
                      item.is_available ? "hidden" : "absolute w-full h-full"
                    }`}
                  >
                    <div className="w-full h-full bg-[#d6d6d665] absolute"></div>
                    <div
                      className={` w-full flex gap-2 items-center absolute px-2 ${
                        item.is_available ? "hidden" : ""
                      }`}
                    >
                      <p>
                        <AlertCircle size={12} color="orange"></AlertCircle>{" "}
                      </p>
                      <p className="text-[11px] text-[orange]">
                        You can still request to buy this wine
                      </p>
                    </div>
                    <div className="w-full flex  justify-center items-center h-7 bg-[#000000] absolute bottom-0">
                      <p className="w-full text-center text-white text-[12px]">
                        Unavailable
                      </p>
                    </div>
                  </div>
                  <Image
                    width={300}
                    height={300}
                    src={
                      item.basket === null ? item.images[0] : item.basket.image
                    }
                    alt={`${
                      item.basket === null ? item.images[0] : item.basket.image
                    }`}
                    className="w-auto h-[7vw] min-h-[100px]"
                  ></Image>
                </div>
              </TableCell>
              <TableCell className="h-full flex">
                <div className="h-full">
                  <p className="text-[12px]">
                    {item.basket
                      ? item.basket.name
                      : item.stock_wine_vintage?.name ||
                        item.user_investment_wine_vintage?.name}{" "}
                    {item.basket === null &&
                      `(${item.is_special_volumes ? 1 : item.case_size}x${
                        item.stock_wine_vintage?.bottle_size === "0750"
                          ? "75cl"
                          : item.stock_wine_vintage?.bottle_size === "1500"
                          ? "150cl"
                          : item.stock_wine_vintage?.bottle_size === "3000"
                          ? "300cl"
                          : item.stock_wine_vintage?.bottle_size === "6000"
                          ? "600cl"
                          : ""
                      })`}
                  </p>
                  <p className="text-[10px] text-gray-400 font-light">
                    {truncateString(item.short_description)}
                  </p>
                </div>
              </TableCell>

              {/* <TableCell>
                <div className="w-full h-full flex items-center justify-center gap-2">
                  <Checkbox
                    checked={deliveryRequestChecked[index]}
                    onCheckedChange={() => handleDeliveryRequestChange(index)}
                  ></Checkbox>{" "}
                  <p className="text-[12px]">Yes</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" className="p-0">
                          <CircleAlert></CircleAlert>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="w-[50%] min-w-[100px]">
                        <p className="text-[12px] font-bold">Note</p>
                        <p className="text-[10px]">
                          Checking this means we will deliver your wine using
                          the current address you have.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell> */}
              <TableCell className="h-full">
                <div className="w-full h-full flex items-center justify-center gap-2">
                  <Checkbox
                    checked={photoRequestChecked[index]}
                    onCheckedChange={() => handlePhotoRequestChange(index)}
                  />
                  <p className="text-[12px]">£16.87</p>
                </div>
              </TableCell>
              <TableCell className="h-full">
                <div className="w-full h-full flex items-center justify-center gap-2">
                  <p className="text-[12px]">
                    £
                    {Number(
                      item.is_user_investment === true
                        ? market_price[index] * dataOrders[index].quantity +
                            (photoRequestChecked[index] ? 16.87 : 0)
                        : item.basket
                        ? market_price[index] +
                          (photoRequestChecked[index] ? 16.87 : 0)
                        : market_price[index] && dataOrders[index]
                        ? (market_price[index] /
                            Number(
                              (dataOrders[index].stock_wine_vintage &&
                                dataOrders[index].stock_wine_vintage
                                  .processed_case) ||
                                (dataOrders[index]
                                  .user_investment_wine_vintage &&
                                  dataOrders[index].user_investment_wine_vintage
                                    .processed_case) ||
                                1 // Fallback to 1 to prevent division by zero or null
                            )) *
                          (dataOrders[index].quantity *
                            dataOrders[index].case_size)
                        : 0
                    ).toLocaleString("en-GB", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-full h-full flex items-center justify-center">
                  {hoverStates[index] && (
                    <HoverCard
                      open={hoverStates[index].hoverOpen}
                      onOpenChange={() =>
                        updateHoverState(index, {
                          hoverOpen: !hoverStates[index].hoverOpen,
                        })
                      }
                    >
                      <HoverCardTrigger>
                        <div className="border rounded-2xl flex gap-2 items-center justify-center w-auto">
                          <Button
                            disabled={item.basket !== null ? true : false}
                            variant="ghost"
                            onClick={() => handleDecrease(index)}
                          >
                            <Minus size={20} className="text-red-700" />
                          </Button>

                          <Input
                            type="number"
                            disabled={item.basket !== null ? true : false}
                            value={
                              orderItems[index]?.basket !== null
                                ? 1
                                : orderItems[index]?.quantity ?? 1
                            }
                            onChange={(e) =>
                              handleQuantityChange(
                                Number(e.target.value),
                                index
                              )
                            }
                            className="border-none p-2 outline-none text-[12px] text-center w-16"
                            min="1"
                            onFocus={(e) => e.target.select()}
                          />
                          <Button
                            disabled={item.basket !== null ? true : false}
                            variant="ghost"
                            onClick={() => handleIncrease(index)}
                          >
                            <Plus size={20} className="text-green-700" />
                          </Button>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className={hoverStates[index].isHidden}>
                        <p
                          className={`${hoverStates[index].hoverColor} text-[12px]`}
                        >
                          {hoverStates[index].hoverMsg}
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                </div>
              </TableCell>

              <TableCell className="h-full">
                <div className="w-full h-full flex items-center justify-center gap-2">
                  <p className="text-[12px]">
                    £
                    {Number(
                      (item.is_user_investment === true
                        ? market_price[index] * dataOrders[index].quantity +
                          (photoRequestChecked[index] ? 16.87 : 0)
                        : item.basket
                        ? market_price[index] +
                          (photoRequestChecked[index] ? 16.87 : 0)
                        : market_price[index] && dataOrders[index]
                        ? (market_price[index] /
                            Number(
                              (dataOrders[index].stock_wine_vintage &&
                                dataOrders[index].stock_wine_vintage
                                  .processed_case) ||
                                (dataOrders[index]
                                  .user_investment_wine_vintage &&
                                  dataOrders[index].user_investment_wine_vintage
                                    .processed_case) ||
                                1 // Fallback to 1 to prevent division by zero or null
                            )) *
                            (dataOrders[index].quantity *
                              dataOrders[index].case_size) +
                          (photoRequestChecked[index] ? 16.87 : 0)
                        : 0
                      ).toFixed(2)
                    ).toLocaleString("en-GB", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </TableCell>
              <TableCell className="relative p-0 m-0">
                <TableCell className="relative p-0 m-0">
                  <div>
                    {/* Render item row */}
                    <OrderDeleteSingle
                      loading={loading}
                      closeDialog={dialog}
                      onDelete={() => handleSingleDelete(item.id)}
                    >
                      <Button
                        variant="ghost"
                        className="h-full min-h-[200px] w-[10px] bg-red-500 hover:bg-red-700 rounded-none"
                      >
                        <Trash color="white"></Trash>
                      </Button>
                    </OrderDeleteSingle>
                  </div>
                </TableCell>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
}
