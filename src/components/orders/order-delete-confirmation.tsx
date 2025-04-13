import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import SpinnerIcon from "@/images/Spinner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function OrderDeleteConfirmation({
  selectedItems,
  onDelete,
  children,
  open,
  loading = "",
}: {
  selectedItems: any[]; // Array of selected items to be deleted
  onDelete: (items: any[]) => Promise<void>;
  open: boolean;
  children: React.ReactNode;
  loading: string;
}) {

  const [dialog, setDialog] = useState(false)

  return (
    <Dialog open={dialog || open} onOpenChange={setDialog}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <div className="w-full flex flex-col gap-3 items-center justify-center">
          <Trash2Icon size={50} color="red" />
          <p className="text-[14px] font-bold">Confirm Delete</p>
          <p className="text-[12px]">
            Are you sure you want to remove the selected items from the cart?
          </p>
          <div className="flex w-full items-center justify-center gap-5">
            <Button
              variant="ghost"
              className="border border-gray-400 rounded-full text-[12px] w-full"
              onClick={() => setDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-full text-[12px] w-full"
              onClick={() => onDelete(selectedItems)} // Call the onDelete function
            >
              <div className={`${loading}`}>
                <SpinnerIcon strokeColor="white"></SpinnerIcon>
              </div>
              Remove
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
