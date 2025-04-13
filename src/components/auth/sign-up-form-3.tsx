import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import ArrowRight from "@/icons/ph_arrow-up.svg";
import ArrowLeft from "@/icons/left-arrow.svg";
import Link from "next/link";

export default function SigninFormThree() {
  return (
    <div className="flex flex-col gap-5 ">
      <RadioGroup
        defaultValue="comfortable"
        className="grid grid-cols-2 w-full gap-8"
      >
        <div className="border rounded-xl p-4">
          <div className="flex items-center space-x-4 ">
            <RadioGroupItem value="bond" id="r1" />
            <Label htmlFor="r1" className="text-[14px]">
              Bond (Liv-ex)
            </Label>
          </div>
          <div className="ml-4 p-4 text-muted-foreground font-light text-[14px]">
            <p>Pros</p>
            <ul className="list-disc pt-1">
              <li>Lorem Inpsum</li>
              <li>Lorem Inpsum</li>
              <li>Lorem Inpsum</li>
              <li>Lorem Inpsum</li>
            </ul>
            <p className="mt-4">Cons</p>
            <ul className="list-disc pt-1">
              <li>Lorem Inpsum</li>
              <li>Lorem Inpsum</li>
              <li>Lorem Inpsum</li>
              <li>Lorem Inpsum</li>
            </ul>
          </div>
        </div>
        <div className="border rounded-xl p-4 text-[14px]">
          <div className="flex items-center space-x-4 ">
            <RadioGroupItem value="octavian" id="r2" />
            <Label htmlFor="r2" className="text-[14px]">
              Octavian
            </Label>
          </div>
          <div className="ml-4 p-4 text-muted-foreground font-light">
            <p>Pros</p>
            <ul className="list-disc pt-1">
              <li>Lorem Inpsum</li>
              <li>Lorem Inpsum</li>
              <li>Lorem Inpsum</li>
              <li>Lorem Inpsum</li>
            </ul>
            <p className="mt-4">Cons</p>
            <ul className="list-disc pt-1">
              <li>Lorem Inpsum</li>
              <li>Lorem Inpsum</li>
              <li>Lorem Inpsum</li>
              <li>Lorem Inpsum</li>
            </ul>
          </div>
        </div>
      </RadioGroup>

      <div className="mt-4 flex justify-between">
        <Link
          href="/auth/sign-up-2"
          className="flex bg-white border border-gray-400 text-black rounded-3xl p-2 w-[170px] items-center justify-center"
        >
          <ArrowLeft /> Previous
        </Link>
        <Link
          href="/auth/sign-up-4"
          className="flex bg-[#104144] text-white rounded-3xl p-2 w-[170px] items-center justify-center"
        >
          Next <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
