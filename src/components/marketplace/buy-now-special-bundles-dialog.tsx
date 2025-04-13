"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CircleAlert } from "lucide-react";
import CustomToast from "../custom-toast";
import { useEffect, useState } from "react";
import {
  CartItemsType,
  MarketplaceInvest,
  SpecialBundleDetails,
  useUserContext,
} from "@/app/context/UserContext";
import axios from "axios";
import SpinnerIcon from "@/images/Spinner";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function BuyNowSpecialBundlesDialog({
  market_value,
  lwin11,
  investment_id,
  case_size,
  quantity,
  number_of_cases,
  isDisabled,
  color,
  item,
  message,
  triggerBtn,
  cancelBtn,
}: {
  market_value: string;
  lwin11: string;
  color: string;
  message: string;
  case_size: number;
  investment_id: number;
  number_of_cases: number;
  quantity: number;
  isDisabled: boolean;
  item: SpecialBundleDetails[];
  triggerBtn: () => void;
  cancelBtn: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { sessionkey, setUserDetails } = useUserContext();
  const [loader, setLoader] = useState("hidden"); // Loading state added
  const [isHigher, setIsHigher] = useState(false);
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);
  const router = useRouter();

  const marketValue = Math.floor(Number(market_value)) || 0; // Ensure it's a whole number
  const formattedMarketValue =
    marketValue > 0 ? marketValue.toLocaleString() : "0";

  const handleBuyNow = async (e: any) => {
    e.preventDefault();
    setLoader("");

    if (!sessionkey) {
      console.error("sessionkey is missing.");
      setLoader("hidden");
      return;
    }

    // Declare the data object outside of the conditionals

    // Assign the data object based on conditions
    const data_basket = {
      basket_id: investment_id,
    };

    try {
      const authHeader = "Token " + sessionkey; // Basic Authentication header
      console.log("DATA: ", data_basket);

      // POST request to buy item to cart
      const response = await axios.post(
        `${apiUrl}/api/wine/cart-items/`,
        data_basket,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );

      // Handle the successful response
      if (response.status === 200 || response.status === 201) {
        const response = await axios.get(`${apiUrl}/api/wine/cart-items/`, {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });

        const response_notif = await axios.get(`${apiUrl}/auth/notification/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        });

        setUserDetails({
          cartCount: response.data.length,
          notification_count: response_notif.data.length,
        });

        setLoader("hidden");
        CustomToast("Added to cart", `Successfully added to cart.`);
        setOpen(false);
        router.push(`/dashboard/orders`);
      }
    } catch (error: any) {
      console.error("Error during request:", error);

      // Check if the error response exists and is a 400 status
      if (error.response) {
        console.error("Response Status: ", error.response.status);
        console.error("Response Data: ", error.response.data);

        if (error.response.status === 400) {
          if (Object.keys(error.response.data).length === 0) {
            alert("Something went wrong.");
          } else {
            console.log("400 Bad Request details: ", error.response.data);
            setIsHigher(true); // You can proceed with the logic here based on the response
          }
        }
      } else {
        console.error("Error Message: ", error.message); // In case the request didn't reach the server
      }
    } finally {
      setLoader("hidden");
    }
  };

  const handleBuyNowHigherPrice = async (e: any) => {
    e.preventDefault();
    // setOpen(false);
    setLoader("");

    if (!sessionkey) {
      console.error("Email or password is missing.");
      setLoader("hidden");
      return;
    }

    // Declare the data object outside of the conditionals
    let data;

    // Assign the data object based on conditions
    if (!lwin11) {
      data = {
        investment_id: investment_id,
        case_size: case_size,
        quantity: quantity,
        is_confirmed: true,
      };
    } else if (!investment_id) {
      data = {
        lwin11: lwin11,
        case_size: case_size,
        quantity: quantity,
        is_confirmed: true,
      };
    }

    try {
      const authHeader = "Token " + sessionkey; // Basic Authentication header
      const response = await axios.post(
        `${apiUrl}/api/wine/cart-items/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const response = await axios.get(`${apiUrl}/api/wine/cart-items/`, {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });

        const response_notif = await axios.get(`${apiUrl}/auth/notification/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        });

        setUserDetails({
          cartCount: response.data.length,
          notification_count: response_notif.data.length,
        });

        console.log("WINE ADDED SUCCESSFULLY");
        setLoader("hidden");
        CustomToast("Added to cart", `Successfully added to cart.`);
        setOpen(false);
      }
    } catch (error: any) {
      console.error("Error during request:", error);

      // Check if the error response exists and is a 400 status
      if (error.response) {
        console.error("Response Status: ", error.response.status);
        console.error("Response Data: ", error.response.data);

        if (error.response.status === 400) {
          console.log("400 Bad Request details: ", error.response.data.details);
          setIsHigher(true); // You can proceed with the logic here based on the response
        }
      } else {
        console.error("Error Message: ", error.message); // In case the request didn't reach the server
      }
    } finally {
      setLoader("hidden");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleBothCancel = () => {
    // First, call handleCancel logic
    handleCancel();
    setIsHigher(false);

    // Then, call cancelBtn
    if (cancelBtn) {
      cancelBtn();
    }
  };

  return (
    <>
      {isHigher ? (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={triggerBtn}
                disabled={isDisabledBtn}
                variant="outline"
                className="px-8 text-[12px] text-[#BDA386] rounded-full border-[#BDA386]"
              >
                Buy Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle className="text-[16px] font-normal">
                  Do you want to buy this wine?
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-[12px]">
                  <CircleAlert className="text-[#EC841A]" size={20} />
                  <p className="text-red-500">
                    The liv ex price is higher than our price.
                  </p>
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-1 text-[14px] mt-3">
                <h1>
                  Market Price: £
                  {Number(market_value)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h1>
                {/* <h1>
            Price: <span className="text-red-700">£{price}</span>
          </h1> */}
              </div>
              <div className="flex justify-between gap-4">
                <Button
                  onClick={handleBothCancel}
                  variant="outline"
                  className="py-2 text-[14px] w-full rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  disabled={isDisabled}
                  onClick={handleBuyNowHigherPrice}
                  className="py-2 text-[14px] w-full"
                >
                  <div className={`${loader}`}>
                    <SpinnerIcon strokeColor="white"></SpinnerIcon>
                  </div>
                  Proceed
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={triggerBtn}
                disabled={isDisabledBtn}
                variant="outline"
                className="px-8 text-[12px] text-[#BDA386] rounded-full border-[#BDA386]"
              >
                Buy Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle className="text-[16px] font-normal">
                  Do you want to buy this wine?
                </DialogTitle>
                {/* <DialogDescription className="flex gap-2 text-[12px]">
                  <CircleAlert className="text-[#EC841A]" size={20} />
                  <p className={`${color}`}>{message}</p>
                </DialogDescription> */}
              </DialogHeader>
              <div className="flex flex-col gap-1 text-[14px] mt-3">
                <h1>
                  Market Price: £
                  {Number(market_value)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h1>
                {/* <h1>
            Price: <span className="text-red-700">£{price}</span>
          </h1> */}
              </div>
              <div className="flex justify-between gap-4">
                <Button
                  onClick={handleBothCancel}
                  variant="outline"
                  className="py-2 text-[14px] w-full rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  disabled={isDisabled}
                  onClick={handleBuyNow}
                  className="py-2 text-[14px] w-full rounded-full"
                >
                  <div className={`${loader}`}>
                    <SpinnerIcon strokeColor="white"></SpinnerIcon>
                  </div>
                  Buy now
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
