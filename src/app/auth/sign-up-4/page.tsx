import { Progress } from "@/components/ui/progress";
import SignupFormFour from "@/components/auth/sign-up-form-4";
import "./../../globals.css";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

export default function SignupFour() {

  return (
    <Suspense>
      <div className="flex flex-col mt-14 gap-y-5 h-auto w-[500px] sign-up-progress-top">
        <div className="flex min-h-3 h-[1.5%]">
          <Progress className="w-full h-auto" value={100} />
        </div>
        <div className="flex w-full min-h-[70px] h-[15%] items-center justify-center id-select-cont">
          <h1 className="font-light text-center text-[16px]">
            Please use your phone to scan the code, and it will redirect you to
            Veriff for verification.
          </h1>
        </div>
        
        <SignupFormFour />
      </div>
    </Suspense>
  );
}
