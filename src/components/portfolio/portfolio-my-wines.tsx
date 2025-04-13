"use client";

import React, { useState, useEffect } from "react";
import PortfolioTable from "./portfolio-table";
import {
  PortfolioType,
  useUserContext,
  WineParentType,
} from "@/app/context/UserContext";
import SpinnerIcon from "@/images/Spinner";
import LoadingDot from "@/images/loaddot";

import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PortfolioMyWines({
  portfolio,
  wine_parent,
}: {
  portfolio: PortfolioType[];
  wine_parent: WineParentType[];
}) {
  const { setUserDetails, sessionkey } = useUserContext();
  const portfolioArray = Object.values(portfolio);
  const portfolioParent = portfolioArray.map((item) => item.wine_parent);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // State to manage loading
  const [message, setMessage] = useState("Loading data..."); // State for the message

  const authHeader = "Token " + sessionkey;

  useEffect(() => {
    const setData = () => {
      setUserDetails({
        wine_parent: portfolioParent,
        portfolio: portfolioArray,
      });
    };

    setData();
  }, [portfolioParent, portfolioArray, setUserDetails]);

  useEffect(() => {
    if (!wine_parent || wine_parent.length === 0) {
      setMessage("Loading data...")
      setTimeout(() => {
        setLoading(false); // After 5 seconds, set loading to false
        setMessage("No existing investments"); // Set message to 'No existing investments'
      }, 5000); // 5 seconds timeout
    }
  }, [wine_parent]);

  return (
    <div className="wine-table-cont flex flex-col w-full h-full">
      {wine_parent && wine_parent.length > 0 ? (
        <PortfolioTable portfolio={portfolio} parent={wine_parent[0]} />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p>No Wine Investments</p>
        </div> // Fallback message or component if wine_parent is undefined or empty
      )}
    </div>
  );
}  
