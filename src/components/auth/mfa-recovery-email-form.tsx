import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import ArrowRight from "@/icons/ph_arrow-up.svg";

export default function MFARecoveryEmailForm() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="text-center text-lg font-normal">
          Enter your email address
        </h1>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@gmail.com"
          className="placeholder:text-center h-10"
          required
        />
      </div>
      <p className="text-muted-foreground text-xs mt-5">
        Already have access? <Link href="/auth/sign-in">Login</Link>
      </p>
      <Button className="w-full mt-8">
        Recover <ArrowRight />
      </Button>
    </>
  );
}
