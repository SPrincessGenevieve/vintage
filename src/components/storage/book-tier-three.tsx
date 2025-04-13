import React from "react";
import { CarouselStorage } from "./carousel-storage";

export default function StorageTierThree() {
  return (
    <div className="flex flex-col my-[5%] w-full h-auto bg-[#F4F6F8] items-center justify-center">
      <div className=" w-full h-[40%] flex items-center">
        <div className="h-full w-[60%] p-4 flex flex-col justify-center">
          {/* <p className="font-semibold text-[16px] mb-5">
            Every case is insured and maintained in optimal conditions, with
            humidity and temperature regulated by the state-of-the-art
            facilities available at the storage site.
          </p> */}
          <p className="font-light text-[18px]">
            Storing your fine wine at a luxury facility like London City Bond is
            essential for preserving its value and ensuring its future
            liquidity. With expert handling and secure storage, your collection
            remains in pristine condition, safeguarding its potential to
            appreciate over time. By using a reputable storage service, you add
            credibility and provenance to your wine, which enhances its market
            appeal when it comes time to sell. Such facilities also make the
            liquidation process seamless. Whether through auctions or private
            sales, wines stored in a renowned space are easier to access,
            handle, and sell, providing you with a smoother and more profitable
            transaction. This secure, high-end environment ensures that your
            investment retains its prestige and value, offering peace of mind
            and future flexibility.
            <br></br>
            <br></br>
            We highly recommend visiting the facility at least once during your holding period to personally witness the exceptional care and attention given to your collection.
          </p>
        </div>
        <div className="h-full w-[40%] flex relative">
          <CarouselStorage defaultIndex={2}></CarouselStorage>
        </div>
      </div>
    </div>
  );
}
