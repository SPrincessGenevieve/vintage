import Image from "next/image";
import QRCode from "@/images/qr-code.png";
import MFARecoveryCodeForm from "@/components/auth/mfa-recovery-email-code";

export default function NewMFA() {
  return (
    <div className="mt-14">
      <h1 className="text-left text-lg font-normal">
        Set up new two factor authentication (Required)
      </h1>
      <p className="font-light mt-4 text-sm">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </p>
      <div className="border flex items-center justify-center rounded-2xl mt-6 p-4">
        <Image src={QRCode} alt="qr-code" className="h-50" />
      </div>
      <div className="mt-14">
        <MFARecoveryCodeForm />
      </div>
    </div>
  );
}
