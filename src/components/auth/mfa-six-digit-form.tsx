"use client";

import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Loading from "../loading";

export default function MFASixDigitForm() {
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

  const [device, setDevice] = useState("");
  const router = useRouter();
  const [veriff, setVeriff] = useState<string | null>(null);
  const navigate = useRouter();
  const [loading, setLoading] = useState(false); // Loading state added

  const [kycValue, setKycValue] = useState(kyc_verify);
  const [optValidatedValue, setOptValidated] = useState(otp_validated);
  const [optVerifyValue, setOptVerifyValue] = useState(otp_verify);
  const [mfaValue, setMfaValue] = useState(mfa);

  useEffect(() => {
    setDeviceSessionId(sessionid);
    setKey(sessionkey);
  }, [sessionid, sessionkey]);

  const handleSubmit = async (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault(); // Only preventDefault if the event is present
    setLoading(true);

    setLoading(true);
    if (!token || token.length !== 6) {
      setError("Please enter a valid 6-digit code");
      setHideError(true);
      return;
    }

    const data = {
      token,
    };

    try {
      // OTP verification POST request
      console.log("MY TOKEN: ", token);
      const authHeader = "Token " + sessionkey; // Basic Authentication header // Keep Basic if documentation says Basic Auth is needed

      const otpResponse = await axios.post(
        `${apiUrl}/auth/otp/validate/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
            "Device-Session-Id": device,
          },
        }
      );

      setDeviceSessionId(otpResponse.data.device_session_id);

      console.log("\n\nRESPONSE: ", otpResponse.data);
      console.log("KYC STATUS: ", kyc_verify);

      if (kyc_verify === "PENDING") {
        const authHeader = "Token " + sessionkey;

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
          setUserDetails({
            sessionid: otpResponse.data.new_session_id,
          });

          console.log(
            "PAGE 5: DEVICE CONTEXT",
            otpResponse.data.new_session_id
          );

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
        if (otpResponse.data.detail === "Validated") {
          console.log("SUCCESS VALIDATED");
          console.log(otp_verify);
          console.log(otp_validated);
          console.log(kyc_verify);

          setUserDetails({
            otp_verify: "true",
            otp_validated: "true",
            sessionid: otpResponse.data.new_session_id,
          });
          // Access device_session_id from headers
          setDeviceSessionId(otpResponse.data.new_session_id);

          navigate.push("/dashboard");
          //   if (otp_validated.toString() === "true") {
          //     // if (otp_validated.toString() === "true" && kyc_verify === "approved") {
          //     setUserDetails({
          //       otp_verify: "true",
          //       otp_validated: "true",
          //       sessionid: otpResponse.data.new_session_id,
          //     });
          //     // Access device_session_id from headers
          //     setDeviceSessionId(otpResponse.data.new_session_id);

          //     navigate.push("/dashboard");
          //   }
          // } else {
          //   console.log("SOMETHING IS KULANG");
          //   console.log("OTP Validate: ", otp_validated);
          //   console.log("OTP Verify: ", otp_verify);
          //   console.log("KYC Status: ", kyc_verify);
        } else {
          console.log("SOMETHING IS KULANG");
          console.log("OTP Validate: ", otp_validated);
          console.log("OTP Verify: ", otp_verify);
          console.log("KYC Status: ", kyc_verify);
        }
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error response data: ", error.response.data); // Check full response data
        console.error("Status: ", error.response.status); // Check the status code
        setError(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else {
        console.error("Error details: ", error.message);
      }
      setHideError(true);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSubmit(); // Simulate button click on Enter key press
    }
  };

  return (
    <>
      {/* Show the Loading screen when loading is true */}
      {loading && (
        <div className="absolute w-full h-full top-0 left-0">
          <Loading visible={loading} />
        </div>
      )}
      <div className="flex relative flex-col mt-14 gap-y-5 h-auto w-full sign-up-progress-top">
        <div className="h-[70%]">
          <div>
            <Input
              onKeyDown={handleKeyDown}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              maxLength={6}
              id="token"
              name="token"
              placeholder="*** - ***"
              className="p-2 text-center"
            />
            <div className="w-full h-10 flex items-center">
              {hideError ? (
                <div>
                  <p className="text-[red]">{error}</p>
                </div>
              ) : (
                <p className="text-[red]"></p>
              )}
              {success ? (
                <div>
                  <p className="text-[green]">TOTP verified successfully!</p>
                </div>
              ) : (
                <p className="text-[red]"></p>
              )}
            </div>
          </div>
        </div>
        <div className="w-auto">
          <p className="text-muted-foreground text-[11px]">
            <Link className="" href="/auth/otp">
              Have you lost access to your Authenticator? Recover{" "}
            </Link>
          </p>
        </div>
        <Button onClick={handleSubmit} className="w-full text-[16px]">
          Login <ArrowRight></ArrowRight>
        </Button>
      </div>
    </>
  );
}
