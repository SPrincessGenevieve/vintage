import React from "react";
import InvestedIcon from "./../../images/investIcon.svg";
import TotalUnitsIcon from "./../../images/totalUnits.svg";
import TotalWithdrawnIcon from "./../../images/withdrawIcon.svg";
import SoldUnitsIcon from "./../../images/SoldUnits.svg";
import CasesSold from "@/images/cases_sold.svg";
import Realised from "@/images/realised.svg";
import { useUserContext } from "@/app/context/UserContext";

export default function TierTwoR() {
  const {
    case_due,
    total_case,
    total_withdrawn,
    total_withdrawn_state,
    cases_sold_state,
    profit_loss_money_state,
    total_cases_state,
    case_due_state,
    sub_account_list,
    cases_sold,
    profit_loss_money,
    user_now_id,
    total_investments,
    life_time_investment,
    userData,
    dashboard_title,
    dashboard_value,
    setUserDetails,
  } = useUserContext();

  const subItem = [
    {
      item: "Current Investment",
      value: !dashboard_value ? userData.current_investment : dashboard_value,
      icon: <InvestedIcon></InvestedIcon>,
    },
    {
      item: "Total Cases",
      value: user_now_id === 0 ? userData.total_case : total_cases_state,
      icon: <TotalUnitsIcon></TotalUnitsIcon>,
    },
    {
      item: "Total Withdrawn",
      value: user_now_id === 0 ? userData.total_withdrawn : total_withdrawn_state,

      icon: <TotalWithdrawnIcon></TotalWithdrawnIcon>,
    },
    {
      item: "Cases Due/ Ordered",
      value: user_now_id === 0 ? userData.case_due : sub_account_list.case_due,
      icon: <SoldUnitsIcon></SoldUnitsIcon>,
    },
    {
      item: "Cases Sold",
      value: user_now_id === 0 ? userData.cases_sold : sub_account_list.cases_sold,
      icon: <CasesSold></CasesSold>,
    },
    {
      item: "Realised P&L",
      value: user_now_id === 0 ? userData.profit_loss_money : sub_account_list.profit_loss_money,
      icon: <Realised></Realised>,
    },
  ];


  // console.log("LEVEL ACTIVE ACCOUNT HERE: ", user_now);

  const formatValue = (value: number | string | null) => {
    const numericValue =
      value === null
        ? 0
        : typeof value === "string"
        ? parseFloat(value)
        : value;

    // Round to the nearest whole number
    const roundedValue = Math.round(numericValue); // You can use Math.floor() if you want to round down instead

    return roundedValue.toLocaleString(); // Adds comma separator and ensures it's a whole number
  };

  return (
    <>
      {subItem.map((item, index) => {
        const roundedValue = formatValue(item.value);
        return (
          <div
            key={index}
            className="relative p-2 w-full h-full bg-[#ffffff] rounded-xl flex items-center"
          >
            {/* <div className="absolute rounded-2xl w-[90%] h-[60%] bg-[white] blur-sm right-0"></div> */}
            <div className="w-[15%] h-12 bg-white tier-2-icon">{item.icon}</div>
            <div className="w-full h-12 bg-white">
              <p
                className={`text-[12px] ${
                  item.item === "Realised P&L"
                    ? Number(roundedValue) < 0
                      ? "text-[red]"
                      : "text-[green]"
                    : "text-black"
                }`}
              >
                {item.item === "Current Investment" ||
                item.item === "Total Withdrawn" ||
                item.item === "Realised P&L" ||
                item.item === "Total Investment"
                  ? `£`
                  : ``}
                {roundedValue}
              </p>
              <p className="text-[12px]">{item.item}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
