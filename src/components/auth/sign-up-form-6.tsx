import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ArrowRight from "@/icons/ph_arrow-up.svg";
import Link from "next/link";
import "./../../app/globals.css";

export default function SignupFormSix() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 credit-card-cont">
        <div className="flex w-full flex-col">
          <Label htmlFor="" className="text-[16px] font-normal">
            Card Number
          </Label>
          <Input
            id=""
            name=""
            type="text"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="flex w-full flex-col">
          <Label htmlFor="" className="text-[16px] font-normal">
            Full Name
          </Label>
          <Input id="" name="" type="text" placeholder="John Doe" required />
        </div>
      </div>
      <div className="flex gap-4 w-full ">
        <div className="flex w-full flex-col">
          <Label htmlFor="" className="text-[16px] font-normal">
            Expiry
          </Label>
          <Input id="" name="" type="date" placeholder="12/2024" required />
        </div>
        <div className="flex w-full flex-col">
          <Label htmlFor="" className="text-[16px] font-normal">
            CVC
          </Label>
          <Input id="" name="" type="number" placeholder="123" required />
        </div>
      </div>

      <div className="mt-4">
        <Link href="/auth/sign-up-success">
          <Button className="w-full text-[14px]">
            Submit <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
