"use client";
import { MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "@/app/context/UserContext";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function BookingSched() {
  const { setUserDetails, event_list, sessionkey } = useUserContext();
  const authHeader = "Token " + sessionkey;

  // Function to format the date
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString); // Parse the string into a Date object
    return dateObj.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "UTC", // Force the timezone to UTC
      // timeZoneName: 'short', // To show "UTC" in the output
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sessionkey) {
          return;
        }
        const response = await axios.get(`${apiUrl}/user/events`, {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });
        console.log("Response Events: ", response.data);
        setUserDetails({
          event_list: response.data,
        });
      } catch (error) {
        console.log("Error fetching events: ", error);
      }
    };

    fetchData();
  }, [sessionkey]);

  return (
    <div className="w-full min-w-[350px] max-w-[400px] h-full justify-center items-center flex flex-col">
      <p className="w-full text-white">Visit Dates</p>
      <p className="w-full text-[12px] text-[#898A8B] mb-5">
        Visit our warehouse to see it in action.
      </p>
      {event_list.map((item, index) => (
        <div
          key={index}
          className="flex w-full border border-[#595B5C] p-2 mb-2 rounded-xl relative"
        >
          {/* Yellow box with map pin */}
          <div className="w-[50px] p-2 flex items-center justify-center">
            <MapPin strokeWidth={1} color="#C4AD93" size={40} />
          </div>

          {/* Green box with content */}
          <div className="w-full p-2 pt-4">
            <p className="text-[12px] text-white uppercase">{item.name}</p>
            <p className="text-[12px] text-white uppercase">
              {formatDate(item.date)} {/* Format the date here */}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
