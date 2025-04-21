import React, { useEffect, useState } from "react";
import { InvestmentType, WineCardT } from "@/lib/types";
import {
  AlertCircleIcon,
  ChevronDown,
  CircleAlert,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { PortfolioType, WineParentType } from "@/app/context/UserContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpinnerIcon from "@/images/Spinner";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";

interface PortfolioSellDialogProps {
  item: InvestmentType;
  isDisabled: boolean;
  closeDialog: () => void;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PortfolioGiftSingleDialog({
  item,
  closeDialog,
}: PortfolioSellDialogProps) {
  const {
    sellQuantity,
    email,
    password1,
    sessionkey,
    sub_accounts,
    quantity_to_transfer,
    setUserDetails,
  } = useUserContext();
  const [caseSize, setCaseSize] = useState("1x75");
  const [quantity, setQuantity] = useState<number>(1);
  const [loader, setLoader] = useState("hidden"); // Loading state added
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSuccessDialog, setIsSuccessDialog] = useState(false);
  const [sellMessage, setSellMessage] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [cancelGift, setCancelGift] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

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

    if (quantity_to_transfer === 0) {
      setCancelGift(true);
    } else {
      setCancelGift(false);
    }

    caseSizing();
  });

  const handleIncrease = () => {
    if (quantity < item.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(item.quantity, Number(e.target.value)));
    setQuantity(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleGift = async (e: any) => {
    setLoader("");
    let data;
    data = {
      quantity_to_transfer: quantity,
      email_recipient: emailValue,
    };

    try {
      const authHeader = "Token " + sessionkey; // Basic Authentication header

      const response = await axios.put(
        `${apiUrl}/api/wine/investment/${item.id}/?action=gift`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        const response2 = await axios.get(
          `${apiUrl}/api/wine/investment/${item.id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader,
            },
          }
        );

        if (response2.status === 200 || response2.status === 201) {
          console.log("RESPONSE: ", response2.data.quantity_to_transfer);
          console.log("Success!");
          setUserDetails({
            quantity_to_transfer: response2.data.quantity_to_transfer,
            sellQuantity: sellQuantity,
          });
          setLoader("hidden");
          setDialogOpen(false);
          setIsSuccessDialog(true); // Trigger success dialog
          // location.reload();
        }
      }
    } catch (error: any) {
      console.error("Error during request:", error);
      if (error.response) {
        setLoader("hidden");
        if (error.response.status === 400) {
          setSellMessage(error.response.data.details); // You can proceed with the logic here based on the response
          setTimeout(() => {
            setSellMessage("");
          }, 5000);
        } else if (error.response.status === 500) {
          setSellMessage(error.response.data.details); // You can proceed with the logic here based on the response
          setTimeout(() => {
            setSellMessage("");
          }, 5000);
        }
      } else {
        console.error("Error Message: ", error.message); // In case the request didn't reach the server
      }
    }
  };

  const handleGiftCancel = async (e: any) => {
    setLoader("");

    let data;
    data = {
      quantity: item.quantity_to_transfer,
      email_recipient: emailValue,
    };

    try {
      const authHeader = "Token " + sessionkey; // Basic Authentication header

      const response = await axios.put(
        `${apiUrl}/api/wine/investment/${item.id}/?action=cancel_transfer`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        const response = await axios.get(`${apiUrl}/api/wine/investment/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        });

        console.log("Success!");

        const response2 = await axios.get(
          `${apiUrl}/api/wine/investment/${item.id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader,
            },
          }
        );

        if (response2.status === 200 || response2.status === 201) {
          console.log("RESPONSE: ", response2.data.quantity_to_transfer);
          console.log("Success!");
          setUserDetails({
            quantity_to_transfer: response2.data.quantity_to_transfer,
            sellQuantity: sellQuantity,
          });
          setLoader("hidden");
          setDialogOpen(false);
          setIsSuccessDialog(true); // Trigger success dialog
        }
      }
    } catch (error: any) {
      console.error("Error during request:", error);
      if (error.response) {
        setLoader("hidden");
        if (error.response.status === 400) {
          setSellMessage(error.response.data.details); // You can proceed with the logic here based on the response
          setTimeout(() => {
            setSellMessage("");
          }, 5000);
        } else if (error.response.status === 500) {
          setSellMessage(error.response.data.details); // You can proceed with the logic here based on the response
          setTimeout(() => {
            setSellMessage("");
          }, 5000);
        }
      } else {
        console.error("Error Message: ", error.message); // In case the request didn't reach the server
      }
    }
  };

  const bottleSize = item.wine_vintage_details.bottle_size;

  return (
    <div className="">
      <div className="border rounded-2xl mb-5">
        <div className="border rounded-2xl p-2">
          <div className="relative flex flex-col h-[180px]">
            <div className="flex justify-center p-2 absolute rounded-full w-full items-center">
              <Image
                width={300}
                height={300}
                src={item.wine_parent.images[0]}
                alt="card"
                className="z-20 w-auto max-h-[150px]"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[12px] font-semibold">{item.wine_parent.name}</p>
            <div className="text-gray-400 flex justify-between">
              <p className="text-[10px] font-light">Vintage</p>
              <p className="text-[10px] font-light">
                {item.wine_vintage_details.vintage}
              </p>
            </div>
            <div className="text-gray-400 flex justify-between">
              <p className="text-[10px] font-light">Quantity</p>
              <p className="text-[10px] font-light">{item.quantity}</p>
            </div>
            <div className="text-gray-400 flex justify-between">
              <p className="text-[10px] font-light">Case Size</p>
              <p className="text-[10px] font-light">
                {item.case_size}
                {bottleSize === "0750"
                  ? "x75cl"
                  : bottleSize === "1500"
                  ? "x150cl"
                  : bottleSize === "3000"
                  ? "x300cl"
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Description */}

      {quantity_to_transfer !== 0 ? (
        <>
          <p className="text-[12px] my-4">
            You have already requested to gift this wine. Do you want to cancel?
          </p>
        </>
      ) : (
        <>
          <Label className="font-light py-5">Enter Email</Label>
          <div className="w-full h-auto flex gap-2 items-center justify-center">
            <div className="flex w-full flex-col items-center">
              <Input
                required
                placeholder="john.doe@gmail.com"
                type="text"
                className="h-10"
                onChange={handleEmailChange}
              ></Input>
            </div>
            <div className="w-auto gap-2 flex flex-col justify-center items-center">
              <div className="relative border rounded-xl px-2  flex gap-2 items-center justify-center">
                <HoverCard>
                  <HoverCardTrigger className="flex w-full h-full items-center justify-center">
                    <button onClick={handleDecrease} disabled={quantity <= 1}>
                      <Minus color="red" size={20} className="gen-text-s" />
                    </button>

                    <Input
                      value={quantity}
                      type="number"
                      min={1}
                      max={item.quantity}
                      onChange={handleChange}
                      className="border-none p-2 outline-none text-[14px] text-center w-16"
                    />

                    <button
                      onClick={handleIncrease}
                      disabled={quantity >= item.quantity}
                    >
                      <Plus size={20} className="text-green-700" />
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex items-center w-auto gap-2">
                    <AlertCircleIcon color="#ff8800" size={20} />
                    <p className="text-[12px]">Max quantity: {item.quantity}</p>
                  </HoverCardContent>
                </HoverCard>
              </div>
              {/* <p className="text-[12px]">Quantity</p> */}
            </div>
          </div>
          <div className="flex gap-2 justify-center h-20  items-center">
            <div className="flex gap-2 justify-center">
              <CircleAlert color="#EC841A" size={15}></CircleAlert>
              <p className="text-[12px] font-light text-left">
                Note: If the account doesn’t exist yet - we will send them an
                email invitation for account creation.
              </p>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-around">
        <Button
          onClick={closeDialog}
          className="rounded-full w-[150px] bg-transparent border text-gray-400 hover:text-white"
        >
          Close
        </Button>
        {quantity_to_transfer !== 0 ? (
          <>
            {" "}
            <Button
              onClick={handleGiftCancel}
              className="rounded-full w-[150px] bg-[#810909]"
            >
              <div className={`${loader}`}>
                <SpinnerIcon stroke_color="white"></SpinnerIcon>
              </div>
              Yes
            </Button>
          </>
        ) : (
          <>
            {" "}
            <Button
              onClick={handleGift}
              className="rounded-full w-[150px] bg-[#C4AD93]"
            >
              <div className={`${loader}`}>
                <SpinnerIcon stroke_color="white"></SpinnerIcon>
              </div>
              Gift
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
