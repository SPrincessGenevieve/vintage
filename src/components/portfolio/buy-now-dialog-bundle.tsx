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
import { AlertCircle, AlertCircleIcon, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BundleDetailsType,
  WineParentType,
} from "@/app/context/UserContext";
import { Input } from "../ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import SpinnerIcon from "@/images/Spinner";
import CustomToast from "../custom-toast";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function BuyBundleDialog({
  // market_value,
  item,
}: {
  // market_value: number;
  item: BundleDetailsType;
}) {
  const { sessionkey, setUserDetails } = useUserContext();
  const [open, setOpen] = useState<boolean>(false);
  const [cases, setCases] = useState<number>(1);
  const [caseSize, setCaseSize] = useState("1x75");
  const [originalQuantity, setOriginalQuantity] = useState(item.quantity);
  const [newQuantity, setNewQuantity] = useState();
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [loader, setLoader] = useState("hidden"); // Loading state added
  const router = useRouter();
  const [isHigher, setIsHigher] = useState(false);

  useEffect(() => {
    const caseSizing = () => {
      if (item.case_size === 1) {
        setCaseSize("1x75");
      } else if (item.case_size === 3) {
        setCaseSize("3x75");
      } else if (item.case_size === 6) {
        setCaseSize("6x75");
      } else if (item.case_size === 12) {
        setCaseSize("12x75");
      }
    };

    caseSizing();
  });

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setCases(Math.min(value, item.quantity)); // Ensure input does not exceed item.quantity
    } else {
      setCases(1); // Default to 1 if input is invalid
    }
  };

  const handleAddQuantity = (amountToAdd: number) => {
    setCases((prev) => Math.min(prev + amountToAdd));
  };

  const handleBuyMore = async (e: any) => {
    e.preventDefault();
    setLoader("");

    const authHeader = "Token " + sessionkey;

    let data;

    data = {
      basket_id: item.basket_details.id,
    };

    try {
      // Make a request to your backend to get the SetupIntent clientSecret using axios
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
        setLoader("hidden");
        setMessage("Successfully added");
        setColor("text-green-500");
        console.log("WINE BOUGHT SUCCESSFULLY");

        const response = await axios.get(`${apiUrl}/api/wine/cart-items/`, {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });

        setUserDetails({
          cartCount: response.data.length,
        });

        setLoader("hidden");
        router.push(`/dashboard/orders`);
      } else {
        setIsHigher(true);
      }
    } catch (error: any) {
      console.error("Error during request:", error);
      // Check if the error response exists and is a 400 status
      if (error.response) {
        console.error("Response Status: ", error.response.status);
        console.error("Response Data: ", error.response.data);
        setMessage(error.response.data.details);
        setColor("text-red-500");
        setLoader("hidden");
      } else {
        console.error("Error Message: ", error.message); // In case the request didn't reach the server
        setMessage(error.response.data.details);
        setLoader("hidden");
        setColor("text-red-500");
      }
    } finally {
      setLoader("hidden");
    }
  };

  const handleBuyMoreHigherPrice = async (e: any) => {
    e.preventDefault();
    setLoader("");

    const authHeader = "Token " + sessionkey;

    let data;

    data = {
      basket_id: item.basket_details.id,
    };

    try {
      // Make a request to your backend to get the SetupIntent clientSecret using axios
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
        setLoader("hidden");
        setMessage("Successfully added");
        setColor("text-green-500");
        console.log("WINE BOUGHT SUCCESSFULLY");

        const response = await axios.get(`${apiUrl}/api/wine/cart-items/`, {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });

        setUserDetails({
          cartCount: response.data.length,
        });

        setLoader("hidden");
        router.push(`/dashboard/orders`);
      }
    } catch (error: any) {
      console.error("Error during request:", error);
      // Check if the error response exists and is a 400 status
      if (error.response) {
        console.error("Response Status: ", error.response.status);
        console.error("Response Data: ", error.response.data);
        setMessage(error.response.data.details);
        setColor("text-red-500");
        setLoader("hidden");
      } else {
        console.error("Error Message: ", error.message); // In case the request didn't reach the server
        setMessage(error.response.data.details);
        setLoader("hidden");
        setColor("text-red-500");
      }
    } finally {
      setLoader("hidden");
    }
  };


  return (
    <>
      {isHigher ? (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="py-2 w-28 rounded-full bg-[#1BCD32] text-white px-8 text-[14px] gen-text-sm "
              >
                Buy more
              </Button>
            </DialogTrigger>
            <DialogContent className="w-auto p-10 min-w-[350px] rounded-xl min-h-[400px]">
              <DialogHeader>
                <DialogTitle className="text-[16px] text-[red] text-center font-normal">
                  The liv ex price is higher than our price. Are you sure you
                  want to buy more {item.basket_details.name}?
                </DialogTitle>
                <div className="relative w-full min-h-[200px] flex justify-center rounded-[10px] border items-center">
                  <div className="absolute rounded-full w-[90px] h-[90px] bg-red-950 z-10"></div>
                  <Image
                    width={300}
                    height={300}
                    src={item.basket_details.image || "/fallback-image.jpg"}
                    alt="card"
                    className="z-20 w-auto max-h-[150px]"
                  />
                  <p className="absolute bottom-0 left-0 p-2 font-thin">
                    {caseSize}
                  </p>
                </div>
                <div className="w-full flex gap-3 p-2 gen-text-s justify-center">
                  <AlertCircle color="#EC841A" size={15}></AlertCircle>
                  <div className="w-full text-center">
                    <p className="font-light text-[12px]">
                      Note: Wine purchases can take up to two weeks to arrive in
                      bond.
                    </p>
                    <p className={`py-2 text-[12px] ${color}`}>{message}</p>
                  </div>
                </div>
              </DialogHeader>
              <div className="flex flex-col gap-1 text-[14px] mt-3">
                <div className="flex justify-between gap-4">
                  <Button
                    onClick={() => setOpen(false)}
                    variant="outline"
                    className="rounded-full py-2 text-[14px] w-full"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBuyMoreHigherPrice}
                    className="rounded-full py-2 text-[14px] w-full bg-[#1BCD32]"
                  >
                    <div className={`${loader}`}>
                      <SpinnerIcon strokeColor="white"></SpinnerIcon>
                    </div>
                    Proceed
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="py-2 w-28 rounded-full bg-[#1BCD32] text-white px-8 text-[14px] gen-text-sm "
              >
                Buy more
              </Button>
            </DialogTrigger>
            <DialogContent className="w-auto p-10 min-w-[350px] rounded-xl min-h-[400px]">
              <DialogHeader>
                <DialogTitle className="text-[16px] text-center font-normal">
                  Are you sure you want to buy more of this wine?
                </DialogTitle>
                <div className="relative w-full min-h-[200px] flex justify-center rounded-[10px] border items-center">
                  {/* <div className="font-thin absolute bg-[#C4AD93] w-24 h-7 top-0 left-0 rounded-tl-[10px] text-center text-white flex items-center justify-center">
              {item.type}
            </div> */}
                  <div className="absolute rounded-full w-[90px] h-[90px] bg-red-950 z-10"></div>
                  <Image
                    width={300}
                    height={300}
                    src={item.basket_details.image || "/fallback-image.jpg"}
                    alt="card"
                    className="z-20 w-auto max-h-[150px]"
                  />
                  <p className="absolute bottom-0 left-0 p-2 font-thin">
                    {caseSize}
                  </p>
                </div>
                <div className="w-full justify-center pt-4 flex gap-4 items-center">
                  <span className="text-[14px] gen-text-s">Case</span>
                  <div className="relative border rounded-2xl px-2 py-1 flex gap-2 items-center justify-center">
                    <button
                      onClick={() => handleAddQuantity(-1)}
                      disabled={cases <= 1}
                    >
                      <Minus color="red" size={20} className="gen-text-s" />
                    </button>
                    {/* <span className="px-4 ">{cases}</span> */}
                    <Input
                      value={cases ?? 1}
                      type="number"
                      onChange={handleQuantityChange}
                      className="border-none p-2 outline-none text-[14px] text-center w-16"
                    ></Input>
                    <button onClick={() => handleAddQuantity(1)}>
                      <Plus size={20} className="text-green-700" />
                    </button>
                  </div>
                </div>
                <div className="w-full flex gap-3 p-2 gen-text-s justify-center">
                  <AlertCircle color="#EC841A" size={15}></AlertCircle>
                  <div className="w-full text-center">
                    <p className="font-light text-[12px]">
                      Note: Wine purchases can take up to two weeks to arrive in
                      bond.
                    </p>
                    <p className={`py-2 text-[12px] ${color}`}>{message}</p>
                  </div>
                </div>
              </DialogHeader>
              <div className="flex flex-col gap-1 text-[14px] mt-3">
                <div className="flex justify-between gap-4">
                  <Button
                    onClick={() => setOpen(false)}
                    variant="outline"
                    className="rounded-full py-2 text-[14px] w-full"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBuyMore}
                    className="rounded-full py-2 text-[14px] w-full bg-[#1BCD32]"
                  >
                    <div className={`${loader}`}>
                      <SpinnerIcon strokeColor="white"></SpinnerIcon>
                    </div>
                    Buy
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
