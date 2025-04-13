"use client";

import { Calendar1, CircleCheck, X } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";

export default function BookedSuccess({
  open,
  bookBtn,
  close,
  disabled,
}: {
  open: boolean;
  bookBtn: () => void;
  close: () => void;
  disabled: boolean;
}) {
  return (
    <div className="w-full">
      <Dialog open={open}>
        {" "}
        {/* Pass setOpen function */}
        <DialogTrigger disabled={disabled} className="w-full">
          <Button
            onClick={bookBtn}
            className="w-full rounded-full font-light flex"
          >
            <Calendar1 /> Book Now
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full flex items-center justify-center p-4 py-8">
          <DialogClose
            onClick={close}
            className="bg-white rounded-xl z-30  absolute top-0 right-0 p-2"
          >
            <X size={20}></X>
          </DialogClose>
          <div>
            <CircleCheck color="#1BCD32" />
          </div>
          <div>
            <p className="text-[12px]">Booked successfully</p>
            <p className="text-[12px] text-gray-400">
              Thank you for booking your visit. We will send an email
              confirmation shortly.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
