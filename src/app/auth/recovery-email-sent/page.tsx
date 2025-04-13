import MobileAppsLinks from "@/components/auth/mobile-apps-links";
import Image from "next/image";
import GreenCheck from "@/images/green_check.png";

export default function RecoveryEmailSent() {
  return (
    <div className="mt-14">
      <h1 className="text-lg font-normal text-center">
        Recovery email send with link
      </h1>
      <p className="font-light mt-4 text-sm">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </p>
      <div className="flex justify-center mt-16">
        <Image src={GreenCheck} className="h-50" alt="" />
      </div>
      <h1 className="text-center text-muted-foreground mt-10">
        Please check your email
      </h1>
      <div className="mt-44">
        <MobileAppsLinks />
      </div>
    </div>
  );
}
