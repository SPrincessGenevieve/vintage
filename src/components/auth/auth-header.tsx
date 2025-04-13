import Image from "next/image";
import AuthImageHeader from "@/images/auth-header.png";

export default function AuthHeader() {
  return (
    <div className="w-full flex justify-center pt-8">
      <Image
        src={AuthImageHeader}
        alt="auth-header"
        height={250}
        width={250}
        className="w-auto h-auto max-h-[10vh]"
        priority 
      />
    </div>
  );
}
