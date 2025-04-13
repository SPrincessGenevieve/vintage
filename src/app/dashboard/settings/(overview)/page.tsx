'use client'

import withAuth from "@/app/withAuth";
import GeneralForm from "@/components/settings/general-form";

function General() {
  return (
    <div className="container flex h-full w-full max-w-[75vh] ">
      <GeneralForm />
    </div>
  );
}
export default withAuth(General)