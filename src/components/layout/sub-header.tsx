import React from "react";
import Link from "next/link";
import { Workflow } from "lucide-react";
import BagdeLevel from "../bagde-level";
import { usePathname } from "next/navigation";

import DashboardHeader from "../dashboard/dashboard-header";
import MarketplaceHeader from "../marketplace/marketplace-header";
import MarketHeader from "../marketplace/market-header";
import PortfolioHeader from "../portfolio/portfolio-header";
import PortfolioChildHeader from "../portfolio/portfolio-child-header";
import StorageHeader from "../storage/storage-header";
import InsightsHeader from "../insights/insights-header";
import CheckoutHeader from "../checkout/checkout-header";
import OrderHeader from "../orders/order-header";
import IndicesHeader from "../indices/indices-header";
import InsightsSubHeader from "../insights/insights-sub-header";
import { useUserContext } from "@/app/context/UserContext";
import PortfolioBuilderHeader from "../marketplace/portfolio-builder-header";

interface hideType {
  hidden: boolean;
}

export default function SubHeader({ hidden = false }: hideType) {
  const pathname = usePathname();

  const { portfolio_subpage, marketplace_subpage, insights_subpage } =
    useUserContext();

  // Conditionally render header based on current path
  const renderHeader = () => {
    if (pathname === "/dashboard") {
      return <DashboardHeader />;
    } else if (pathname === "/dashboard/marketplace") {
      return <MarketplaceHeader />;
    } else if (pathname === "/dashboard/marketplace/rare") {
      return <MarketplaceHeader />;
    } else if (pathname === "/dashboard/marketplace/region") {
      return <MarketplaceHeader />;
    } else if (pathname === "/dashboard/marketplace/special-volume") {
      return <MarketplaceHeader />;
    } else if (pathname === "/dashboard/marketplace/special-bundles") {
      return <MarketplaceHeader />;
    } else if (pathname === "/dashboard/marketplace/assortments") {
      return <MarketplaceHeader />;
    } else if (pathname === "/dashboard/portfolio") {
      return <PortfolioHeader />;
    } else if (pathname === "/dashboard/storage") {
      return <StorageHeader />;
    } else if (pathname === "/dashboard/insights") {
      return <InsightsHeader />;
    } else if (/^\/dashboard\/insights\/\d+/.test(pathname)) {
      return <InsightsSubHeader insightPage={insights_subpage} />;
    } else if (pathname === "/dashboard/orders") {
      return <OrderHeader />;
    } else if (pathname === "/dashboard/orders/checkout") {
      return <CheckoutHeader />;
    } else if (pathname === "/dashboard/marketplace/portfolio-builder") {
      return <PortfolioBuilderHeader />;
    } else if (pathname === "/dashboard/indicies") {
      return <IndicesHeader />;
    }
    return null;
  };

  return (
    <div className={`h-[100px] mr-2 bg-white ${hidden ? "hidden" : ""}`}>
      <div className=" flex items-center justify-between border-b border-l pr-4 h-full">
        {renderHeader()}
        <BagdeLevel />
      </div>
    </div>
  );
}
