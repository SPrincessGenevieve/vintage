"use client";

import { Suspense, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import SignupFormFive from "@/components/auth/sign-up-form-5";
import QRCode from "react-qr-code";
import Image from "next/image";
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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const {
    email,
    password1,
    sessionid,
    sessionkey,
    kyc_verify,
    otp_validated,
    otp_verify,
    mfa,
    setUserDetails,
  } = useUserContext();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [hideError, setHideError] = useState(false);
  const [deviceSessionid, setDeviceSessionId] = useState(sessionid);
  const [key, setKey] = useState(sessionkey);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState(""); // Add state for storing KYC status
  const [loading, setLoading] = useState(false); // Loading state added

  const router = useRouter();
  const [veriff, setVeriff] = useState<string | null>(null);
  const navigate = useRouter();

  const [kycValue, setKycValue] = useState(kyc_verify);
  const [optValidatedValue, setOptValidated] = useState(otp_validated);
  const [optVerifyValue, setOptVerifyValue] = useState(otp_verify);
  const [mfaValue, setMfaValue] = useState(mfa);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    setDeviceSessionId(sessionid);
    setKey(sessionkey);
  }, [sessionid, sessionkey]);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!token || token.length !== 6) {
      setError("Please enter a valid 6-digit code");
      setHideError(true);
      return;
    }

    const data = {
      email,
      password: password1,
      token,
    };

    try {
      // OTP verification POST request
      const authHeader = "Token " + sessionkey; // Basic Authentication header

      const otpResponse = await axios.post(`${apiUrl}/auth/otp/verify/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      const validateResponse = await axios.post(
        `${apiUrl}/auth/otp/validate/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );

      setDeviceSessionId(otpResponse.data.device_session_id);

      if (otpResponse.status === 200) {
        // OTP verified, now sign in
        console.log("Verified successfully");
        console.log(otpResponse);
        console.log("Validated successfully");
        console.log(validateResponse);

        const signInResponse = await axios.post(
          `${apiUrl}/auth/sign-in/`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader,
            },
          }
        );

        if (signInResponse.status === 200) {
          const { device_session_id, kyc_status, mfa, otp_enabled } =
            signInResponse.data;

          // Update context with new session data
          setUserDetails({
            sessionid: otpResponse.data.device_session_id, // Use directly here
            sessionkey: signInResponse.data.key,
            kyc_verify: kyc_status,
            otp_validated: otp_enabled,
            mfa,
          });

          // Fetch KYC verification status after successful sign-in
          const kycResponse = await axios.post(
            `${apiUrl}/auth/kyc/verify`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
              },
            }
          );

          if (kycResponse.status === 200 || kycResponse.status === 201) {
            setStatus(kycResponse.data.status);
            setSuccess(true);
            setHideError(false);

            console.log(
              "PAGE 5: DEVICE CONTEXT",
              otpResponse.data.device_session_id
            );
            console.log("PAGE 5: DEVICE", otpResponse.data.device_session_id);
            console.log("PAGE 5: ", signInResponse.data.key);

            // Navigate to next step
            router.push(
              `/auth/sign-up-4?verification_url=${encodeURIComponent(
                kycResponse.data.verification_url
              )}`
            );
          } else {
            setError("");
            setHideError(true);
          }
        } else {
          setError("Sign-in failed. Please try again.");
          setHideError(true);
        }
      }
    } catch (error: any) {
      setError("An error occurred. Please try again.");
      setHideError(true);
      console.error("Submission failed:", error);
    } finally {
      setLoading(false);
    }
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
