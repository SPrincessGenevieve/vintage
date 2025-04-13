import SignupForm from "@/components/auth/sign-up-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="flex flex-col mt-14 gap-y-5 h-auto overflow-y-auto w-[500px] sign-up-progress-top">
      <div className="flex min-h-3 h-[1.5%]">
        <Progress className="w-full h-auto"></Progress>
      </div>
      <div className="flex w-full min-h-[70px] h-[15%] items-center justify-center">
        <h1 className="font-light text-center text-[16px]">
          We need your basic information for processing your transactions.
        </h1>
      </div>
      <div>
      <SignupForm></SignupForm>
      </div>
    </div>
  );
}
