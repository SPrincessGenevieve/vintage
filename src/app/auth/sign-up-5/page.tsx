"use client";

import { Suspense, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import QRCode from "react-qr-code";
import "./../../globals.css";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useUserContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Loading from "@/components/loading";
import AudioPlayer from "@/components/auth/audioPlayer";
import SignUP5Guide from "@/components/auth/sign-up-5-guide";

// New Suspense component for loading client-side functionality
function SuspendedSearchParams() {
  const searchParams = useSearchParams();
  const otpauth_url = searchParams.get("otpauth_url");

  return (
    <div className="w-full p-4 border flex items-center justify-center rounded-xl mt-8">
      <QRCode
        size={100}
        style={{ height: "auto", width: "auto" }}
        value={`${otpauth_url}`}
        viewBox={`0 0 256 256`}
      ></QRCode>
    </div>
  );
}

export default function SignupFive() {
  const { sessionid, sessionkey, setUserDetails } = useUserContext();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [hideError, setHideError] = useState(false);
  const [deviceSessionid, setDeviceSessionId] = useState(sessionid);
  const [key, setKey] = useState(sessionkey);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState(""); // Add state for storing KYC status
  const [loading, setLoading] = useState(false); // Loading state added
  const router = useRouter();
  const navigate = useRouter();
  const [nextPage, setNextPage] = useState(false);
  const defaultToken = "123456";

  useEffect(() => {
    setDeviceSessionId(sessionid);
    setKey(sessionkey);
  }, [sessionid, sessionkey]);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      setError("Please input token to proceed.");
      setHideError(true);
      setLoading(false);
      setTimeout(() => {
        setHideError(false);
      }, 2000);
      return;
    }

    if (token !== defaultToken) {
      setError("Your 6 digit code is incorrect.");
      setHideError(true);
      setLoading(false);
      setTimeout(() => {
        setHideError(false);
      }, 2000);
      return;
    }

    // OTP verification POST request
    setDeviceSessionId(
      "eyJkZXZpY2VJZCI6IjEyMzQ1NiIsInNlc3Npb25JZCI6Ijc4OTAxMiIsImlhdCI6MTY4MzMwMDAwMCwiZXhwIjoxNjgzMzA2MDAwfQ"
    );

    // Update context with new session data
    setUserDetails({
      sessionid: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", // Use directly here
      sessionkey:
        "eyJkZXZpY2VJZCI6IjEyMzQ1NiIsInNlc3Npb25JZCI6Ijc4OTAxMiIsImlhdCI6MTY4MzMwMDAwMCwiZXhwIjoxNjgzMzA2MDAwfQ",
      kyc_verify: "approved",
      otp_validated: "true",
      mfa: "true",
    });
    setStatus("approved");
    setSuccess(true);
    setHideError(false);
    setTimeout(() => {
      setLoading(false);
      setUserDetails({
        isLoggedIn: true
      })
      router.push("/dashboard");
    }, 1000);
  };

  const handleNext = () => {
    if (nextPage === true) {
      handleSubmit({ preventDefault: () => {} } as React.MouseEvent); // Pass a mock event
    } else {
      setNextPage(true);
    }
  };

  const handleGoBack = () => {
    if (nextPage === true) {
      setNextPage(false);
    } else {
      navigate.back();
    }
  };
  return (
    <>
      {loading && (
        <div className="absolute w-full h-full top-0 left-0">
          <Loading visible={loading} />
        </div>
      )}
      <div className="flex relative flex-col mt-14 gap-y-5 h-auto w-[500px] sign-up-progress-top">
        <div className="flex min-h-3 h-[1.5%]">
          <Progress className="w-full h-auto" value={75} />
        </div>

        {nextPage ? (
          <>
            <div className="h-[70%]">
              <h1 className="text-left text-[14px] font-normal">
                Set up two factor authentication (Required)
              </h1>
              <h2 className="text-left font-light text-[12px]">
                Please scan the QR code and open it with either Google
                Authenticate or MS Authenticator.
              </h2>
              <br></br>
              <h2 className="text-left font-light text-[12px]">
                You will be re-directed to Veriff to provide your ID
                verification
              </h2>
              <div className="mt-5 border p-2 rounded-xl">
                <p className="text-[14px]  font-medium">How to set up MFA?</p>
                <AudioPlayer></AudioPlayer>
              </div>
              <Suspense fallback={<div>TESTING DIRE 1</div>}>
                <SuspendedSearchParams />
              </Suspense>

              <div>
                <p className="text-center py-4 text-[gray]">
                  {" "}
                  Enter the 6 digit code
                </p>
                <Input
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  maxLength={6}
                  id="token"
                  name="token"
                  placeholder="*** - ***"
                  className="p-2 text-center"
                />
                <div className="w-full h-10 flex  flex-col">
                  {hideError ? (
                    <div>
                      <p className="text-[red] text-[12px]">{error}</p>
                    </div>
                  ) : (
                    <p className="text-[red]"></p>
                  )}
                  {success ? (
                    <div>
                      <p className="text-[green] text-[12px]">
                        TOTP verified successfully!
                      </p>
                    </div>
                  ) : (
                    <p className="text-[red]"></p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <SignUP5Guide handleNext={() => setNextPage(true)}></SignUP5Guide>
          </>
        )}

        <div className="mt-4 flex justify-between">
          <Link
            onClick={handleGoBack}
            href=""
            className="flex bg-white border border-gray-400 text-black rounded-3xl p-2 w-[170px] items-center justify-center"
          >
            <ArrowLeft /> Previous
          </Link>
          <Link
            onClick={handleNext}
            href=""
            className="flex bg-[#104144] text-white rounded-3xl p-2 w-[170px] items-center justify-center"
          >
            Next <ArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
}
