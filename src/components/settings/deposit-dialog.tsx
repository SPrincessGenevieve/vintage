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
        <DepositForm />
      </DialogContent>
    </Dialog>
  );
}
