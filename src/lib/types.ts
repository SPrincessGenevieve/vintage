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

export type HeaderContentItem = {
  title: string;
  content: JSX.Element;
};

export type WineCardT = {
  id: string;
  description: string;
  image: string | StaticImageData;
  type: string;
  price: number;
  name: string;
  full_name: string;
  market_value: number;
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
  gain_loss_percent: number
  gain_loss: number
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
  market_value: number;
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
