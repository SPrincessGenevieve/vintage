"use client";

import InvestmentLevelSelect from "@/components/marketplace/investment-level-select";
import react, { useEffect, useState } from "react";
import axios from "axios";
import {
  MarketplaceInvest,
  useUserContext,
  WineType,
} from "@/app/context/UserContext";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState("hidden");
  const { is_old_user, setUserDetails } = useUserContext();

  useEffect(() => {
    if (is_old_user === undefined) {
      return;
    }
    if (is_old_user === true) {
      setIsVisible("hidden");
    } else {
      setIsVisible("");
    }
  }, [is_old_user]);

  return (
    <div className="relative h-full gap-2 flex flex-col bg-[#FCFCFC]">
      <div className={`${isVisible}`}>
        <InvestmentLevelSelect></InvestmentLevelSelect>
      </div>
      <div className="flex-1 px-4 overflow-auto max-h-[calc(100vh-64px)] ">
        {children}
      </div>
    </div>
  );
}
