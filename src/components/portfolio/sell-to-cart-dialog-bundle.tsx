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
import { CircleAlert, CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BundleDetailsType } from "@/app/context/UserContext";
import SpinnerIcon from "@/images/Spinner";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function SellBundleDialog({
  market_value,
  price,
  quantity,
  item,
}: {
  market_value: string;
  price: number | null;
  quantity: number;
  item: BundleDetailsType;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loader, setLoader] = useState("hidden"); // Loading state added
  const { setUserDetails, sessionkey, sellQuantity } = useUserContext();
  const authHeader = "Token " + sessionkey; // Basic Authentication header
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleAddToCart = async () => {
    setLoader("");
    let data;
    data = {
      quantity_to_sell: quantity,
    };
    try {
      const response = await axios.put(
        `${apiUrl}/api/wine/investment/${item.id}/?action=sell`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        console.log("Success!");
        setLoader("hidden");
        // Close the parent dialog and open the child dialog
        setOpen(false); // Close the parent dialog
        setOpen2(true); // Open the child dialogr success dialog
        setUserDetails({
          sellQuantity: sellQuantity,
        });
      }
    } catch (error: any) {
      console.error("Error during request:", error);
      if (error.response) {
        const response = error.response;
        setLoader("hidden");
        setError(true);
        setMessage(response.data.details);
      } else {
        console.error("Error Message: ", error.message); // In case the request didn't reach the server
      }
    } finally {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const btnDisabled = () => {
      if (item.investment_status === "owned") {
        setIsDisabled(false);
      } else if (
        item.investment_status === "for_sale" ||
        item.investment_status === "pending" ||
        item.investment_status === "idle"
      ) {
        setIsDisabled(true);
      }
      if (item.quantity <= 0) {
        setIsDisabled(true);
      }
    };

    btnDisabled();
  });
  // Convert the market value to a number, ensure it is valid, and format it
  const marketValue = Math.floor(Number(market_value)) || 0; // Use Math.floor to get a whole number

  // Format the number with commas if greater than 0
  const formattedMarketValue =
    marketValue > 0 ? marketValue.toLocaleString() : "0"; // Ensure it's a string, not a number

  return (
    <>
      {/* Parent Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            disabled={isDisabled}
            className="rounded-full py-2 text-[14px] w-28 gen-text-sm bg-[#8D1B22]"
          >
            Sell
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-[16px] font-normal">
              Are you sure to sell this wine?
            </DialogTitle>
            <DialogDescription className="flex items-center gap-2 text-[12px]">
              <CircleAlert className="text-[#EC841A]" size={20} />
              Market price is undervalue.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1 text-[14px] mt-3">
            <h1>Market Price: £{market_value}</h1>
          </div>
          {error && <p className="text-red-600 text-[14px]">{message}</p>}
          <div className="flex justify-between gap-4">
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="rounded-full py-2 text-[14px] w-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToCart}
              className="rounded-full bg-[#8D1B22] py-2 text-[14px] w-full"
            >
              <div className={`${loader}`}>
                <SpinnerIcon strokeColor="white"></SpinnerIcon>
              </div>
              Sell
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Child Dialog */}
      <Dialog open={open2} onOpenChange={setOpen2}>
        <DialogContent>
          <div className="flex gap-2">
            <div className="h-full flex justify-center items-center">
              <CircleCheck
                size={30}
                strokeWidth={1}
                className="text-green-500"
              ></CircleCheck>
            </div>
            <div className="flex gap-1 flex-col">
              <p className="font-light">
                <span className="font-semibold">Request Successful</span>{" "}
                <br></br> View activities for logs{" "}
                <span>
                  <a
                    className="text-blue-500"
                    href="/dashboard/settings/activity"
                  >
                    here
                  </a>
                </span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
