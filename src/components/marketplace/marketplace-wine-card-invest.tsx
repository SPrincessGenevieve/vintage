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
import { useRouter, useSearchParams } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import PortfolioRareWineChart from "../portfolio/portfolio-rare-wine-chart-card";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Visibility {
  label: string;
  value: string;
  hiddenClass: string;
}

export default function MarketplaceWineCardInvest({
  item,
  itemChart,
  parent,
  vintage,
  year,
}: {
  item: MarketplaceInvest;
  itemChart: PortfolioType;
  parent: WineParentType;
  vintage: VintageWineType;
  year: number | null;
}) {
  const { setUserDetails, sessionkey, select_case_size_rare } =
    useUserContext();
  const [number_of_cases, setCases] = useState<number>(1);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledBuyNow, setIsDisabledBuyNow] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState(
    "Note: It can take up to 2 weeks for the wine to be allocated to your account."
  );
  const [color, setColor] = useState("text-gray-500");
  const actions = ["Gift", "Delivery Request"];
  const [isTruncated, setIsTruncated] = useState(true);
  const [selectedCaseSize, setSelectedCaseSize] = useState<number>(1);
  const [isHiddenOwnership, setIsHiddenOwnership] = useState("");
  const [isHiddenFromm, setIsHiddenFrom] = useState("");
  const [isHiddenBlend, setIsHiddenBlend] = useState("");
  const [isHiddenGrapes, setIsHiddenGrapes] = useState("");
  const [isHiddenMaturation, setIsHiddenMaturation] = useState("");
  const [isHiddenAlcohol, setIsHiddenAlcohol] = useState("");
  const [wine_price, setWinePrice] = useState("");
  const [isOwnerText, setIsOwnerText] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (vintage.market_value === "0.00") {
      setWinePrice(String(vintage.liv_ex_value));
    } else {
      setWinePrice(vintage.market_value);
    }

    if (item.is_owner === true) {
      setIsDisabled(true);
      setIsOwnerText("");
    } else {
      setIsDisabled(false);
      setIsOwnerText("hidden");
    }
  }, [year]);

  const displayValue = (value: string | undefined) => {
    return value === "NA" ? "" : value || "";
  };

  const displayValueNote = (value: string | undefined) => {
    return value === "NA" ? "No notes" : value || "";
  };

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    setDialogOpen(true);
  };

  const market_value =
    vintage && vintage.market_value ? vintage.market_value : "0";

  const handleTriggerBtn = () => {
    console.log("number_of_cases:", number_of_cases);
    console.log("item.quantity:", item.quantity);
    if (number_of_cases > item.quantity) {
      setMessage("You exceed to the maximum quantity.");
      setIsDisabled(true);
      setIsDisabledBuyNow(true);
      setColor("text-red-500");
      return;
    } else {
      setMessage(
        "Note: It can take up to 2 weeks for the wine to be allocated to your account"
      );
      setIsDisabled(false);
      setIsDisabledBuyNow(false);
      setColor("text-gray-500");
    }
  };

  const handleCancel = () => {
    setIsDisabled(false);
    setMessage(
      "Note: It can take up to 2 weeks for the wine to be allocated to your account."
    );
    setColor("text-gray-500");
  };

  const HiddenInfo = ({ label, value, hiddenClass }: Visibility) => (
    <span
      className={`bg-[#2A2C2D] rounded-2xl py-1 text-white text-center text-[12px] font-light w-auto px-2 ${hiddenClass}`}
    >
      {label} {displayValue(value)}
    </span>
  );

  useEffect(() => {
    const hide = () => {
      setIsHiddenOwnership(parent?.ownership === "NA" ? "hidden" : "");
      setIsHiddenFrom(parent?.fromm === "NA" ? "hidden" : "");
      setIsHiddenBlend(parent?.blend === "NA" ? "hidden" : "");
      setIsHiddenAlcohol(parent?.alcohol_abv === "0.00%" ? "hidden" : "");
      setIsHiddenGrapes(parent?.grapes === "NA" ? "hidden" : "");
      setIsHiddenMaturation(
        parent?.maturation ||
          parent?.maturation === "NA" ||
          parent?.maturation.trim() === ""
          ? "hidden"
          : ""
      );
    };

    hide();
  }, []);

  const total_market_price = Math.round(
    (Number(wine_price || 0) / Number(vintage.processed_case || 1)) *
      (Number(selectedCaseSize || 0) * Number(number_of_cases || 0))
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="h-full  bg-white w-full p-3 border rounded-2xl flex port-info-cont glass-slide-cont">
        <div className="flex p-0 m-0 w-[50vh]">
          <div className="flex w-full h-[40vh] flex-col">
            <div className="relative border-gray-200 flex h-auto w-full border rounded-2xl items-center justify-center">
              <div className="absolute top-0 left-0 bg-[#C4AD93] rounded-tl-2xl w-[150px] h-[35px]">
                <p className="w-full h-full text-[12px] text-white text-center flex items-center justify-center">
                  Critic Score: {vintage?.rp_score || 0}
                </p>
              </div>
              <div className="flex w-full h-full items-center justify-center p-10">
                <Image
                  width={400}
                  height={400}
                  src={parent.images?.[0] || "/fallback-image.jpg"}
                  alt="card"
                  className="w-auto h-full max-h-[300px]"
                />
              </div>

              <p
                className={`border-y rounded-bl-2xl rounded-br-2xl border-red-200 w-full text-center py-2 absolute bottom-0 text-[12px] text-[red] font-semibold ${isOwnerText}`}
              >
                YOU CANNOT BUY YOUR OWN INVESTMENTS
              </p>
            </div>
            <DiscontinueWine
              investment_id={item.investment_id}
              wine_name={displayValue(parent?.name)}
              isOwnerText={isOwnerText}
            ></DiscontinueWine>
          </div>
        </div>
        <div className="flex w-full relative h-auto items-center flex-col px-5">
          <div className="flex justify-between items-center w-full">
            {/* Badges */}
            <div className="flex gap-1 flex-wrap">
              <HiddenInfo
                label=""
                value={displayValue(parent?.fromm)}
                hiddenClass={isHiddenFromm}
              />

              <HiddenInfo
                label="Alcohol ABV: "
                value={displayValue(parent?.alcohol_abv)}
                hiddenClass={isHiddenAlcohol}
              />
              <HiddenInfo
                label="Blend: "
                value={displayValue(parent?.blend)}
                hiddenClass={isHiddenBlend}
              />
              <HiddenInfo
                label="Grapes: "
                value={displayValue(parent?.grapes)}
                hiddenClass={isHiddenGrapes}
              />
              <HiddenInfo
                label="Maturation: "
                value={displayValue(parent?.maturation)}
                hiddenClass={isHiddenMaturation}
              />
              <HiddenInfo
                label="Ownership: "
                value={displayValue(parent?.ownership)}
                hiddenClass={isHiddenOwnership}
              />
            </div>
          </div>

          <div className="mt-6 port-desc">
            <h1 className="text-[16px] font-semibold">
              {displayValue(parent?.name) || "None"}
            </h1>

            <div>
              <p className="text-justify text-muted-foreground text-[14px]">
                {displayValue(parent?.winery) || "None"} <br />
                <br />{" "}
                <span className="text-[12px] italic">
                  Tasting Note: {displayValueNote(vintage.rp_tasting_notes)}
                </span>
              </p>
              {/* <span className="text-muted-foreground text-[14px]  cursor-pointer">
                  {isTruncated ? (
                    <>
                      {truncatedWinery}
                      {parent?.winery?.length > 100 && (
                        <span
                          className="text-blue-500 cursor-pointer ml-1"
                          onClick={handleReadMoreClick}
                        >
                          [read more...]
                        </span>
                      )}
                    </>
                  ) : (
                    parent?.winery || "Unknown Winery"
                  )}
                </span> */}

              {/* Dialog Content */}
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
                      {displayValue(parent?.grape_variety) ||
                        "No further details..."}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="w-full h-full relative bottom-5 flex port-top-cont mt-[3%]">
            <div className=" num-group-port w-[100%] flex justify-between">
              <div className="w-[220px] flex flex-col justify-end">
                <div className="flex gap-2 justify-between mb-2">
                  <div className="w-[100px] flex items-center">
                    <span className="text-[14px] ">Case Size</span>
                  </div>
                  <div className="w-[60%]">
                    {/* <CaseSize
                    disabled={true}
                    case_size={cases}
                    selectedCaseSize={selectedCaseSize}
                    setSelectedCaseSize={(value: number) => {
                      if (item.case_size !== null) {
                        setSelectedCaseSize(item.case_size);
                      }
                    }}
                  ></CaseSize> */}
                    <p className="border bg-[white] text-gray-400 rounded-3xl py-1 text-center">
                      {item.case_size}x
                      {item.wine_vintage_details.bottle_size === "0750"
                        ? 75
                        : item.wine_vintage_details.bottle_size === "1500"
                        ? 150
                        : item.wine_vintage_details.bottle_size === "3000"
                        ? 300
                        : item.wine_vintage_details.bottle_size === "6000"
                        ? 600
                        : 0}
                    </p>
                  </div>
                </div>
                <div className="flex port-flex items-center gap-2">
                  <div className="w-[100px]">
                    <span className="text-[14px]  w-[100px]"># of Cases</span>
                  </div>
                  <HoverCard>
                    <HoverCardTrigger>
                      <div className="border rounded-2xl flex h-8 w-[120px] gap-2 items-center justify-center">
                        <Button
                          variant="ghost"
                          className=" p-0 ml-5 h-auto"
                          onClick={() =>
                            setCases((prev) => (prev > 1 ? prev - 1 : 1))
                          }
                        >
                          <Minus size={20} className="text-red-700" />
                        </Button>
                        <span className="px-4">{number_of_cases}</span>
                        <Button
                          variant="ghost"
                          className="mr-5 p-0 h-auto"
                          onClick={() => setCases((prev) => prev + 1)}
                          disabled={number_of_cases >= item.quantity}
                        >
                          <Plus size={20} className="text-green-700" />
                        </Button>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="flex items-center w-auto gap-2">
                      <AlertCircleIcon color="#ff8800" size={20} />
                      <p className="text-[12px]">
                        Max quantity: {item.quantity}
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <div className="flex gap-2 justify-between mt-2">
                  <div className="w-[100px] flex items-center">
                    <span className="text-[14px] ">Vintage</span>
                  </div>
                  <div className="w-[60%]">
                    <Select value={`${year}`}>
                      <SelectTrigger className={`h-8 opacity-50`} disabled>
                        <SelectValue className="text-center m">
                          {year || ""}
                        </SelectValue>
                      </SelectTrigger>
                    </Select>
                  </div>
                </div>
              </div>

              <div className=" h-full flex flex-col justify-between">
                <div className="flex flex-col items-start h-full justify-end mb-5">
                  <div className="flex flex-col items-start w-full ">
                    <span className="text-[14px] ">Quantity</span>
                    <span className="text-[14px]  text-[#45D658]">
                      {item?.quantity}
                    </span>
                  </div>
                  {/* Market Value */}
                  <div className="flex flex-col items-start w-full ">
                    <span className="text-[14px] ">Market Price</span>
                    <span className="text-[14px]  text-[#45D658]">
                      £
                      {total_market_price
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </div>
                </div>
                {/* Buttons */}
                <div className="ml-auto flex items-end gap-4 bgn-group-con">
                  {/* Market Value */}
                  <BuyNowDialog
                    is_very_special={vintage.is_very_special}
                    number_of_cases={number_of_cases}
                    cancelBtn={handleCancel}
                    color={color}
                    item={item}
                    isDisabled={isDisabled}
                    triggerBtn={handleTriggerBtn}
                    message={message}
                    investment_id={item.investment_id}
                    market_value={String(total_market_price)}
                    lwin11={""}
                    case_size={item.case_size}
                    quantity={number_of_cases}
                  />
                  <AddToCartDialog
                    is_very_special={vintage.is_very_special}
                    number_of_cases={number_of_cases}
                    cancelBtn={handleCancel}
                    color={color}
                    item={item}
                    isDisabled={isDisabled}
                    triggerBtn={handleTriggerBtn}
                    message={message}
                    investment_id={item.investment_id}
                    market_value={String(total_market_price)}
                    lwin11={""}
                    case_size={item.case_size}
                    quantity={number_of_cases}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-2 port-charts-cont w-full h-auto">
        {/* <WineChart item={item} /> */}
        <PortfolioRareWineChart
          region={parent?.fromm}
          parent={parent}
          item={itemChart}
        ></PortfolioRareWineChart>
      </div>
    </div>
  );
}
