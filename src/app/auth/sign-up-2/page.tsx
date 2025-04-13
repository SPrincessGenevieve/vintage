import { Progress } from "@/components/ui/progress";
import SignupFormTwo from "@/components/auth/sign-up-form-2";
import "./../../globals.css";

export default function SignupTwo() {
  return (
    <div className="flex flex-col mt-14 gap-y-5 h-auto w-[500px] sign-up-progress-top">
      <div className="flex min-h-3 h-[1.5%] ">
        <Progress className="w-full h-auto " value={25}></Progress>
      </div>
      <div className="flex w-full min-h-[70px] h-[10%] items-center justify-center">
        <h1 className="font-light text-center text-[16px]">
          We need to know your investment status at the moment.
        </h1>
      </div>
      <SignupFormTwo></SignupFormTwo>
    </div>
  );
}
