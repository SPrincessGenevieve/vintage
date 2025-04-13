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
  const {
    setUserDetails,
    sessionid,
    oldemail,
    sessionkey,
    otp_verify,
    otp_validated,
    kyc_verify,
  } = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state added
  const [otpUrl, setOtpUrl] = useState<string | null>(null);
  const [veriff, setVeriff] = useState<string | null>(null);
  const navigate = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${apiUrl}/auth/sign-in/`, {
        email,
        password,
      });

      if (response.data.key) {
        setUserDetails({
          email: email,
          oldemail: email,
          password: password,
          password1: password,
          // otp_validated: response.data.otp_enabled,
          mfa: response.data.mfa,
          sessionkey: response.data.key,
          kyc_verify: response.data.kyc_status,
        });

        localStorage.setItem("key", response.data.key);
        localStorage.setItem("otp_enabled", response.data.otp_enabled);
        localStorage.setItem("kyc_status", response.data.kyc_status);
        localStorage.setItem("mfa", response.data.mfa);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("oldemail", response.data.oldemail);
      }

      const authHeader = "Token " + sessionkey;

      console.log("Sign-in: ", response.data);

      if (response.data.otp_enabled === false) {
        console.log("Here 1");
        const otpResponse = await axios.post(
          `${apiUrl}/auth/otp/generate/`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader,
            },
          }
        );

        const { otpauth_url } = otpResponse.data;
        setOtpUrl(otpauth_url);
        navigate.push(
          `/auth/sign-up-5?otpauth_url=${encodeURIComponent(otpauth_url)}`
        );
      } else {
        console.log("Here 2");

        if (!sessionid) {
          navigate.push("/auth/mfa");
        } else {
          if (email === oldemail) {
            if (
              otp_validated.toString() === "true" &&
              otp_verify === "true"
              // kyc_verify === "approved"
            ) {
              setUserDetails({
                otp_validated: "true",
                otp_verify: "true",
                kyc_verify: "approved",
              });
              navigate.push("/dashboard");
            } else if (
              otp_validated.toString() === "false" ||
              otp_verify === "false"
            ) {
              const otpResponse = await axios.post(
                `${apiUrl}/auth/otp/generate/`,
                {},
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader,
                  },
                }
              );

              const { otpauth_url } = otpResponse.data;
              setOtpUrl(otpauth_url);
              navigate.push(
                `/auth/sign-up-5?otpauth_url=${encodeURIComponent(otpauth_url)}`
              );
            } else if (kyc_verify !== "approved") {
              const veriffResponse = await axios.post(
                `${apiUrl}/auth/kyc/verify`,
                {},
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader,
                  },
                }
              );

              const { verification_url } = veriffResponse.data;
              setVeriff(verification_url);

              if (veriffResponse.status === 200) {
                setError("Success. Logging in.");

                setUserDetails({
                  otp_validated: "true",
                  otp_verify: "true",
                  kyc_verify: "approved",
                });

                navigate.push(
                  `/auth/sign-up-4?verification_url=${encodeURIComponent(
                    verification_url
                  )}`
                );
              } else {
                setError("KYC verification failed.");
              }
            }
          }
          // else {
          //   navigate.push("/auth/mfa");
          // }
        }
      }
    } catch (error) {
      setError("Incorrect email or password.");
    } finally {
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
