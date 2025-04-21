import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import SpinnerIcon from "@/images/Spinner";
export default function OrderDeleteSingle({
  onDelete,
  closeDialog,
  children,
  loading = "",
}: {
  closeDialog: boolean; // Function to handle deletion
  onDelete: () => void; // Function to handle deletion
  children: React.ReactNode;
  loading: string
}) {
  const [dialog, setDialog] = useState(false);

  // This function will be called to open the dialog
  const handleOpenDialog = () => {
    setDialog(true); // Optionally, you can also manage dialog state locally if needed
  };

  const handleCancel = () => {
    setDialog(false);
  };

  return (
    <Dialog open={dialog || closeDialog}>
      <DialogTrigger onClick={handleOpenDialog}>{children}</DialogTrigger>
      <DialogContent>
        <div className="w-full flex flex-col gap-3 items-center justify-center">
          <Trash2Icon size={50} color="red" />
          <p className="text-[14px] font-bold">Confirm Delete</p>
          <p className="text-[12px]">
            Are you sure you want to remove this item from the cart?
          </p>
          <div className="flex w-full items-center justify-center gap-5">
            <Button
              onClick={handleCancel}
              variant="ghost"
              className="border border-gray-400 rounded-full text-[12px] w-full"
            >
              Cancel
            </Button>
            <Button
              className="rounded-full text-[12px] w-full"
              onClick={onDelete} // Call the onDelete function directly
            >
              <div className={`${loading}`}>
                <SpinnerIcon stroke_color="white"></SpinnerIcon>
              </div>
              Remove
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
