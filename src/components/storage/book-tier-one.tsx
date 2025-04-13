import React from "react";
import { CarouselStorage } from "./carousel-storage";
import { Button } from "../ui/button";

interface storageThreeProps {
  onClick : () => void
}

export default function StorageTierOne({onClick}: storageThreeProps) {
  return (
    <div className="flex flex-col w-full h-auto my-[5%] bg-[#F4F6F8] items-center justify-center">
      <div className=" w-full h-[40%] flex items-center">
        <div className="h-full w-[60%] p-4 flex flex-col justify-center">
          <p className="text-[28px] font-semibold ">
            BONDED WAREHOUSE <br />
            FACILITY
          </p>
          <br></br>
          <p className="text-[18px] mb-5 text-[#595B5C]">
            Your wine collection is securely housed at London City Bond (LCB),
            which serves as the headquarters for the London International
            Vintners Exchange (Liv-ex).
            <br></br>
            <br></br>
            This strategic location ensures that each case stored at{" "}
            <span className="text-[#C4AD93]">LCB</span> can be listed back on
            the exchange with a simple click of a button, eliminating the
            necessity for physical case relocation.
          </p>
            
          <Button onClick={onClick} className="rounded-full w-[200px]">Book now</Button>
        </div>
        <div className="h-full w-[40%] flex relative">
          <CarouselStorage defaultIndex={0}></CarouselStorage>
        </div>
      </div>
    </div>
  );
}
