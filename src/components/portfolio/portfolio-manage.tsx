import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import PortfolioSellDialog from "./portfolio-sell-dialog";
import PortfolioGiftDialog from "./portfolio-gift-dialog";
import PortfolioRequestDialog from "./portfolio-request-dialog";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  PortfolioType,
  VintageWineType,
  WineParentType,
} from "@/app/context/UserContext";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import DiscontinueWine from "../marketplace/discontinue-wine";
import PortfolioTransferWine from "./portfolio-transfer-wine";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { InvestmentListType } from "@/app/context/UserContext";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import { InvestmentType } from "@/lib/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface PortfolioManageProps {
  triggerContent: React.ReactNode;
  item: InvestmentType; // Add item as a prop to pass item data
  investment_id: number;
  onClick?: () => void;
}

export default function PortfolioManage({
  triggerContent,
  item,
  investment_id,
  onClick,
}: PortfolioManageProps) {
  const { sessionkey, setUserDetails } = useUserContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledGift, setIsDisabledGift] = useState(true);
  const [isSuccessDialog, setIsSuccessDialog] = useState(false);
  const [sellMessage, setSellMessage] = useState("");
  const [removeWine, setRemoveWine] = useState(false);
  const authHeader = "Token " + sessionkey; // Basic Authentication header
  const actions = [
    "Sell",
    "Gift",
    "Delivery Request",
    "Assign to a Sub-account",
  ];

  const [loader, setLoader] = useState("hidden"); // Loading state added

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    setDialogOpen(true);
  };

  const fetchSubAccountData = async () => {
    console.log("CLICKED");
    try {
      const response = await axios.get(`${apiUrl}/user/sub-accounts/`, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      });
      const sub_user_data = response.data;
      setUserDetails({
        sub_accounts: sub_user_data,
      });
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  useEffect(() => {
    const btnStatus = () => {
      if (item.investment_status === "owned") {
        setIsDisabled(false);
      } else if (
        item.investment_status === "for_sale" ||
        item.investment_status === "gift" ||
        item.investment_status === "pending" ||
        item.investment_status === "idle"
      ) {
        setIsDisabled(true);
        setIsDisabledGift(true);
      }
      if (item.quantity <= 0) {
        setIsDisabled(true);
      }

      if (item.quantity_to_sell > 0) {
        setRemoveWine(true);
      } else {
        setRemoveWine(false);
      }

      if (item.investment_status !== "owned") {
        setIsDisabledGift(true);
      } else {
        if (item.quantity_to_transfer > 0 && item.quantity === 0) {
          setIsDisabledGift(false);
        } else {
          if (item.quantity_to_transfer === 0 && item.quantity > 0) {
            setIsDisabledGift(false);
          } else {
            setIsDisabledGift(true);
          }
        }
      }
    };

    btnStatus();
  }, [item.quantity_to_sell]);

  const renderDialogContent = () => {
    switch (selectedAction) {
      case "Sell":
        return (
          <PortfolioSellDialog
            closeDialog={() => setDialogOpen(false)}
            item={item}
          />
        ); // Pass the item data here
      case "Gift":
        return (
          <PortfolioGiftDialog
            closeDialog={() => setDialogOpen(false)}
            isDisabled={isDisabled}
            item={item}
          />
        );
      case "Assign to a Sub-account":
        return (
          <PortfolioTransferWine
            investment_id={investment_id}
            closeDialog={() => setDialogOpen(false)}
            isDisabled={isDisabled}
            item={item}
          />
        );
      case "Delivery Request":
        return <PortfolioRequestDialog item={item} />;
      default:
        return null;
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
              src={
                item.wine_parent
                  ? item.wine_parent.images[0]
                  : item.basket_details?.image || "fallback.png"
              }
              alt={""}
            ></Image>
            <p className="w-full text-left font-light">{item.case_size}X75</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle color="#23dd23" size={20}></CheckCircle>
            <p className="text-[12px]">
              Successfully sell wine{" "}
              {item.wine_vintage_details
                ? item.wine_vintage_details.name
                : item.basket_details?.name}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderDialogBtn = () => {
    switch (selectedAction) {
      default:
        return null;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={onClick} asChild>
        <span>{triggerContent}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white gen-text-sm p-1 w-50 shadow-xl rounded-xl border border-neutral-300"
        align="end"
      >
        {actions.map((action) => (
          <Button
            disabled={action === "Gift" ? isDisabledGift : isDisabled}
            key={action}
            className="w-full gen-text-sm rounded-full flex justify-start text-[12px]"
            variant="ghost"
            onClick={() => handleActionClick(action)}
          >
            {action}
          </Button>
        ))}
        {removeWine ? (
          <>
            <DiscontinueWine
              investment_id={item.id}
              isOwnerText={""}
              wine_name={
                item.wine_vintage_details
                  ? item.wine_vintage_details.name
                  : item.basket_details?.name || ""
              }
            ></DiscontinueWine>
          </>
        ) : (
          <></>
        )}
      </DropdownMenuContent>
      {successDialog(isSuccessDialog)}

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger />
        <DialogContent className="w-auto max-h-[90%] overflow-y-auto">
          <DialogTitle></DialogTitle>
          <DialogHeader>
            <h2></h2>
          </DialogHeader>
          {renderDialogContent()}
          <DialogClose asChild>{renderDialogBtn()}</DialogClose>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
}
