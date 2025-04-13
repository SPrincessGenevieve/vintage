import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { depositData } from "@/lib/mock-data";
import { CircleAlert } from "lucide-react";
import { Input } from "../ui/input";

export default function DepositDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <Button className="h-2 py-4 text-[12px]">Deposit</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Vintage Associates Bank account</DialogTitle>
        <DialogDescription>
          Send your funds to this account and make sure to verify the deposit.
        </DialogDescription>
        {depositData.map((item, index) => (
          <div key={index} className="flex justify-between">
            <div>
              <p className="text-[12px]">{item.label}</p>
            </div>
            <div className="text-left flex text-[12px] w-[120px]">
              <p>{item.value}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2">
            <CircleAlert size={12} color="#EC841A"></CircleAlert>
          <p className="text-[#EC841A] text-[12px]">
            Please put your account ID in notes before sending the money in our
            bank
          </p>
        </div>
        <div className="">
            <p className="text-[12px] my-2">Done depositing? Enter the exact amount and click to verify.</p>
            <Input type="number" className="text-center rounded-full h-10 my-2"></Input>
            <Button className="w-full text-[12px]">Make a deposit</Button>
            <p className="text-[12px] my-2">Forgot to put your account ID in notes? <button className="text-[12px] underline">Contact us</button></p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
