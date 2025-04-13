import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import ArrowRight from "@/icons/ph_arrow-up.svg";

export default function SignupFormFive() {
  return (
    <>
      <div className="flex flex-col gap-5">
        {/* <h1 className="text-center text-[14px] font-normal">Enter your code</h1>
        <Input
          id="6-digit-code"
          name="6-digit-code"
          type="text"
          placeholder="***-***"
          className="placeholder:text-center text-center h-10"
          required
        /> */}
      </div>
      {/* <p className="text-muted-foreground text-[10px] mt-5">
        Have you lost access to your Authenticator?{" "}
        <Link className="underline" href="#">
          Contact us
        </Link>{" "}
        or{" "}
        <Link className="underline" href="/auth/mfa-recovery-methods">
          Recover it
        </Link>
      </p> */}
      <Link
        href="/auth/sign-up-success"
        className="flex bg-[#104144] text-white rounded-3xl p-2 w-full items-center justify-center"
      >
        Next <ArrowRight />
      </Link>
    </>
  );
}
