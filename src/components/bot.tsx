import React, { useState, useEffect } from "react";
import BotAssist from "./botAssist";
import { Button } from "./ui/button";
import Image from "next/image";
import BotIcon from "@/images/bot.png";
import withAuth from "@/app/withAuth";
import { useUserContext } from "@/app/context/UserContext";
import Script from "next/script";

function Bot() {
  const [aiBotAssist, setAIBotAssist] = useState(false);
  const [openBot, setOpenBot] = useState("max-h-0");
  const handleOpenBot = () => {
    setAIBotAssist(!aiBotAssist);
  };

  useEffect(() => {
    if (aiBotAssist === true) {
      setOpenBot("max-h-[90%]"); // Change to max-height
    } else {
      setOpenBot("max-h-0"); // Change to max-height
    }
  }, [aiBotAssist]);
  return (
    <div className="">
      <Script
        id="helpkit-widget"
        data-project-id="vintageassiociates"
        type="text/javascript"
        src="https://www.helpkit.so/widget/script.js"
        async
      ></Script>
      <div
        className={`absolute top-5 shadow-2xl right-5 z-50 h-full ${openBot} transition-all ease-in-out duration-500 w-full max-w-[450px] rounded-2xl overflow-hidden`}
      >
        <BotAssist></BotAssist>
      </div>
      <Button
        onClick={handleOpenBot}
        className="absolute z-50 bg-[#C4AD93] rounded-full p-1 right-[65px] w-auto h-[35px] bottom-[14px] px-2"
      >
        <div className="flex gap-2">
          <Image width={22} height={22} src={BotIcon} alt="bot"></Image>
          <p className="text-[white]">Ask AI</p>
        </div>
        {/* <BotIcon color="#544805" ></BotIcon> */}
      </Button>
    </div>
  );
}
export default Bot;
