import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SpinnerIcon from "@/images/Spinner";

interface SubAccountType {
  open: boolean;
  isOpen: (open: boolean) => void;
  fname: string;
  lname: string;
  bday: string;
  onChangeFname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cancelBtn: () => void;
  onClick: () => void;
  loading: boolean;
}

export default function SubAccountEdit({
  loading,
  open,
  isOpen,
  fname,
  lname,
  bday,
  onChangeFname,
  onChangeLname,
  onChangeDate,
  cancelBtn,
  onClick,
}: SubAccountType) {
  return (
    <div>
      <Dialog open={open} onOpenChange={isOpen}>
        <DialogContent>
          <DialogTitle>Update Sub-account details</DialogTitle>
          <div className="flex w-full gap-2 justify-between">
            <div>
              <Label>Firstname</Label>
              <Input onChange={onChangeFname} value={fname}></Input>
            </div>
            <div>
              <Label>Lastname</Label>
              <Input onChange={onChangeLname} value={lname}></Input>
            </div>
          </div>
          <div className="mt-5">
            <Label>Birthdate</Label>

            <Input value={bday} onChange={onChangeDate} type="date"></Input>
          </div>
          <div className="w-full flex gap-4 mt-10 justify-center items-center">
            <Button
              onClick={cancelBtn}
              className="border rounded-full w-[150px]"
              variant="ghost"
            >
              Cancel
            </Button>
            <Button className="rounded-full w-[150px]" onClick={onClick}>
              {loading ? (
                <>
                  <div>
                    <SpinnerIcon stroke_color="white"></SpinnerIcon>
                  </div>
                </>
              ) : (
                <></>
              )}
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
