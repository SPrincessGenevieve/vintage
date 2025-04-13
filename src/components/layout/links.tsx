import DashIcon from "@/images/dashboard";
import MarketIcon from "@/images/market";
import MarketReportIcon from "@/images/market-report";
import PortIcon from "@/images/port";
import StorageIcon from "@/images/storage";
import {
  LayoutDashboard,
  ChartColumnIncreasing,
  Box,
  Wine,
  ChartPie,
  ChartNoAxesCombined,
  SearchCheck,
} from "lucide-react";

export const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <DashIcon strokeColor="white"/>,
  },
  {
    name: "Portfolio",
    href: "/dashboard/portfolio",
    icon: <PortIcon strokeColor="white" />,
  },
  {
    name: "Marketplace",
    href: "/dashboard/marketplace",
    icon: <MarketIcon strokeColor="white"/>,
  },
  {
    name: "Storage",
    href: "/dashboard/storage",
    icon: <StorageIcon strokeColor="white"/>,
  },
  // {
  //   name: "Market Report",
  //   href: "/dashboard/market-report",
  //   icon: <MarketReportIcon strokeColorColor="white"/>,
  // },
  {
    name: "Insights",
    href: "/dashboard/insights",
    icon: <SearchCheck height={20} strokeWidth={1.3} />,
  },
  {
    name: "Indicies",
    href: "/dashboard/indicies",
    icon: <ChartNoAxesCombined height={20} strokeWidth={1.3} />,
  },
];
