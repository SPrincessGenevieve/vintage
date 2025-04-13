import MFASixDigitForm from "@/components/auth/mfa-six-digit-form";
import MobileAppsLinks from "@/components/auth/mobile-apps-links";
import './../../globals.css'

export default function MFA() {
  return (
    <div className="mt-14 w-full flex flex-col items-center">
      <div className=" mfa-cont w-[70%] h-full flex flex-col justify-center">
        <h1 className="text-center text-[16px] font-normal">
        Enter the 6-digit code from your Google Authenticator, Microsoft Authenticator, or any other authenticator app
        </h1>
        <div className="mt-6">
          <MFASixDigitForm />
        </div>
      </div>
      <div className="mt-40 mobile-app-store w-full">
        <MobileAppsLinks />
      </div>
    </div>
  );
}
