'use client'

import React from "react";
import { CarouselStorage } from "@/components/storage/carousel-storage";
import BookingSched from "@/components/storage/booking-sched";
import BookingForm from "@/components/storage/booking-form";
import withAuth from "@/app/withAuth";

function BookNow() {
  return (
    <div className="booking-cont flex flex-col w-full h-full bg-[#F4F6F8]">
      <div className="booking-cont w-full h-[50%] flex">
        <div className="carousel-cont h-full w-[40%] flex relative">
          <CarouselStorage></CarouselStorage>
        </div>
        <div className="h-full w-[60%] p-4 carousel-desc-cont">
          <p className="carousel-text font-semibold text-[1vw] mb-5">
            Every case is insured and maintained in optimal conditions, with
            humidity and temperature regulated by the state-of-the-art
            facilities available at the storage site.
          </p>
          <p className="carousel-text font-light text-[1vw]">
            With an impressive portfolio of over £100 million worth of wine
            safely stored within its premises, LCB unquestionably stands out as
            the premier choice for safeguarding your collection throughout its
            investment journey. Among the advantages it offers are the
            preservation of your asset's pristine condition and market value,
            exemption from duty and VAT, and round-the-clock top-tier security
            measures.
          </p>
        </div>
      </div>
      <div className=" flex bg-[#2A2C2D] rounded-t-2xl w-full h-[50%] main-storage">
        <div className="w-full h-auto flex justify-center relative">
          <BookingSched></BookingSched>
        </div>
        <div className="w-full h-auto flex justify-center relative">
          <BookingForm></BookingForm>
        </div>
      </div>
    </div>
  );
}

export default  withAuth(BookNow)