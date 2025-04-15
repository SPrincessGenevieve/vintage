"use client";

import {
  Plus,
  Minus,
  EllipsisVerticalIcon,
  Grape,
  MapPinned,
  AlertCircleIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import SellDialog from "./sell-to-cart-dialog";
import BuyDialog from "./buy-now-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import CaseSize from "../marketplace/case-size";
import {
  PortfolioType,
  VintageWineType,
  WineParentType,
} from "@/app/context/UserContext";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import PortfolioGiftSingleDialog from "./portfolio-gift-single-dialog";
import PortfolioRequestSingleDialog from "./portfolio-request-single-dialog";

interface Visibility {
  label: string;
  value: string;
  hiddenClass: string;
}

export default function PortfolioWineCardBasket({
  item,
  parent,
  vintage,
  year,
}: {
  item: PortfolioType;
  parent: WineParentType;
  vintage: VintageWineType;
  year: number | null;
}) {
  const [number_of_cases, setCases] = useState<number>(1);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const actions = ["Gift", "Delivery Request"];
  const [isTruncated, setIsTruncated] = useState(true);
  const [selectedCaseSize, setSelectedCaseSize] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isHidden, setIsHidden] = useState("");
  const [isHiddenOwnership, setIsHiddenOwnership] = useState("");
  const [isHiddenFromm, setIsHiddenFrom] = useState("");
  const [isHiddenBlend, setIsHiddenBlend] = useState("");
  const [isHiddenGrapes, setIsHiddenGrapes] = useState("");
  const [isHiddenMaturation, setIsHiddenMaturation] = useState("");
  const [isHiddenAlcohol, setIsHiddenAlcohol] = useState("");

  const displayValue = (value: string | undefined) => {
    return value === "NA" ? "" : value || "";
  };

  const displayValueNote = (value: string | undefined) => {
    return value === "NA" ? "No notes" : value || "";
  };

  // const truncatedWinery =
  // parent?.winery && parent.winery.length > 600
  //   ? parent.winery.slice(0, 600) + "..."
  //   : parent?.winery;

  const handleReadMoreClick = () => {
    setIsTruncated(true);
  };

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    setDialogOpen(true);
  };

  const HiddenInfo = ({ label, value, hiddenClass }: Visibility) => (
    <span
      className={`bg-[#2A2C2D] rounded-2xl py-1 text-white text-center text-[12px] font-light w-auto px-2 ${hiddenClass}`}
    >
      {label} {displayValue(value)}
    </span>
  );

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

    const hide = () => {
      setIsHiddenOwnership(item.wine_parent.ownership === "NA" ? "hidden" : "");
      setIsHiddenFrom(item.wine_parent.fromm === "NA" ? "hidden" : "");
      setIsHiddenBlend(item.wine_parent.blend === "NA" ? "hidden" : "");
      setIsHiddenAlcohol(
        item.wine_parent.alcohol_abv === "0.00%" ? "hidden" : ""
      );
      setIsHiddenGrapes(item.wine_parent.grapes === "NA" ? "hidden" : "");
      setIsHiddenMaturation(
        !item.wine_parent.maturation ||
          item.wine_parent.maturation === "NA" ||
          item.wine_parent.maturation.trim() === ""
          ? "hidden"
          : ""
      );
    };

    btnDisabled();
    hide();
  }, []);

  const renderDialogContent = () => {
    switch (selectedAction) {
      case "Gift":
        return (
          <PortfolioGiftSingleDialog
            closeDialog={() => setDialogOpen(false)}
            isDisabled={false}
            parent={parent}
            item={item}
          />
        );
      case "Delivery Request":
        return <PortfolioRequestSingleDialog parent={parent} item={item} />;
      default:
        return null;
    }
  };

  const renderDialogBtn = () => {
    switch (selectedAction) {
      case "Sell":
        return (
          <div className="flex justify-around">
            <Button className="rounded-full m w-32 bg-transparent border text-gray-400 hover:text-white">
              Cancel
            </Button>
            <Button className="rounded-full m w-32 bg-[#8D1B22]">Sell</Button>
          </div>
        ); // Pass the item data here
      // case "Gift":
      //   return (
      //     <div className="flex justify-around">
      //       <Button className="rounded-full m w-32 bg-transparent border text-gray-400 hover:text-white">
      //         Cancel
      //       </Button>
      //       <Button className="rounded-full m w-32 bg-[#C4AD93]">Gift</Button>
      //     </div>
      //   );
      case "Delivery Request":
        return (
          <div className="flex justify-around gap-4">
            <Button
              className="rounded-full m w-40 bg-transparent border text-gray-400 hover:text-white
              "
            >
              Cancel
            </Button>
            <Button className="rounded-full m w-40">Deliver</Button>
          </div>
        );
      default:
        return null;
    }
  };

  // Convert market_value to a number and ensure it's a whole number
  const market_value = Math.floor(Number(item.market_value) || 0);

  // Format the number with commas
  const formattedMarketValue = market_value.toLocaleString();

  // console.log("PARENT", parent)
  // console.log("VINTAGE", vintage)
  // console.log("ITEM", item)

  const bottle_size =
    vintage.bottle_size === "0750"
      ? "75cl"
      : vintage.bottle_size === "1500"
      ? "150cl"
      : vintage.bottle_size === "3000"
      ? "300cl"
      : "";

  const cases_list = vintage.available_case_size.map((item) => item);

  return (
    <div className="h-full  bg-white w-full p-3 border rounded-2xl flex port-info-cont glass-slide-cont">
      <div className="flex p-0 m-0 w-[50vh]">
        <div className="flex w-full h-[40vh]">
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
          </div>
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
              label="Blend: "
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
              <DialogContent className="w-[90%] max-h-[90%] h-auto overflow-y-auto flex flex-col">
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
                  <CaseSize
                    bottle_size={bottle_size}
                    case_size_title={
                      vintage.bottle_size === "1500"
                        ? "150"
                        : vintage.bottle_size === "0750"
                        ? "75"
                        : "300"
                    }
                    disabled={true}
                    case_size={cases_list}
                    selectedCaseSize={item.case_size}
                    setSelectedCaseSize={(value: number) => {
                      if (item.case_size !== null) {
                        setSelectedCaseSize(item.case_size);
                      }
                    }}
                  ></CaseSize>
                </div>
              </div>
              <div className="flex port-flex items-center gap-2">
                <div className="w-[170px]">
                  <span className="text-[14px]"># of Cases</span>
                </div>
                <HoverCard>
                  <HoverCardTrigger className="flex w-full h-full items-center justify-center">
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
                        disabled={number_of_cases >= item.quantity}
                      >
                        <Plus size={20} className="text-green-700" />
                      </Button>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex items-center w-auto gap-2">
                    <AlertCircleIcon color="#ff8800" size={20} />
                    <p className="text-[12px]">Max quantity: {item.quantity}</p>
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
                {/* Market Value */}
                <div className="flex flex-col items-start w-full ">
                  <span className="text-[14px] ">Market Price</span>
                  <span className="text-[14px]  text-[#45D658]">
                    £{formattedMarketValue}
                  </span>
                </div>
              </div>
              {/* Buttons */}
              <div className="ml-auto flex items-end gap-4 bgn-group-con">
                {/* Market Value */}
                <div className="flex flex-col">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="flex m justify-center items-center">
                        More
                        <EllipsisVerticalIcon className="ellipsis"></EllipsisVerticalIcon>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-2xl">
                      {actions.map((action) => (
                        <Button
                          disabled={isDisabled}
                          key={action}
                          className="w-full m rounded-none flex justify-start"
                          variant="ghost"
                          onClick={() => handleActionClick(action)}
                        >
                          {action}
                        </Button>
                      ))}
                    </DropdownMenuContent>

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger />
                      <DialogContent className="w-auto">
                        <DialogTitle></DialogTitle>
                        <DialogHeader>
                          <h2></h2>
                        </DialogHeader>
                        {renderDialogContent()}
                        <DialogClose asChild>{renderDialogBtn()}</DialogClose>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenu>
                </div>
                <BuyDialog parent={parent} item={item} />
                <SellDialog
                  quantity={number_of_cases}
                  lwin11={vintage.lwin11}
                  market_value={formattedMarketValue || "0"}
                  price={item.market_value || 0}
                  item={item}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
