import MobileAppsLinks from "@/components/auth/mobile-apps-links";
import { Mail } from "lucide-react";
import Link from "next/link";
import Burger from "@/icons/burger.svg";

export default function MFARecoveryMethods() {
  return (
    <div className="mt-14">
      <h1 className="text-center text-lg font-normal">Recovery methods</h1>
      <h2 className="text-center mt-4 font-light text-sm">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </h2>
      <div className="flex items-center justify-center mt-20">
        <div className="flex flex-col gap-6">
          <Link href="/auth/mfa" className="flex items-center gap-3">
            <Burger />
            <div>
              <h2 className="text-sm">Recovery code</h2>
              <p className="text-muted-foreground text-xs">
                To match your face to your ID photo
              </p>
            </div>
          </Link>
          <Link href="/auth/mfa-recovery-email" className="flex items-center gap-3">
            <Mail size={35} strokeWidth={1.5} />
            <div>
              <h2 className="text-sm">Email</h2>
              <p className="text-muted-foreground text-xs">
                To match your face to your ID photo
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-60">
        <MobileAppsLinks />
      </div>
    </div>
  );
}
