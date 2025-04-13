"use client";

import { Calendar1, CalendarOff, CircleCheck, X } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function BookedFailed({
  open,
  bookBtn,
  close,
  disabled,
  message,
}: {
  open: boolean;
  bookBtn: () => void;
  close: () => void;
  disabled: boolean;
  message: string;
}) {
  return (
    <div className="w-full">
      <Dialog open={open}>
        <DialogTrigger disabled={disabled} className="w-full">
          <Button
            onClick={bookBtn}
            className="w-full rounded-full font-light flex"
          >
            <span className="flex gap-2 w-[150px]">
              <Calendar1 /> Book Now
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className=" w-full flex flex-col p-4 py-8">
          <DialogTitle>Booking Denied</DialogTitle>
          <DialogClose onClick={close} className="bg-white rounded-xl z-30 absolute top-0 right-0 p-2">
            <X size={20}></X>
          </DialogClose>

          <div className="flex gap-2">
            <div>
              <CalendarOff size={20} color="red"></CalendarOff>
            </div>
            <div className="flex flex-col ">
              <p className="text-[12px]"></p>
              <p className="text-[12px] text-red-500">{message}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
