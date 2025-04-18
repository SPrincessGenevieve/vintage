"use client";

import TierOne from "@/components/dashboard/tier-one";
import TierTwo from "@/components/dashboard/tier-two";
import TierThree from "@/components/dashboard/tier-three";
import TierTwoR from "@/components/dashboard/tier-two-r";
import TierThreeR from "@/components/dashboard/tier-three-r";
import withAuth from "@/app/withAuth";
import { vintex } from "@/lib/data/vintage";
import { Button } from "@/components/ui/button";
import axios from "axios";

function Dashboard() {
  const username = "sprincessgenevieve@gmail.com";
  const password = "AmongUs@77";

  const lwindata = vintex.flatMap((item) =>
    item.results.map((innerItem) => innerItem.lwin11)
  );

  const fetchData = async () => {
    if (!username || !password) {
      return;
    }
    try {
      const requests = lwindata.map((id) =>
        axios.get(`https://va.gonearby.app/api/wine/data-points/${id}/`, {
          auth: {
            username: username,
            password: password,
          },
        })
      );

      const responses = await Promise.all(requests);

      const allData = responses.map((response) => response.data);

      // Save to JSON and download
      const blob = new Blob([JSON.stringify(allData, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "wine_data.json";
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("✅ Downloaded wine_data.json");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex-grow bg-[#F4F6F8] h-full w-full">
      <p></p>
      <Button onClick={fetchData}>FETCH ME</Button>
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
