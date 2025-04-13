"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubAccountForm from "./sub-account-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function AddSubAccountDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-[10px] font-light text-blue-400">
          Add sub-accounts
        </span>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle className="text-[16px] font-normal">
            New Sub account
          </DialogTitle>
          <DialogDescription className="text-[12px]">
            We need your basic information for processing your transactions.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <SubAccountForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
