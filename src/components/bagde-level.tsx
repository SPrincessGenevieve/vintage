"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import { LevelInfoType } from "@/app/context/UserContext";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function BadgeLevel() {
  const { level_info, is_old_user, sessionkey, setUserDetails } = useUserContext();
  const [isVisible, setIsVisible] = useState<string>("");
  const level_name = !level_info || !level_info.name ? "VINTAGE" : level_info.name;
  const level_fee = !level_info || !level_info.fee ? 2.75 : level_info.fee;

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (!sessionkey) return;

  //     const authHeader = "Token " + sessionkey;
  //     try {
  //       const response = await axios.get(`${apiUrl}/user/`, {
  //         headers: {
  //           Authorization: authHeader,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       const userData = response.data.data;
  //       const levelInfo = Array.isArray(userData.level_info) ? userData.level_info : [userData.level_info || {}];

  //       // Update the state and user details
  //       setUserDetails({ level_info: levelInfo });

  //       if (levelInfo.length > 0) {
  //         setFee(levelInfo[0].fee || 0);
  //         setLevel(levelInfo[0].level || 0);
  //         setName(levelInfo[0].name || "");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, [sessionkey]); // Remove level_info as a dependency here

  useEffect(() => {
    if (is_old_user === true) {
      setIsVisible("hidden");
    } else {
      setIsVisible("");
    }
  }, [is_old_user]);

  return (
    <div className={`level-group text-right ${isVisible} w-auto min-w-[100px]`}>
      <span className="gen-text-xs text-[12px] font-muted-foreground font-light">
        Level
      </span>
      <h1 className="text-[12px] text-primary">{level_name || ""}</h1>
      <Badge className="gen-text-xs">{level_fee || 0}% Fees</Badge>
    </div>
  );
}
