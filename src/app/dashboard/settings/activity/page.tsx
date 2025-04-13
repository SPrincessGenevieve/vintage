'use client'
import ActivityTable from "@/components/settings/activity-table";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Suspense } from "react";
import withAuth from "@/app/withAuth";

function Activity() {
  return (
    <div>
      
      <div className="mt-5">
        <ActivityTable />
      </div>
    </div>
  );
}
export default withAuth(Activity)