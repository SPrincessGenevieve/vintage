"use client";
import withAuth from "@/app/withAuth";
import OrderHeader from "@/components/orders/order-header";
import OrderTable from "@/components/orders/order-table";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Orders() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex h-full w-full pb-[100px] bg-white">
        <OrderTable ></OrderTable>
      </div>
    </div>
  );
}
export default withAuth(Orders);
