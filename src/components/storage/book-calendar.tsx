"use client";

import { CircleCheck, MessageCircleQuestion } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Calendar } from "../ui/calendar";

export default function BookCalendar({ onClick }: { onClick: () => void }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [success, setSuccess] = useState<boolean>(true);

  return (
    <div className="w-full">
      <Button
        onClick={onClick}
        className="w-full  rounded-full bg-transparent border my-2 border-white font-light flex"
      >
        <MessageCircleQuestion></MessageCircleQuestion> Request your own tour
        date
      </Button>
    </div>
  );
}
