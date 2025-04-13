import { Progress } from "@/components/ui/progress";
import SigninFormThree from "@/components/auth/sign-up-form-3";

export default function SignupThree() {
  return (
    <div className="flex flex-col mt-14">
      <div className="space-y-10  px-10">
        <Progress value={34} />
        <h1 className="font-light text-center text-[16px]">
          Where do you want to store the wine?
        </h1>
        <div className="pt-10">
          <SigninFormThree />
        </div>
      </div>
    </div>
  );
}
