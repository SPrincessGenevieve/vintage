"use client";

import SettingsHeader from "@/components/settings/settings-header";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full flex">
      <div className="w-full h-full bg-[white]">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
