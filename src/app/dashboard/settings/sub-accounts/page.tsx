'use client'
import withAuth from "@/app/withAuth";
import SubAccountsTable from "@/components/settings/sub-accounts-table";

function SubAccounts() {
  return (
    <div>
      <SubAccountsTable />
    </div>
  );
}
export default withAuth(SubAccounts)