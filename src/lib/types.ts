import { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { StaticImageData } from "next/image";
import type { ReactImageGalleryItem } from "react-image-gallery";

export type NotificationCardT = {
  image: string | StaticImageData;
  title: string;
  desc: string;
  date: string;
  price: number | null;
  responded: boolean;
};


export type WineCardT = {
  id: string;
  description: string;
  image: string | StaticImageData;
  type: string;
  price: number;
  name: string;
  full_name: string;
  market_value: string | number;
  invested: number;
  score: number;
  case_size: string;
  status: string;
  recommended_holding: string;
  stars: number;
  growth: number;
  sale: number;
  from: string;
  alcohol_abv: string;
  blend: string;
  grapes: string;
  maturation: string;
  ownership: string;
  vintage: string;
  num_cases: number;
  gain_loss_percent: number;
  gain_loss: number;
};

export type ImageSliderProps = {
  images: ReactImageGalleryItem[];
  autoPlay?: boolean;
  slideInterval?: number;
  showThumbnails?: boolean;
  showFullscreenButton?: boolean;
  showPlayButton?: boolean;
};

export type ChartDataT = {
  date: string;
  category_a: number;
  category_b: number;
};

export interface PortfolioDataProps {
  picture: string;
  name: string;
  market_value: string | number;
  invested: number;
  case_size: string;
  status: string;
  type: string;
  price: number;
}

export type StatisticMockProp = {
  icon: StaticImageData;
  title: string;
  subtitle: string;
  color: string;
};

export type InvestmentType = {
  id: number;
  investment: string;
  wine_vintage: number | null;
  quantity: number;
  case_size: number;
  market_value: string | number;
  profit_lost: number;
  profit_lost_by_percent: number;
  investment_status: string;
  quantity_to_sell: number;
  quantity_to_transfer: number;
  bottle_size: null | string;
  sub_account: null | string;
  wine_parent: null | {
    id: number;
    lwin7: string;
    name: string;
    fromm: string;
    red_wine: string;
    grapes: string;
    pair_with: string;
    region_of_appellation: string;
    alcohol_abv: string;
    sweetness: string;
    blend: string;
    maturation: string;
    ownership: string;
    closure_type: string;
    grape_variety: string;
    region: string;
    winery: string;
    images: string[];
  };
  wine_vintage_details: null | {
    id: number;
    lwin11: string;
    name: string;
    vintage: number;
    release_price: number | string;
    wine: number;
    rp_score: string;
    rp_released: string;
    rp_tasting_notes: string;
    rp_reviewer: string;
    holding_years: string;
    liv_ex_value: string;
    is_listed: boolean;
    size: string;
    status: string;
    drinking_window: string;
    market_value: string | number;
    tags: string;
    processed_case: number;
    bottle_size: string;
    oldest_vintage: number;
    mean: string;
    median: string;
    is_user_investment: boolean;
    is_very_special: boolean;
    available_case_size: number[];
  };
  created_at: string;
  basket_details: null | {
    id: number;
    name: string;
    image: string | StaticImageData | undefined;
    region: string;
    fromm: string;
    grape_variety: string;
    grapes: string;
    special_id: null | string;
    is_assortment: boolean;
  };
  basket_items: null | Array<{
    id: number;
    quantity: number;
    wine_parent_id: number;
    case_size: number;
    basket_bottle_size: string;
    wine_vintage: {
      id: number;
      lwin11: string;
      name: string;
      vintage: number;
      release_price: string | number;
      wine: number;
      rp_score: string;
      rp_released: string;
      rp_tasting_notes: string;
      rp_reviewer: string;
      holding_years: string;
      liv_ex_value: string;
      is_listed: boolean;
      size: string;
      status: string;
      drinking_window: string;
      market_value: string | number;
      tags: string;
      processed_case: number;
      bottle_size: string;
      oldest_vintage: number;
      mean: string;
      median: string;
      is_user_investment: boolean;
      is_very_special: boolean;
      available_case_size: number[];
    };
    wine_images: string[];
  }>;

  is_special_volumes: boolean;
};
