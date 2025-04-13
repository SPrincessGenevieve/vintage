"use client";
import React, { useEffect } from "react";
import { useUserContext } from "@/app/context/UserContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CheckoutCalculation() {
  const {
    calculation_list,
    is_old_user,
    current_investment,
    level_info,
    sessionkey,
    setUserDetails,
  } = useUserContext();

  useEffect(() => {
    const fetchUserData = async () => {
      const authHeader = "Token " + sessionkey;
      try {
        const response = await axios.get(`${apiUrl}/user/`, {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });
        const userData = response.data.data;
        setUserDetails({
          current_investment: userData.current_investment,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [sessionkey]);

  //   CALCULATION VARIABLE
  const current_investments = current_investment;
  const wine_total = calculation_list.reduce(
    (acc, item) => acc + Number(item.price),
    0
  );
  const incoming_payment = wine_total + current_investments;
  const level_info_fee = level_info === null ? 1.25 : level_info.fee / 100;
  const current_rate =
    current_investments < 25000
      ? 0.15
      : current_investments < 50000
      ? 0.125
      : 0.1;

  const incoming_rate =
    incoming_payment < 25000 ? 0.15 : incoming_payment < 50000 ? 0.125 : 0.1;

  const active_rate =
    incoming_rate === current_rate ? current_rate : incoming_rate;
  const percent =
    active_rate === 0.15 ? "15%" : active_rate === 0.125 ? "12.5%" : "10%";

  const fee_discount =
    is_old_user === true
      ? incoming_rate === current_rate
        ? 0
        : current_investment * current_rate
      : 0;

  const fee_amount =
    incoming_rate === current_rate
      ? wine_total * current_rate
      : incoming_payment * incoming_rate;

  const fee_due = fee_amount - fee_discount;

  const request_photo_fee = calculation_list.map((item) =>
    item.request_photo === undefined || item.request_photo === false ? 0 : 16.49
  );

  const request_photo_total = request_photo_fee.reduce<number>(
    (acc, item) => acc + item,
    0
  );

  const total_due_today =
    is_old_user === true ? wine_total + fee_due : wine_total;
  const monthly_fee = is_old_user === true ? 0 : wine_total * level_info_fee;

  const table_data = [
    {
      title: "Wine Total",
      value: `£${Number(wine_total.toFixed(2)).toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      title: "Request Photo",
      value: `£${Number(request_photo_total.toFixed(2)).toLocaleString(
        "en-GB",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`,
    },
    { title: "Fee", value: percent },
    {
      title: "Fee Amount",
      value: `£${Number(fee_amount.toFixed(2)).toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      title: "Monthly Fees",
      value: `£${Number(monthly_fee.toFixed(2)).toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      title: "Fee Discount",
      value: `£${Number(fee_discount.toFixed(2)).toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },

    {
      title: "Fee Due",
      value: `£${Number(fee_due.toFixed(2)).toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      title: "Total Due Today",
      value: `£${Number(
        (total_due_today + request_photo_total).toFixed(2)
      ).toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      title: "Current Investment",
      value: `£${Number(current_investment.toFixed(2)).toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      title: "New Investment",
      value: `£${Number(incoming_payment.toFixed(2)).toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
  ];

  return (
    <Table className="w-full">
      <TableHeader>
        {table_data.map((item, index) => (
          <TableRow
            key={index}
            className={`border-none ${
              is_old_user === true && item.title === "Monthly Fees"
                ? "hidden"
                : ""
            }${
              is_old_user === false && item.title === "Fee Amount"
                ? "hidden"
                : ""
            }`}
          >
            <TableCell className="py-1 my-0 text-[12px]">
              {item.title}
            </TableCell>
            <TableCell className="py-1 my-0 text-[12px] text-right">
              {item.value}
            </TableCell>
          </TableRow>
        ))}
      </TableHeader>
    </Table>
  );
}
