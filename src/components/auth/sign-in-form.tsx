"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useUserContext } from "@/app/context/UserContext";
import "./../../app/globals.css";
import Loading from "../loading";
import MobileAppsLinks from "./mobile-apps-links";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const defaultEmail = "example@gmail.com";
  const defaultPassword = "Password1234";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    const data = {
      email: email,
      password: password,
    };

    if (email === defaultEmail && password === defaultPassword) {
      setLoading(false);
      navigate.push(`/auth/sign-up-5`);
    } else {
      setError("Incorrect email or password.");
      setTimeout(() => {
        setError("");
      }, 3000);
      setLoading(false);
    }
  };

  const handleNavForgotPass = () => {
    setLoading(true);
    navigate.push("/auth/password/forgot-password");
  };

  const handleNavSignUp = () => {
    setLoading(true);
    navigate.push("/auth/sign-up");
  };

  useEffect(() => {
    if (navigate) {
      setLoading(false); // Set loading to false once navigation completes
    }
  }, [navigate]);

  return (
    <>
      {/* Show the Loading screen when loading is true */}
      {loading && (
        <div className="absolute w-full h-full top-0 left-0">
          <Loading visible={loading} />
        </div>
      )}

      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <h1 className="font-light text-center text-[14px] mb-[10%]">
            Welcome, kindly login with your email and password.
          </h1>
          <div className="flex w-full flex-col">
            <Label htmlFor="email" className="text-[14px] font-normal">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@gmail.com"
              required
              className="text-[14px] h-10"
            />
          </div>
          <div className="flex w-full flex-col">
            <Label htmlFor="password" className="text-[14px] font-normal">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="****************"
              className="text-[14px] h-10"
              required
            />
          </div>
          {error && <p className="text-red-500 text-[12px]">{error}</p>}
          <div className="w-full flex justify-between">
            <Link
              href={"/auth/password/forgot-password"}
              onClick={handleNavForgotPass}
              className="w-auto flex justify-between"
            >
              <p className="text-muted-foreground text-[11px]">
                Forgot Password?
              </p>
            </Link>
          </div>
          <div className="mt-4 mfa-forgot-pass">
            <Button type="submit" className="w-full text-[16px]">
              <p>Login</p>
              <ArrowRight />
            </Button>
            <Link href="/auth/sign-up" onClick={handleNavSignUp}>
              <p className="text-center mt-3 font-light text-[12px]">
                You don&apos;t have an account yet? Create an account here
              </p>
            </Link>
          </div>
        </form>
        <div className="mt-40 mobile-app-store w-full">
          <MobileAppsLinks />
        </div>
      </div>
    </>
  );
}
