import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Minus,
  AlertCircleIcon,
  CircleAlert,
  CheckCircle,
} from "lucide-react";
import { Input } from "../ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { InvestmentListType } from "@/app/context/UserContext";
import { useUserContext } from "@/app/context/UserContext";
import { Button } from "../ui/button";
import SpinnerIcon from "@/images/Spinner";
import axios from "axios";
import { Dialog, DialogContent } from "../ui/dialog";

interface PortfolioSellDialogProps {
  item: InvestmentListType; // Accept item as a prop
  closeDialog: () => void;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PortfolioSellDialog({
  item,
  closeDialog,
}: PortfolioSellDialogProps) {
  const { sellQuantity, sessionkey, setUserDetails } = useUserContext();
  const [caseSize, setCaseSize] = useState("1x75");
  const [quantity, setQuantity] = useState<number>(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loader, setLoader] = useState("hidden"); // Loading state added
  const [sellMessage, setSellMessage] = useState("");
  const [color, setColor] = useState("text-gray-400");
  const [isSuccessDialog, setIsSuccessDialog] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const bottleSize = item.bottle_size;
  const authHeader = "Token " + sessionkey; // Basic Authentication header

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

    const btnStatus = () => {
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

    btnStatus();
    caseSizing();
  }, [item.case_size]);

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

  const handleSell = async (e: any) => {
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
        setDialogOpen(false);
        setIsSuccessDialog(true); // Trigger success dialog
        setUserDetails({
          sellQuantity: sellQuantity,
        });
        location.reload();
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

  const successDialog = (isOpen: boolean) => {
    return (
      <Dialog open={isOpen} onOpenChange={setIsSuccessDialog}>
        <DialogContent className="flex flex-col justify-center items-center">
          <div className="p-4 flex flex-col h-[180px] w-full border rounded-2xl justify-center items-center">
            <Image
              width={400}
              height={400}
              className="z-20 w-auto max-h-[150px]"
              src={item.wine_image}
              alt={""}
            ></Image>
            <p className="w-full text-left font-light">{item.case_size}X75</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle color="#23dd23" size={20}></CheckCircle>
            <p className="text-[12px]">
              Successfully sell wine {item.wine_name}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      {isSuccessDialog ? (
        <>
          <div className="border rounded-2xl p-2">
            <div className="relative flex flex-col h-[180px]">
              <div className="flex justify-center p-2 absolute rounded-full w-full items-center">
                <Image
                  width={300}
                  height={300}
                  src={item.wine_image}
                  alt="card"
                  className="z-20 w-auto max-h-[150px]"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-[12px] font-semibold">
                {item.wine_name}
              </p>
              <div className="text-gray-400 flex justify-between">
                <p className="text-[10px] font-light">Vintage</p>
                <p className="text-[10px] font-light">
                  {item.vintage}
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
          <div className="flex gap-2">
            <CheckCircle color="#23dd23" size={20}></CheckCircle>
            <p className="text-[12px]">
              Successfully sell wine {item.wine_name}
            </p>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="border rounded-2xl p-2">
              <div className="relative flex flex-col h-[180px]">
                <div className="flex justify-center p-2 absolute rounded-full w-full items-center">
                  <Image
                    width={300}
                    height={300}
                    src={item.wine_image}
                    alt="card"
                    className="z-20 w-auto max-h-[150px]"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-[12px] font-semibold">
                  {item.wine_name}
                </p>
                <div className="text-gray-400 flex justify-between">
                  <p className="text-[10px] font-light">Vintage</p>
                  <p className="text-[10px] font-light">
                    {item.vintage}
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

            <div className="w-full mt-4">
              <div className="w-full gap-2 flex justify-center items-center">
                <p className="text-[12px]">Quantity</p>
                <div className="relative border rounded-2xl px-2 py-1 flex gap-2 items-center justify-center">
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

                  <HoverCard>
                    <HoverCardTrigger className="flex w-full h-full items-center justify-center">
                      <button
                        onClick={handleIncrease}
                        disabled={quantity >= item.quantity}
                      >
                        <Plus size={20} className="text-green-700" />
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className="flex items-center w-auto gap-2">
                      <AlertCircleIcon color="#ff8800" size={20} />
                      <p className="text-[12px]">
                        Max quantity: {item.quantity}
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-center h-28 items-center">
                <div className="flex gap-2">
                  <CircleAlert color="#EC841A" size={15} />
                  <p className="text-[12px] font-light">
                    Note: it can take between two to three weeks until your
                    receive the funds from your sale.
                  </p>
                </div>
                <p className="text-[12px] text-[red]">{sellMessage}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-around">
            <Button
              onClick={closeDialog}
              className="rounded-full w-40 bg-transparent border text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSell}
              disabled={isDisabled}
              className="w-40 bg-[#8D1B22] rounded-full"
            >
              <div className={`${loader}`}>
                <SpinnerIcon strokeColor="white"></SpinnerIcon>
              </div>
              Sell
            </Button>
          </div>
        </>
      )}
    </>
  );
}
