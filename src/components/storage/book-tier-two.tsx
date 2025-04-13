import React from "react";
import { CarouselStorage } from "./carousel-storage";

export default function StorageTierTwo() {
  return (
    <div className="flex flex-col my-[5%] w-full h-auto bg-[#F4F6F8] items-center justify-center">
      <div className=" w-full h-[40%] flex  items-center flex-row-reverse">
        <div className="h-full w-[60%] p-4 flex flex-col justify-center">
          {/* <p className="font-semibold text-[16px] mb-5">
            Every case is insured and maintained in optimal conditions, with
            humidity and temperature regulated by the state-of-the-art
            facilities available at the storage site.
          </p> */}
          <p className="font-light text-[18px]">
            Storing your fine wine at London City Bond offers an unparalleled
            level of luxury and sophistication. Their climate-controlled
            facilities are meticulously designed to maintain perfect temperature
            and humidity, ensuring the preservation of your wine's finest
            qualities. With secure, state-of-the-art vaults, your collection is
            safeguarded by cutting-edge security measures. The exclusive bonded
            storage option allows for tax-free storage, optimizing your
            investment. Expert staff, with a deep knowledge of fine wines,
            provide exceptional care and personalized service. Enjoy the
            convenience of effortless access to your collection, along with
            premium services such as tailored insurance and bespoke cellar
            management.
          </p>
        </div>
        <div className="h-full w-[40%] flex relative">
          <CarouselStorage defaultIndex={1}></CarouselStorage>
        </div>
      </div>
    </div>
  );
}
