"use client";

import TierOne from "@/components/dashboard/tier-one";
import TierTwo from "@/components/dashboard/tier-two";
import TierThree from "@/components/dashboard/tier-three";
import TierTwoR from "@/components/dashboard/tier-two-r";
import TierThreeR from "@/components/dashboard/tier-three-r";
import withAuth from "@/app/withAuth";


function Dashboard() {
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
