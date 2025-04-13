"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { PortfolioType, useUserContext } from "@/app/context/UserContext";
import PortfolioHeader from "@/components/portfolio/portfolio-header";
import LoadingDot from "@/images/loaddot";
import { Button } from "@/components/ui/button";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full gap-2 flex flex-col bg-[#FCFCFC] ">
      {/* <PortfolioHeader /> */}
      
      <div className="flex-1 overflow-auto max-h-[calc(100vh-64px)]">
        {children}
      </div>
    </div>
  );
}
