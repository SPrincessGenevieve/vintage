"use client";
import React from "react";
import Spinner from "@/images/spinner.svg";

interface SpinnerProps {
  visible?: boolean; // Use boolean to control visibility
}

export default function Loading({ visible = false }: SpinnerProps) {
  return (
    <div
      className={`absolute z-50 w-full h-full bg-[#ffffff82] ${visible ? "flex" : "hidden"} items-center justify-center`}
    >
      <div className="w-[100px] h-full flex items-center justify-center">
        <Spinner />
      </div>
    </div>
  );
}
