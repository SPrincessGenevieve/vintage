"use client";

import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContentfulLivePreview } from '@contentful/live-preview';
import withAuth from "@/app/withAuth";

const space = process.env.CONTENTFUL_SPACE_ID;

// Create a QueryClient instance
const queryClient = new QueryClient();

function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Contentful Live Preview
    ContentfulLivePreview.init({
      space: space,       // Your Contentful space ID
      environment: 'master',        // Optional: Replace with your environment (e.g., 'master')
      locale: 'en-US',              // Required: Specify the locale (e.g., 'en-US')
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative h-full gap-2 flex flex-col bg-[#FCFCFC] ">
        {/* <PortfolioHeader /> */}
        <div className="flex-1 overflow-auto max-h-[calc(100vh-64px)]">
          {children}
        </div>
      </div>
    </QueryClientProvider>
  );
}
export default InsightsLayout;