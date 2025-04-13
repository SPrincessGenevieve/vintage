"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import DepositForm from "./deposit-form";

export default function DepositDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-2xl text-sm px-10">
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-normal">
            Vintange Associates
          </DialogTitle>
          <DialogDescription>
            Enter the amount you’d like to deposit. Your transaction will be
            securely processed using Plaid
          </DialogDescription>
        </DialogHeader>
        {/* <div className="mt-5 font-light flex items-center justify-between">
          <span>Type:</span>
          <span>Organization</span>
        </div>
        <div className="font-light flex items-center justify-between">
          <span>Account Name:</span>
          <span>Vintage Associates</span>
        </div>
        <div className="font-light flex items-center justify-between">
          <span>Account Number:</span>
          <span>80597604645</span>
        </div>
        <div className="font-light flex items-center justify-between">
          <span>Your account ID:</span>
          <span>3335645</span>
        </div> */}
        {/* <div className="flex items-center gap-2">
          <CircleAlert
            strokeWidth={1.3}
            size={20}
            className="text-orange-600"
          />
          <span className="text-orange-600 text-sm font-light text-muted-foreground">
            Please put your account ID in notes before sending the money in our
            bank
          </span>
        </div> */}
        {/* Deposit Form */}
        <DepositForm />
        {/* <span className="text-muted-foreground text-xs">
          Forgot to put your account ID in notes?{" "}
          <Link href="#" className="underline">
            Contact us
          </Link>
        </span> */}
      </DialogContent>
    </Dialog>
  );
}
