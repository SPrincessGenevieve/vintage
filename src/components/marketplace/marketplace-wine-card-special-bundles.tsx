"use client";

import {
  Plus,
  Minus,
  Grape,
  MapPinned,
  Wine,
  StopCircle,
  AlertCircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import PortfolioGiftDialog from "../portfolio/portfolio-gift-dialog";
import PortfolioRequestDialog from "../portfolio/portfolio-request-dialog";
import { cases } from "@/lib/mock-data";
import CaseSize from "./case-size";
import {
  MarketplaceInvest,
  PortfolioType,
  SpecialBundleDetails,
  SpecialBundlesList,
  VintageWineType,
  WineParentType,
} from "@/app/context/UserContext";
import Image from "next/image";
import { Select, SelectTrigger, SelectValue } from "../ui/select";
import BuyNowDialog from "./buy-now-dialog";
import AddToCartDialog from "./add-to-cart-dialog";
import DiscontinueWine from "./discontinue-wine";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import BuyNowSpecialBundlesDialog from "./buy-now-special-bundles-dialog";
import AddToCartSpecialBundlesDialog from "./add-to-cart-special-bundles-dialog";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Visibility {
  label: string;
  value: string;
  hiddenClass: string;
}

export default function MarketplaceWineCardSpecialBundles({
  parent,
  vintage,
}: {
  parent: SpecialBundlesList;
  vintage: SpecialBundleDetails[];
}) {
  const { setUserDetails, sessionkey } = useUserContext();
  const [number_of_cases, setCases] = useState<number>(1);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledBuyNow, setIsDisabledBuyNow] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("Note: It can take up to 2 weeks for the wine to be allocated to your account");
  const [color, setColor] = useState("text-gray-500");
  const bottle_size = "0750";

  const displayValue = (value: string | undefined) => {
    return value === "NA" ? "" : value || "";
  };
  const vintage_year = vintage[0]?.wine_vintage.vintage;

  const market_value_total = vintage.reduce(
    (sum, item) => sum + (Number(item.wine_vintage.market_value) || 0),
    0
  );

  console.log("TOTAL HERE: ", market_value_total);

  const handleCancel = () => {
    setIsDisabled(false);
    setMessage("Note: It can take up to 2 weeks for the wine to be allocated to your account");
    setColor("text-gray-500");
  };

  const handleTriggerBtn = () => {
    setMessage("Note: It can take up to 2 weeks for the wine to be allocated to your account");
    setIsDisabled(false);
    setIsDisabledBuyNow(false);
    setColor("text-gray-500");
  };

  console.log("\n\nCASE SIZE: ", parent.case_size)
  console.log("QUANTITY: ", parent.quantity, "\n\n")

  return (
    <div className="h-auto min-h-full  bg-white w-full p-3 border rounded-2xl flex">
      <div className="flex p-0 m-0 w-[50vh]">
        <div className="flex w-full h-[40vh] flex-col">
          <div className="relative border-gray-200 flex h-full w-full border rounded-2xl items-center justify-center">
            <div className="flex w-full h-full items-center justify-center p-10">
              <Image
                width={400}
                height={400}
                src={parent.image || "/fallback-image.jpg"}
                alt="card"
                className="w-auto h-full max-h-[250px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full relative h-auto items-center flex-col px-5">
        <div className="mt-6 port-desc">
          <h1 className="text-[16px] font-semibold">
            {displayValue(parent?.name) || "None"}
          </h1>

          <div>
            <p className="text-justify text-muted-foreground text-[14px]">
              {displayValue(parent.winery) || "None"} <br />
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <Dialog>
              <DialogTrigger>
                <p className="text-[12px] flex gap-1 items-center text-justify text-blue-600">
                  <MapPinned color="#2E5257"></MapPinned> - Region
                </p>
              </DialogTrigger>
              <DialogContent className="w-[90%] max-h-[90%] h-auto  overflow-y-auto flex flex-col">
                <DialogTitle>Region</DialogTitle>
                <div className="h-full">
                  <p className="text-[14px]  text-justify">
                    {displayValue(parent?.region) || "No further details..."}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <p className="text-[12px] flex gap-1 items-center text-justify text-blue-600">
                  <Grape color="#7351C2"></Grape> - Grapes
                </p>
              </DialogTrigger>
              <DialogContent className="w-[90%] max-h-[90%] h-auto overflow-y-auto flex flex-col">
                <DialogTitle>Grapes</DialogTitle>
                <div className="h-full">
                  <p className="text-[14px] text-justify">
                    {displayValue(parent.grape_variety) ||
                      "No further details..."}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="w-full h-auto mt-2 flex port-top-cont ">
          <div className=" num-group-port w-[100%] flex justify-between">
            <div className="w-[220px] flex flex-col justify-end">
              <div className="flex gap-2 justify-between mb-2">
                <div className="w-[100px] flex items-center">
                  <span className="text-[14px] ">Case Size</span>
                </div>
                <div className="w-[60%]">
                  <p className="border bg-[white] text-gray-400 rounded-3xl py-1 text-center">
                    {parent.case_size}x
                    {bottle_size === "0750"
                      ? "75cl"
                      : bottle_size === "1500"
                      ? "150cl"
                      : bottle_size === "3000"
                      ? "300cl"
                      : bottle_size === "6000"
                      ? "600cl"
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex port-flex items-center gap-2">
                <div className="w-[100px]">
                  <span className="text-[14px]  w-[100px]"># of Cases</span>
                </div>
                <div className="border rounded-2xl flex h-8 w-[120px] gap-2 items-center justify-center">
                  <Button
                    variant="ghost"
                    className=" p-0 ml-5 h-auto"
                    disabled
                    onClick={() =>
                      setCases((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                  >
                    <Minus size={20} className="text-red-700" />
                  </Button>
                  <span className="px-4">{number_of_cases}</span>
                  <Button
                    disabled
                    variant="ghost"
                    className="mr-5 p-0 h-auto"
                    onClick={() => setCases((prev) => prev + 1)}
                  >
                    <Plus size={20} className="text-green-700" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 justify-between mt-2">
                <div className="w-[100px] flex items-center">
                  <span className="text-[14px] ">Vintage</span>
                </div>
                <div className="w-[60%]">
                  <p className="border bg-[white] text-gray-400 rounded-3xl py-1 text-center">
                    {vintage_year}
                  </p>
                </div>
              </div>
            </div>

            <div className=" h-full flex flex-col justify-between">
              <div className="flex flex-col items-start h-full justify-end mb-5">
                {/* <div className="flex flex-col items-start w-full ">
                  <span className="text-[14px] ">Quantity</span>
                  <span className="text-[14px]  text-[#45D658]">
                    {parent.quantity}
                  </span>
                </div> */}
                {/* Market Value */}
                <div className="flex flex-col items-start w-full ">
                  <span className="text-[14px] ">Price</span>
                  <span className="text-[14px]  text-[#45D658]">
                    £{parent.market_value.toLocaleString()}
                  </span>
                </div>
              </div>
              {/* Buttons */}
              <div className="ml-auto flex items-end gap-4 bgn-group-con">
                {/* Market Value */}
                <BuyNowSpecialBundlesDialog
                  number_of_cases={number_of_cases}
                  cancelBtn={handleCancel}
                  color={color}
                  item={vintage}
                  isDisabled={isDisabled}
                  triggerBtn={handleTriggerBtn}
                  message={message}
                  investment_id={parent.id}
                  market_value={String(parent.market_value)}
                  lwin11={""}
                  case_size={parent.case_size}
                  quantity={parent.quantity}
                />
                <AddToCartSpecialBundlesDialog
                  number_of_cases={number_of_cases}
                  cancelBtn={handleCancel}
                  color={color}
                  item={vintage}
                  isDisabled={isDisabled}
                  triggerBtn={handleTriggerBtn}
                  message={message}
                  investment_id={parent.id}
                  market_value={String(parent.market_value)}
                  lwin11={""}
                  case_size={parent.case_size}
                  quantity={parent.quantity}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
