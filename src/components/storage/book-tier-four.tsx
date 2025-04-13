import React from "react";
import { CarouselStorage } from "./carousel-storage";

export default function StorageTierFour() {
  return (
    <div className="flex flex-col my-[5%] w-full h-auto bg-[#F4F6F8] items-center justify-center">
      <div className=" w-full h-[40%] flex flex-row-reverse items-center">
        <div className="h-full w-[60%] p-4 flex flex-col justify-center">
          <p className="font-semibold text-[24px] mb-5">
            Every case is insured and maintained in optimal conditions, with
            humidity and temperature regulated by the state-of-the-art
            facilities available at the storage site.
          </p>
          <p className="font-light text-[18px]">
            With an impressive portfolio of over £100 million worth of wine
            safely stored within its premises, LCB unquestionably stands out as
            the premier choice for safeguarding your collection throughout its
            investment journey. Among the advantages it offers are the
            preservation of your asset's pristine condition and market value,
            exemption from duty and VAT, and round-the-clock top-tier security
            measures.
          </p>
        </div>
        <div className="h-full w-[40%] flex relative">
          <CarouselStorage defaultIndex={3}></CarouselStorage>
        </div>
      </div>
    </div>
  );
}
