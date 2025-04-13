import { Progress } from "@/components/ui/progress";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import Card from "@/images/card.png";
import SignupFormSix from "@/components/auth/sign-up-form-6";

export default function SignupSix() {
  return (
    <div className="flex flex-col mt-14 gap-y-5 h-auto w-[500px] sign-up-progress-top">
      <div className="flex min-h-3 h-[1.5%]">
        <Progress className="w-full h-auto" value={90} />
      </div>
      <div className="flex w-full min-h-[70px] h-[25%] items-center justify-center flex-col sign-up-5-cont">
        <h1 className="text-center text-[16px] font-normal line-1-card">
          Set up your management fee billing address and card
        </h1>
        <div className="flex pt-4">
          <CircleAlert strokeWidth={1} size={17} />
          <h2 className="text-center font-light text-[10px]">
            We will not charge anything unless you decide to invest on one of
            our wines.
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <Image src={Card} alt="qr-code" className="qr-code" height={220} width={220} />
      </div>
      <SignupFormSix />
    </div>
  );
}
