import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import ArrowRight from "@/icons/ph_arrow-up.svg";

export default function MFARecoveryCodeForm() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="text-center text-lg font-normal">Enter your code</h1>
        <Input
          id="6-digit-code"
          name="6-digit-code"
          type="text"
          placeholder="***-***"
          className="placeholder:text-center text-center"
          required
        />
      </div>
      <p className="text-muted-foreground text-xs mt-5">
        Already have access?{" "}
        <Link className="underline" href="/auth/sign-in">
          Login
        </Link>
      </p>
      <Button className="w-full mt-8">
        Recover <ArrowRight />
      </Button>
    </>
  );
}
