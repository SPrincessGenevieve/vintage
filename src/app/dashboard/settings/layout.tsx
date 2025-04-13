"use client";

import SettingsHeader from "@/components/settings/settings-header";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full bg-white">
      {/* Settings header */}
      <SettingsHeader />
        <div className="p-4 bg-[white]">{children}</div>
    </div>
  );
}
