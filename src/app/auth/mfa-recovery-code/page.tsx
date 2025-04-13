import MFARecoveryCodeForm from "@/components/auth/mfa-recovery-email-code";
import MobileAppsLinks from "@/components/auth/mobile-apps-links";

export default function MFARecoveryEmail() {
  return (
    <div className="mt-14">
      <div className="mt-14">
        <h1 className="text-center text-lg font-normal">
          Recovery code method
        </h1>
        <h2 className="text-center mt-4 font-light text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </h2>
        <div className="mt-12">
          <MFARecoveryCodeForm />
        </div>
      </div>
      <div className="mt-52">
        <MobileAppsLinks />
      </div>
    </div>
  );
}
