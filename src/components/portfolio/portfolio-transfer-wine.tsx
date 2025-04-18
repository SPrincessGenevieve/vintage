import React, { useEffect, useState } from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import axios from "axios";
import {
  InvestmentListType,
  useUserContext,
  WineParentType,
} from "@/app/context/UserContext";
import SpinnerIcon from "@/images/Spinner";
import Image from "next/image";
import { Label } from "../ui/label";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { InvestmentType } from "@/lib/types";
import { SubAccountData } from "@/lib/data/sub-accounts";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface PortfolioSellDialogProps {
  item: InvestmentType;
  isDisabled: boolean;
  closeDialog: () => void;
  investment_id: number;
}

export default function PortfolioTransferWine({
  item,
  isDisabled,
  closeDialog,
  investment_id,
}: PortfolioSellDialogProps) {
  const {
    sellQuantity,
    email,
    password1,
    sessionkey,
    quantity_to_transfer,
    setUserDetails,
  } = useUserContext();

  const authHeader = "Token " + sessionkey; // Basic Authentication header

  const sub_accounts = SubAccountData;
  const [caseSize, setCaseSize] = useState("1x75");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAccount, setSelectedAccount] = useState<number>();
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successSubMessage, setSuccessSubMessage] = useState("");
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const sub_account_owner = item.sub_account;

  const fetchSubAccountData = async () => {
    console.log("CLICKED");
  };

  const all_account = [
    {
      id: null,
      first_name: "Main",
      last_name: "Account",
      birth_date: "",
      created_at: "",
      user: "",
    },
    ...sub_accounts,
  ];

  const sub_account_active = all_account[selectedAccount || 0]
    ? all_account[selectedAccount || 0].first_name +
      " " +
      all_account[selectedAccount || 0].last_name
    : "No sub-account selected";

  let sub_account_list = all_account.length;

  useState(() => {
    if (sub_account_list === 0) {
      setMessage("No sub-accounts");
    } else {
      setMessage("No account selected");
    }
  });

  const handleSubAccountTransfer = async (index: number) => {
    console.log("Investment ID: ", investment_id);
    const sub_account_id = selectedAccount !== 0 ? all_account[index].id : 0;
    setLoading(true);
    setTimeout(() => {
      setOpen(true);
      setLoading(false);
      setSuccessMessage("Wine transfered successfully");
      setSuccessSubMessage(`was transfered to ${sub_account_active}`);
      setTimeout(() => {
        location.reload();
      }, 2000);
    }, 1000);
  };

  const bottleSize = item.bottle_size;

  return (
    <>
      {open ? (
        <div>
          <div className="border rounded-2xl mb-5">
            <div className="border rounded-2xl p-2">
              <div className="relative flex flex-col h-[180px]">
                <div className="flex justify-center p-2 absolute rounded-full w-full items-center">
                  <Image
                    width={300}
                    height={300}
                    src={
                      item.wine_parent
                        ? item.wine_parent.images[0]
                        : item.basket_details?.image || "fallback.png"
                    }
                    alt="card"
                    className="z-20 w-auto max-h-[150px]"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-[12px] font-semibold">
                  {item.wine_vintage_details
                    ? item.wine_vintage_details.name
                    : item.basket_details?.name}
                </p>
                <div className="text-gray-400 flex justify-between">
                  <p className="text-[10px] font-light">Vintage</p>
                  <p className="text-[10px] font-light">{item.wine_vintage}</p>
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
          <p className="font-light py-2">{successMessage}</p>
          <Label className="font-light">
            {item.wine_vintage_details
              ? item.wine_vintage_details.name
              : item.basket_details?.name}{" "}
            {successSubMessage}
          </Label>
        </div>
      ) : (
        <>
          <div>
            <div className="border rounded-2xl mb-5">
              <div className="border rounded-2xl p-2">
                <div className="relative flex flex-col h-[180px]">
                  <div className="flex justify-center p-2 absolute rounded-full w-full items-center">
                    <Image
                      width={300}
                      height={300}
                      src={
                        item.wine_parent
                          ? item.wine_parent.images[0]
                          : item.basket_details?.image || "fallback.png"
                      }
                      alt="card"
                      className="z-20 w-auto max-h-[150px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-[12px] font-semibold">
                    {item.wine_vintage_details
                      ? item.wine_vintage_details.name
                      : item.basket_details?.name}
                  </p>
                  <div className="text-gray-400 flex justify-between">
                    <p className="text-[10px] font-light">Vintage</p>
                    <p className="text-[10px] font-light">
                      {item.wine_vintage}
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
                  <div className="text-gray-400 flex justify-between">
                    <p className="text-[10px] font-light">Account Holder</p>
                    <p className="text-[10px] font-light">
                      {sub_account_owner === null
                        ? "Main Account"
                        : sub_account_owner}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <>
              <Label className="font-light py-2">
                <p>Allocate to which sub-account?</p>
              </Label>
              <Menubar className="w-full p-0 mt-5">
                <MenubarMenu>
                  <MenubarTrigger
                    onClick={fetchSubAccountData}
                    className="w-full p-0 flex flex-col gap-2 bg-white"
                    disabled={sub_account_list === 0}
                  >
                    <div className="w-full border rounded-lg p-2 flex justify-between items-center bg-white">
                      <p className="text-[12px] bg-white font-light">
                        {selectedAccount !== null &&
                        selectedAccount !== undefined &&
                        all_account[selectedAccount]
                          ? `${all_account[selectedAccount].first_name} ${all_account[selectedAccount].last_name}`
                          : message}
                      </p>
                      <ChevronDown size={15} />
                    </div>
                  </MenubarTrigger>

                  <MenubarContent className="w-full">
                    {all_account.map((item, index) => (
                      <MenubarCheckboxItem
                        className="w-full"
                        key={index}
                        checked={index === selectedAccount}
                        onClick={() => setSelectedAccount(index)}
                      >
                        {item.first_name} {item.last_name}
                      </MenubarCheckboxItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <div className="flex justify-center gap-10 mt-6">
                <Button
                  onClick={closeDialog}
                  className="w-[150px] rounded-full border"
                  variant="ghost"
                >
                  Cancel
                </Button>

                <Button
                  disabled={selectedAccount === undefined && true}
                  className="w-[150px] rounded-full"
                  onClick={() => {
                    handleSubAccountTransfer(selectedAccount || 0);
                  }}
                >
                  {loading ? (
                    <>
                      <div>
                        <SpinnerIcon strokeColor="white"></SpinnerIcon>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  Proceed
                </Button>
              </div>
            </>
          </div>
        </>
      )}
    </>
  );
}
