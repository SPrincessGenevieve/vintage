import Image from "next/image";
import GreenCheck from "@/images/green_check.png";

export default function RecoverySuccess() {
  return (
    <div className="mt-14">
      <h1 className="text-lg font-normal text-center">
        Recovery success
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
        Redirecting within few seconds...
      </h1>
    </div>
  );
}
