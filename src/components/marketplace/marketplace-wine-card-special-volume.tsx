"use client";

import {
  Plus,
  Minus,
  Grape,
  MapPinned,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  BigBottlesListType,
  WineDetailsBigBottleType,
  WineParentBigBottleType,
} from "@/app/context/UserContext";
import Image from "next/image";
import { Select, SelectTrigger, SelectValue } from "../ui/select";
import { useUserContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import SpecialVolBuyNowDialog from "./special-vol-buy-now-dialog";
import SpecialVolAddToCartDialog from "./special-vol-add-to-cart-dialog";
import CaseSizeSpecialVolume from "./case-size-special-volume";



interface Visibility {
  label: string;
  value: string;
  hiddenClass: string;
}
interface BottleType {
  value: string;
  id: number;
  label: string;
}

export default function MarketplaceWineCardSpecialVolume({
  item,
  parent,
  vintage,
  vintageAll,
  year,
  bottle,
}: {
  item: BigBottlesListType;
  parent: WineParentBigBottleType;
  vintage: WineDetailsBigBottleType;
  vintageAll: WineDetailsBigBottleType[];
  year: number | null;
  bottle: string[];
}) {
  const { setUserDetails, sessionkey, select_case_size_special } =
    useUserContext();
  const [number_of_cases, setCases] = useState<number>(1);
  const [case_size, setCaseSize] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [bottle_select, setBottleSelect] = useState<BottleType[]>([]);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledBuyNow, setIsDisabledBuyNow] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState(
    "Note: It can take up to 2 weeks for the wine to be allocated to your account"
  );
  const [total_market_price, setTotalMarketPrice] = useState(0);
  const [color, setColor] = useState("text-gray-500");
  const [selectedCaseSize, setSelectedCaseSize] = useState<number>(0);
  const [isHiddenOwnership, setIsHiddenOwnership] = useState("");
  const [isHiddenFromm, setIsHiddenFrom] = useState("");
  const [isHiddenBlend, setIsHiddenBlend] = useState("");
  const [isHiddenGrapes, setIsHiddenGrapes] = useState("");
  const [isHiddenMaturation, setIsHiddenMaturation] = useState("");
  const [isHiddenAlcohol, setIsHiddenAlcohol] = useState("");
  const [wine_price, setWinePrice] = useState("");
  const [isOwnerText, setIsOwnerText] = useState("");
  const router = useRouter();

  setUserDetails({
    select_case_size_special:
      bottle[selectedCaseSize] === "0750"
        ? 1
        : bottle[selectedCaseSize] === "1500"
        ? 2
        : bottle[selectedCaseSize] === "3000"
        ? 4
        : bottle[selectedCaseSize] === "6000"
        ? 8
        : 0,
  });

  console.log("CASE SIZE BOTTLE: ", select_case_size_special);

  const bottle_1 = "1500";
  const bottle_2 = "3000";
  const bottle_3 = "6000";
  // Define bottle options outside of useEffect to avoid recreating them every time
  const bottleOptions1500 = [{ label: "1x150cl", id: 0, value: "1500" }];
  const bottleOptions3000 = [{ label: "1x300cl", id: 1, value: "3000" }];
  const bottleOptions6000 = [{ label: "1x600cl", id: 2, value: "6000" }];

  // Set initial bottle select state
  useEffect(() => {
    if (!bottle) {
      return;
    }

    // Check conditions and update bottle_select accordingly
    if (
      bottle.includes(bottle_1) &&
      bottle.includes(bottle_2) &&
      bottle.includes(bottle_3)
    ) {
      console.log("BOTH");
      // Combine both options when both bottle_1 and bottle_2 are available
      setBottleSelect([
        ...bottleOptions1500,
        ...bottleOptions3000,
        ...bottleOptions6000,
      ]);
    } else if (bottle.includes(bottle_1)) {
      console.log("BOTTLE 1");
      setBottleSelect(bottleOptions1500);
    } else if (bottle.includes(bottle_2)) {
      console.log("BOTTLE 2");
      setBottleSelect(bottleOptions3000);
    } else if (bottle.includes(bottle_3)) {
      console.log("BOTTLE 3");
      setBottleSelect(bottleOptions6000);
    } else {
      console.log("NEITHER");
    }
  }, [bottle]); // Make sure 'bottle' is a dependency

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
    setMessage(
      "Note: It can take up to 2 weeks for the wine to be allocated to your account"
    );
    setIsDisabled(false);
    setIsDisabledBuyNow(false);
    setColor("text-gray-500");
  };

  const handleCancel = () => {
    setIsDisabled(false);
    setMessage(
      "Note: It can take up to 2 weeks for the wine to be allocated to your account"
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
        parent?.maturation &&
          typeof parent.maturation === "string" &&
          parent.maturation.trim() !== ""
          ? ""
          : "hidden"
      );
    };

    hide();
  }, []);

  const bottleSizeMap: { [key: number]: number } = {
    1500: 150,
    3000: 300,
    6000: 600,
  };

  const sortedVintageAll = vintageAll.sort((a: any, b: any) => {
    const sizeA = bottleSizeMap[a.bottle_size] || a.bottle_size;
    const sizeB = bottleSizeMap[b.bottle_size] || b.bottle_size;

    return sizeA - sizeB;
  });

  const marketValue = Number(sortedVintageAll[selectedCaseSize].market_value);
  // const marketValue = sortedVintageAll.map((item) => item.market_value)
  console.log("Selected Case Size: ", select_case_size_special);
  console.log("All: ", sortedVintageAll);

  useEffect(() => {
    setTotalMarketPrice(Math.round(Number(marketValue || 0)));
  }, [select_case_size_special]);
  console.log("MARKET VALUE: ", marketValue);
  console.log("SELECTED CASE SIZE VALUE: ", select_case_size_special);

  return (
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
                src={parent.wine_images[0] || "/fallback-image.jpg"}
                alt="card"
                className="w-auto h-full max-h-[300px]"
              />
            </div>

            {/* <p
              className={`border-y rounded-bl-2xl rounded-br-2xl border-red-200 w-full text-center py-2 absolute bottom-0 text-[12px] text-[red] font-semibold ${isOwnerText}`}
            >
              YOU CANNOT BUY YOUR OWN INVESTMENTS
            </p> */}
          </div>
          {/* <DiscontinueWine
            investment_id={item.investment_id}
            wine_name={displayValue(parent?.name)}
            isOwnerText={isOwnerText}
          ></DiscontinueWine> */}
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
                  <span className="text-[14px] ">Bottle Size</span>
                </div>
                <div className="w-[60%]">
                  <CaseSizeSpecialVolume
                    case_size_title={
                      selectedCaseSize === 0
                        ? "150"
                        : selectedCaseSize === 1
                        ? "300"
                        : "600"
                    }
                    case_size_value={
                      selectedCaseSize === 0
                        ? "1"
                        : selectedCaseSize === 1
                        ? "1"
                        : "1"
                    }
                    disabled={false}
                    case_size={bottle_select}
                    selectedCaseSize={selectedCaseSize}
                    setSelectedCaseSize={(value: number) => {
                      setSelectedCaseSize(value); // Directly set the selected case size
                    }}
                  ></CaseSizeSpecialVolume>
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
                    // disabled={number_of_cases >= quantity}
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
                  <Select value={`${vintage.vintage}`}>
                    <SelectTrigger className={`h-8 opacity-50`} disabled>
                      <SelectValue className="text-center m">
                        {vintage.vintage || ""}
                      </SelectValue>
                    </SelectTrigger>
                  </Select>
                </div>
              </div>
            </div>

            <div className=" h-full flex flex-col justify-between">
              <div className="flex flex-col items-start h-full justify-end mb-5">
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
                <SpecialVolBuyNowDialog
                  number_of_cases={number_of_cases}
                  bottle_size={
                    selectedCaseSize === 0
                      ? "1500"
                      : selectedCaseSize === 1
                      ? "3000"
                      : "6000"
                  }
                  cancelBtn={handleCancel}
                  color={color}
                  item={vintage}
                  isDisabled={isDisabled}
                  triggerBtn={handleTriggerBtn}
                  message={message}
                  investment_id={0}
                  market_value={String(total_market_price)}
                  lwin11={vintage.lwin11}
                  case_size={1}
                  quantity={number_of_cases}
                />
                <SpecialVolAddToCartDialog
                  number_of_cases={number_of_cases}
                  cancelBtn={handleCancel}
                  bottle_size={
                    selectedCaseSize === 0
                      ? "1500"
                      : selectedCaseSize === 1
                      ? "3000"
                      : "6000"
                  }
                  color={color}
                  item={vintage}
                  isDisabled={isDisabled}
                  triggerBtn={handleTriggerBtn}
                  message={message}
                  investment_id={0}
                  market_value={String(total_market_price)}
                  lwin11={vintage.lwin11}
                  case_size={1}
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
