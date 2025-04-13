"use client";

import StorageTierFour from "@/components/storage/book-tier-four";
import StorageTierOne from "@/components/storage/book-tier-one";
import StorageTierThree from "@/components/storage/book-tier-three";
import StorageTierTwo from "@/components/storage/book-tier-two";
import StorageVideoPlay from "@/components/storage/storage-video-play";
import { Button } from "@/components/ui/button";
import "@/app/globals.css";
import { useRef } from "react";
import BookingSched from "@/components/storage/booking-sched";
import BookingForm from "@/components/storage/booking-form";
import withAuth from "@/app/withAuth";

function Storage() {
  // Create a ref to the footer element
  const footerRef = useRef<HTMLDivElement | null>(null);

  // Function to handle the scroll action
  const scrollToBottom = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-full bg-[#F4F6F8]">
      <div className="w-full flex items-center justify-center bg-[black]">
        <div className="h-[50%] w-[50%] bg-[#F4F6F8]">
          <StorageVideoPlay></StorageVideoPlay>
        </div>
      </div>

      <div className="flex flex-col h-auto bg-[#F4F6F8]">
        {/* TIER ONE */}
        <StorageTierOne onClick={scrollToBottom}></StorageTierOne>

        {/* TIER TWO */}
        <StorageTierTwo></StorageTierTwo>

        {/* <div className="flex justify-end w-full bg-white p-4 items-center">
          <Button onClick={scrollToBottom} className="rounded-full w-[200px]">
            Book now
          </Button>
        </div> */}

        {/* TIER THREE */}
        <StorageTierThree></StorageTierThree>

        {/* TIER FOUR */}
        <StorageTierFour></StorageTierFour>
      </div>

      <div
        ref={footerRef}
        className="w-full h-auto rounded-t-2xl flex  bg-[#2A2C2D] booking-footer flex-col"
      >
        <div className="storage-foot rounded-t-3xl p-8 w-full bg-[#2A2C2D] h-auto flex justify-center">
          <div className="w-full flex justify-center items-center">
            <BookingSched></BookingSched>
          </div>
          <div className="w-full flex justify-center">
            <BookingForm></BookingForm>
          </div>
          
        </div>
      </div>
    </div>
  );
}
export default withAuth(Storage);
