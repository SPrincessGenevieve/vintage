"use client";

import {
  CircleAlert,
  Plus,
  Minus,
  Wine,
  MapPinned,
  Grape,
  Star,
} from "lucide-react";
import Start from "@/images/star.gif";
import { useEffect, useState } from "react";
import AddToCartDialog from "./add-to-cart-dialog";
import BuyNowDialog from "./buy-now-dialog";
import ImageSlider from "../image-slider";
import { Button } from "../ui/button";
import CaseSize from "./case-size";
import YearSelection from "./year-selection";
import {
  MarketplaceInvest,
  VintageWineType,
  WineParentType,
} from "@/app/context/UserContext";
import Image from "next/image";
import { useUserContext } from "@/app/context/UserContext";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Visibility {
  label: string;
  value: string;
  hiddenClass: string;
}

export default function MarketplaceWineCardRegion({
  item,
  vintage,
  year,
  parent,
  regionFilter,
  is_special,
}: {
  item: WineParentType;
  vintage: VintageWineType;
  parent: MarketplaceInvest;
  year: number[];
  regionFilter: string;
  is_special: { vintage: number; is_special: boolean }[];
}) {
  const [number_of_cases, setCases] = useState<number>(1);
  const actions = ["Gift", "Delivery Request"];
  const [selectedCaseSize, setSelectedCaseSize] = useState<number>(
    regionFilter === "Italy"
      ? 12
      : regionFilter === "Bordeaux"
      ? 12
      : regionFilter === "Champagne"
      ? 6
      : regionFilter === "Burgundy"
      ? 1
      : regionFilter === "California"
      ? 6
      : 1
  );

  const bottle_size =
    vintage.bottle_size === "0750"
      ? "75cl"
      : vintage.bottle_size === "1500"
      ? "150cl"
      : vintage.bottle_size === "3000"
      ? "300cl"
      : "";

  const cases_list = vintage.available_case_size.map((item) => item);

  const { setUserDetails, yearSelect, select_case_size_region } =
    useUserContext();
  const [selectedVintage, setSelectedVintage] = useState<number>(
    year[yearSelect || 0]
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState(
    "Note: It can take up to 2 weeks for the wine to be allocated to your account"
  );
  const [color, setColor] = useState("text-gray-500");
  const [isHiddenOwnership, setIsHiddenOwnership] = useState("");
  const [isHiddenFromm, setIsHiddenFrom] = useState("");
  const [isHiddenBlend, setIsHiddenBlend] = useState("");
  const [isHiddenGrapes, setIsHiddenGrapes] = useState("");
  const [isHiddenMaturation, setIsHiddenMaturation] = useState("");
  const [isHiddenAlcohol, setIsHiddenAlcohol] = useState("");
  const [wine_price, setWinePrice] = useState("");

  setUserDetails({
    select_case_size_region: selectedCaseSize,
  });

  useEffect(() => {
    // Only set selectedVintage on the first mount if there's no value
    if (selectedVintage === undefined && year.length > 0) {
      setSelectedVintage(year[0]);
    }

    // Update wine price based on vintage values
    if (vintage.market_value === "0.00") {
      setWinePrice(String(vintage.liv_ex_value));
    } else {
      setWinePrice(vintage.market_value);
    }
  }, [year, vintage]); // removed selectedVintage from the dependencies

  useEffect(() => {
    if (regionFilter === "Italy") {
      setSelectedCaseSize(12);
    } else if (regionFilter === "Bordeaux") {
      setSelectedCaseSize(12);
    } else if (regionFilter === "Champagne") {
      setSelectedCaseSize(6);
    } else if (regionFilter === "Burgundy") {
      setSelectedCaseSize(1);
    } else if (regionFilter === "California") {
      setSelectedCaseSize(6);
    }
  }, [regionFilter]);

  const HiddenInfo = ({ label, value, hiddenClass }: Visibility) => (
    <span
      className={`bg-[#2A2C2D] rounded-2xl py-1 text-white text-center text-[12px] font-light w-auto px-2 ${hiddenClass}`}
    >
      {label} {displayValue(value)}
    </span>
  );

  // Map the years into the expected format of [{ vintage: number }]
  const vintageYears = year.map((yearNumber) => ({ vintage: yearNumber }));

  const displayValue = (value: string | undefined) => {
    return value === "NA" ? "" : value || "";
  };

  const displayValueNote = (value: string | undefined) => {
    return value === "NA" ? "No notes" : value || "";
  };

  const market_value =
    vintage && vintage.market_value ? vintage.market_value : "0";

  // Check for zero-like values in market_value and fallback to liv_ex_value if needed
  const formattedMarketValue =
    market_value === "0" || market_value === "0.00"
      ? vintage &&
        vintage.liv_ex_value !== null &&
        vintage.liv_ex_value !== undefined
        ? vintage.liv_ex_value.toLocaleString()
        : "Price not available"
      : Math.floor(Number(market_value)).toLocaleString();

  const handleTriggerBtn = () => {};

  const handleCancel = () => {
    setIsDisabled(false);
    setMessage(
      "Note: It can take up to 2 weeks for the wine to be allocated to your account"
    );
    setColor("text-gray-500");
  };

  useEffect(() => {
    const hide = () => {
      setIsHiddenOwnership(item.ownership === "NA" ? "hidden" : "");
      setIsHiddenFrom(item.fromm === "NA" ? "hidden" : "");
      setIsHiddenBlend(item.blend === "NA" ? "hidden" : "");
      setIsHiddenAlcohol(item.alcohol_abv === "0.00%" ? "hidden" : "");
      setIsHiddenGrapes(item.grapes === "NA" ? "hidden" : "");
      setIsHiddenMaturation(
        !item.maturation ||
          item.maturation === "NA" ||
          item.maturation.trim() === ""
          ? "hidden"
          : ""
      );
    };

    hide();
  }, []);

  useEffect(() => {
    if (vintage.is_very_special === true) {
      setIsDisabled(true);
    }
  }, [selectedVintage]);

  const total_market_price = Math.round(
    (Number(wine_price || 0) / Number(vintage.processed_case || 1)) *
      (Number(selectedCaseSize || 0) * Number(number_of_cases || 0))
  );

  return (
    <div className="h-auto  bg-white w-full p-3 border rounded-2xl flex port-info-cont glass-slide-cont">
      {/* <ImageSlider images={images}></ImageSlider> */}
      <div className="flex p-0 m-0 w-[50vh]">
        <div className="flex w-full h-[40vh]">
          {item.wine_images &&
          Array.isArray(item.wine_images) &&
          item.wine_images.length > 0 ? (
            <div className="relative border-gray-200 flex h-auto w-full border rounded-2xl items-center justify-center">
              <div className="absolute top-0 left-0 bg-[#C4AD93] rounded-tl-2xl w-[150px] h-[35px]">
                <p className="w-full h-full text-[12px] text-white text-center flex items-center justify-center">
                  Critic Score: {vintage?.rp_score || 0}
                </p>
              </div>
              {vintage.is_very_special === true && (
                <div className="w-[50px] h-[50px] absolute right-0 top-0 rounded-2xl flex justify-center items-center">
                  <Image
                    width={400}
                    height={400}
                    className="w-[40px] h-[40px]"
                    src={Start}
                    alt="star"
                  ></Image>
                </div>
              )}
              <div className="flex w-full h-full items-center justify-center p-10">
                <Image
                  width={400}
                  height={400}
                  src={item.wine_images[0]}
                  alt="card"
                  className="w-auto h-full max-h-[300px]"
                />
              </div>
            </div>
          ) : (
            // Fallback if wine_images is not an array or is empty
            <span>
              <Wine></Wine>
            </span>
          )}
        </div>
      </div>

      <div className="flex w-full h-auto relative items-center flex-col px-5">
        <div className="flex items-center w-full">
          {/* Badges */}
          <div className="flex gap-1 flex-wrap">
            <HiddenInfo
              label=""
              value={displayValue(item?.fromm)}
              hiddenClass={isHiddenFromm}
            />

            <HiddenInfo
              label="Alcohol ABV: "
              value={displayValue(item?.alcohol_abv)}
              hiddenClass={isHiddenAlcohol}
            />
            <HiddenInfo
              label="Blend: "
              value={displayValue(item?.blend)}
              hiddenClass={isHiddenBlend}
            />
            <HiddenInfo
              label="Grapes: "
              value={displayValue(item?.grapes)}
              hiddenClass={isHiddenGrapes}
            />
            <HiddenInfo
              label="Maturation: "
              value={displayValue(item?.maturation)}
              hiddenClass={isHiddenMaturation}
            />
            <HiddenInfo
              label="Ownership: "
              value={displayValue(item?.ownership)}
              hiddenClass={isHiddenOwnership}
            />
          </div>
        </div>

        <div className="mt-6 port-desc w-full">
          <h1 className="text-[16px] font-semibold">
            {item?.name || "Unknown Wine"}
            {vintage?.is_user_investment}
          </h1>
          <div>
            <p className="text-justify text-muted-foreground text-[14px] ">
              {displayValue(item?.winery) || "None"} <br />
              <br />{" "}
              <span className="text-[12px] italic">
                Tasting Note: {displayValueNote(vintage.rp_tasting_notes)}
              </span>
              <br></br>
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
                    {displayValue(item.region) || "No further details..."}
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
              <DialogContent className="w-[90%] max-h-[90%] h-auto  overflow-y-auto flex flex-col">
                <DialogTitle>Grapes</DialogTitle>
                <div className="h-full">
                  <p className="text-[14px] text-justify">
                    {displayValue(item.grape_variety) ||
                      "No further details..."}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="w-full flex port-top-cont mt-[3%] h-full ">
          <div className="num-group-port w-[100%] flex justify-between">
            <div className="w-[220px] flex flex-col justify-end">
              <div className="flex gap-2 justify-between mb-2">
                <div className="w-[100px] flex items-center">
                  <span className="text-[14px] ">Case Size</span>
                </div>
                <div className="w-[60%]">
                  <CaseSize
                    bottle_size={bottle_size}
                    case_size_title={bottle_size}
                    disabled={false}
                    case_size={cases_list}
                    selectedCaseSize={selectedCaseSize}
                    setSelectedCaseSize={(value: number) => {
                      setSelectedCaseSize(value); // Directly set the selected case size
                    }}
                  ></CaseSize>
                </div>
              </div>
              <div className="flex port-flex items-center gap-2">
                <div className="w-[100px]">
                  <span className="text-[14px]  w-[100px]"># of Cases</span>
                </div>

                <div className="border rounded-2xl flex h-8 w-[120px] gap-2 items-center justify-center">
                  <Button
                    variant="ghost"
                    className=" p-0 ml-5"
                    onClick={() =>
                      setCases((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                  >
                    <Minus size={20} className="text-red-700" />
                  </Button>
                  <span className="px-4">{number_of_cases}</span>
                  <Button
                    variant="ghost"
                    className="p-0 mr-5 "
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
                  <YearSelection
                    isSpecial={is_special}
                    vintageYear={vintageYears}
                    selectedVintage={selectedVintage}
                    setSelectedVintage={(value: number) => {
                      const selectedIndex = vintageYears.findIndex(
                        (year) => year.vintage === value // Compare vintage instead of value
                      );

                      setSelectedVintage(value);
                      setUserDetails({
                        yearSelect: selectedIndex,
                      });
                    }}
                  ></YearSelection>
                </div>
              </div>
            </div>

            <div className=" h-full flex flex-col justify-between">
              <div className="flex flex-col items-start h-full justify-end mb-5">
                {/* Market Value */}
                <div className="flex flex-col items-start w-full">
                  <span className="text-[14px]">Market Price</span>
                  <span className="text-[14px] text-[#45D658]">
                    £{" "}
                    {String(total_market_price).replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
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
                  item={parent}
                  isDisabled={isDisabled}
                  triggerBtn={handleTriggerBtn}
                  message={message}
                  investment_id={0}
                  market_value={String(total_market_price)}
                  lwin11={displayValue(vintage.lwin11)}
                  case_size={selectedCaseSize}
                  quantity={number_of_cases}
                />
                <AddToCartDialog
                  is_very_special={vintage.is_very_special}
                  item={parent}
                  cancelBtn={handleCancel}
                  number_of_cases={number_of_cases}
                  color={color}
                  isDisabled={isDisabled}
                  triggerBtn={handleTriggerBtn}
                  message={message}
                  investment_id={0}
                  market_value={String(total_market_price) || "0"}
                  lwin11={displayValue(vintage.lwin11)}
                  case_size={selectedCaseSize}
                  quantity={number_of_cases}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
