"use client";
import { useEffect, useState } from "react";
import { useUserContext } from "@/app/context/UserContext";

export default function BotAssist() {
  return (
    <object
      className={` rounded-xl w-full h-full flex`}
      data="https://vintageassociates-elvinmootoosamy.pythonanywhere.com/"
      type="text/html"
      aria-label="Vintage Associates"
      style={{ width: "100%", height: "100%" }}
    >
      <p>Your browser does not support embedding external content.</p>
    </object>
  );
}
