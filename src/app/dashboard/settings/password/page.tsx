'use client'
import withAuth from "@/app/withAuth";
import PasswordForm from "@/components/settings/password-form";

function Password() {
  return (
    <div className="container max-w-screen-sm">
      <PasswordForm />
    </div>
  );
}
export default withAuth(Password)