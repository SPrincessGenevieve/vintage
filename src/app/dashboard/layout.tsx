"use client";
import Header from "@/components/layout/header";
import Sidenav from "@/components/layout/sidenav";
import Footer from "@/components/layout/footer";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import "./../globals.css";
import SubHeader from "@/components/layout/sub-header";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { LinkApi } from "@/lib/utils";
import Bot from "@/components/bot";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); 

  const isOrdersPage =
    pathname === "/dashboard/orders" || "/dashboard/checkout";

  const botHide =
    pathname === "/dashboard/orders" ||
    pathname === "/dashboard/orders/checkout";

  const hideSubHeader =
    /^\/dashboard\/marketplace\/\d+/.test(pathname) ||
    /^\/dashboard\/portfolio\/\d+/.test(pathname) ||
    /^\/dashboard\/marketplace\/rare\/\d+/.test(pathname) ||
    /^\/dashboard\/marketplace\/vintex\/\d+/.test(pathname) ||
    /^\/dashboard\/marketplace\/special-volume\/\d+/.test(pathname) ||
    /^\/dashboard\/insights\/[a-zA-Z0-9-]+/.test(pathname) ||
    /^\/dashboard\/marketplace\/special-bundles\/\d+/.test(pathname) ||
    /^\/dashboard\/portfolio\/bundle\/\d+/.test(pathname) ||
    /^\/dashboard\/marketplace\/rare\/bundle\/\d+/.test(pathname) ||
    /^\/dashboard\/settings\/billing\/link-account\/[a-zA-Z0-9-]+/.test(
      pathname
    ) || // Update this line
    /^\/dashboard\/marketplace\/assortments\/\d+/.test(pathname) ||
    /^\/dashboard\/marketplace\/region\/\d+/.test(pathname) ||
    pathname === "/dashboard/settings" ||
    pathname === "/dashboard/password" ||
    pathname === "/dashboard/activity" ||
    pathname === "/dashboard/sub-accounts" ||
    pathname === "/dashboard/settings/password" ||
    pathname === "/dashboard/settings/general" ||
    pathname === "/dashboard/settings/activity" ||
    pathname === "/dashboard/settings/sub-accounts" ||
    pathname === "/dashboard/settings/sub-billing" ||
    pathname === "/dashboard/settings/billing" ||
    pathname === "/dashboard/settings/billing/link-account";

  return (
    <div className="flex h-screen flex-col bg-[#F9FAFB]">
      <div className={`${botHide ? "hidden" : ""}`}>
        <Bot />
      </div>

      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap"
        rel="stylesheet"
      />
      <Header />
      <div className="flex-1 flex w-full h-[90%] relative dash-main-cont">
        <div className="flex h-full min-w-[190px] side-nav-cont">
          <Sidenav />
        </div>
        <div className="flex flex-col w-full">
          <SubHeader hidden={hideSubHeader ? true : false}></SubHeader>
          <div className="flex flex-grow overflow-y-auto border-l border-gray-200">
            <div className="w-full relative">{children}</div>
          </div>
        </div>
      </div>
      {/* Footer - only show if not on /dashboard/orders */}
      {!isOrdersPage && <Footer />}
    </div>
  );
}
