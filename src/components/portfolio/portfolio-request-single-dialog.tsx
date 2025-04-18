import React, { useEffect, useState } from "react";
import { InvestmentType, WineCardT } from "@/lib/types";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { PortfolioType, WineParentType } from "@/app/context/UserContext";

interface PortfolioSellDialogProps {
  item: InvestmentType;
}

export default function PortfolioGiftDialog({
  item,
}: PortfolioSellDialogProps) {
  const [caseSize, setCaseSize] = useState("1x75");
  const bottleSize = item.wine_vintage_details.bottle_size;

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

      <div className="flex flex-col">
        <Label className="font-light py-3">Name</Label>
        <Input
          className="h-10"
          placeholder="john.doe@gmail.com"
          type="text"
        ></Input>
        <Label className="font-light py-3">Address</Label>
        <Input
          className="h-10"
          placeholder="john.doe@gmail.com"
          type="text"
        ></Input>
        <Label className="font-light py-3">Contact #</Label>
        <Input
          className="h-10"
          placeholder="john.doe@gmail.com"
          type="text"
        ></Input>
      </div>
      <div className="flex gap-2 justify-center h-10  items-center">
        <div className="flex">
          <CircleAlert color="#EC841A" size={15}></CircleAlert>
          <p className="text-[12px] font-thin text-center">
            Please allow 3 - 5 business days for your wine to be delivered.
          </p>
        </div>
      </div>
    </div>
  );
}
