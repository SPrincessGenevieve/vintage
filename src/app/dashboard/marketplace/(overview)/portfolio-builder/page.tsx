"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import WineCard from "@/components/marketplace/wines-card";
import PortfolioWineCard from "@/components/portfolio/portfolio-wine-card";
import PortfolioBuilderForm from "@/components/marketplace/portfolio-builder-form";
import { useState } from "react";
import withAuth from "@/app/withAuth";
import PortfolioBuilderHeader from "@/components/marketplace/portfolio-builder-header";
import InvestmentLevelSelect from "@/components/marketplace/investment-level-select";

function MarketplacePortfolioBuilder() {
  const [showWines, setShowWines] = useState<boolean>(false);

  return (
    <div className="w-full h-auto">
      {/* <InvestmentLevelSelect></InvestmentLevelSelect> */}
      <PortfolioBuilderForm />
    </div>
  );
}
export default withAuth(MarketplacePortfolioBuilder);
