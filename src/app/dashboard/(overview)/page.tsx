"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TierOne from "@/components/dashboard/tier-one";
import TierTwo from "@/components/dashboard/tier-two";
import TierThree from "@/components/dashboard/tier-three";
import TierTwoR from "@/components/dashboard/tier-two-r";
import TierThreeR from "@/components/dashboard/tier-three-r";
import withAuth from "@/app/withAuth";
import { useUserContext, VintageWineType } from "@/app/context/UserContext";
import axios from "axios";
import { WineType } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Dashboard() {
  const { sessionkey, setUserDetails } = useUserContext();

  useEffect(() => {
    if (!sessionkey) {
      return;
    }
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
          userData: userData,
          profile_picture: userData.profile_picture,
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          request: userData.request || [],
          investment: userData.investment || [],
          portfolio_performance: userData.portfolio_performance || [],
          balance: userData.balance,
          total_investments: userData.total_investments,
          total_withdrawn: userData.total_withdrawn,
          old_fee: userData.old_fee,
          level: userData.level,
          current_market_value: userData.current_market_value,
          case_due: userData.case_due,
          profit_loss: userData.profit_loss,
          total_case: userData.total_case,
          is_old_user: userData.is_old_user,
          assets_by_region: userData.assets_by_region,
          phone_number: userData.phone_number,
          cartCount: userData.user_cart_count,
          level_info: userData.level_info,
          paid_fee: userData.paid_fee,
          cases_sold: userData.paid_fee,
          profit_loss_money: userData.paid_fee,
          country: userData.country,
          state: userData.state,
          city: userData.city,
          street_address: userData.street_address,
          postal_code: userData.postal_code,
          budget: userData.budget,
          investment_time: userData.investment_time,
          invested_before: userData.invested_before,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [sessionkey]);

  return (
    <div className="flex-grow bg-[#F4F6F8] h-full w-full">
      <p></p>
      <div className="w-full h-full min-h-[50px] max-h-[90px] flex bg-[#F4F6F8]">
        <TierOne />
      </div>

      <div className="w-full h-full max-h-[220px]  flex bg-[#F4F6F8] tier-two-cont">
        <div className="w-full h-full p-2">
          <div className="bg-white w-full h-full rounded-xl p-2">
            <TierTwo />
          </div>
        </div>
        <div className="w-full h-full p-2 grid grid-cols-2 gap-2">
          <TierTwoR />
        </div>
      </div>

      <div className="w-full h-full min-h-[150px] max-h-[450px] flex bg-[#F4F6F8] tier-three-cont">
        <div className="w-full h-full p-2 bg-[#F4F6F8]">
          <TierThree />
        </div>

        <div className="w-full h-full p-2">
          <TierThreeR />
        </div>
      </div>
    </div>
  );
}
export default withAuth(Dashboard);
