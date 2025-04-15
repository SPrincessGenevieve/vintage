"use client";
import { number } from "echarts";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

type PortfolioPerformanceType = {
  date: string;
  value: number | null;
};

type InvestmentType = {
  wine_name: string;
  vintage: number;
  wine_images: string | File | null;
  held: string;
  wines_investment_value: number | null;
};

type TransactionsType = {};

type RequestType = {
  id: number;
  owner: number;
  owner_email: string;
  time_stamp: string;
  status: string;
  action: string;
  lwin11: string;
  wine_name: string;
  case_size: number;
  quantity: number | null;
  basket_name: number | null;
  puchase_price: number | null;
  event_time: string;
  vintage: string;
};

type WineImageType = {
  id: number | null;
  image: string;
  wine: number | null;
};

export type VintageWineType = {
  id: number;
  lwin11: string;
  name: string;
  description: string;
  vintage: number;
  wine: number;
  rp_score: string;
  release_price: string;
  rp_released: string;
  rp_tasting_notes: string;
  rp_reviewer: string;
  holding_years: string;
  liv_ex_value: number | null;
  is_listed: boolean;
  size: string;
  status: string;
  drinking_window: string;
  market_value: string;
  bottle_size: string;
  tags: string;
  processed_case: number | null;
  oldest_vintage: number;
  mean: string;
  median: string;
  investment_id: number;
  is_user_investment: boolean;
  is_very_special: boolean;
  available_case_size: number[];
  is_available: boolean;
};

export type CartItemsType = {
  id: number;
  case_size: number;
  quantity: number;
  stock_wine_vintage: VintageWineType;
  user_investment_wine_vintage: VintageWineType;
  short_description: string;
  is_user_investment: boolean;
  images: string[];
  is_special_volumes: boolean;
  is_available: boolean;
  basket: {
    id: 0;
    name: string;
    quantity: number;
    market_value: number;
    case_size: number;
    winery: string;
    region: string;
    grape_variety: string;
    image: string;
    special_id: null | number;
    is_assortment: boolean;
  };
};

export type PaymentMethodType = {
  id: number;
  brand: string;
  exp_month: string;
  exp_year: string;
  last4: string;
  is_default: boolean;
  stripe_payment_method_id: string;
};

export type SpecialBundlesList = {
  id: number;
  name: string;
  vintage: number;
  market_value: number;
  quantity: number;
  case_size: number;
  winery: string;
  region: string;
  grape_variety: string;
  fromm: string;
  image: string;
  special_id: string;
  is_assortment: boolean;
};

export type SpecialBundleDetails = {
  id: number;
  quantity: number;
  case_size: number;
  basket_bottle_size: string;
  wine_vintage: VintageWineType;
  wine_images: string[];
};

export type AssortmentList = {
  id: number;
  name: string;
  vintage: number;
  market_value: number;
  quantity: number;
  case_size: number;
  winery: string;
  region: string;
  grape_variety: string;
  fromm: string;
  image: string;
  special_id: string;
  is_assortment: boolean;
};

export type AssortmentDetails = {
  id: number;
  quantity: number;
  case_size: number;
  basket_bottle_size: string;
  wine_vintage: VintageWineType;
  wine_images: string[];
};

export type BigBottlesListType = {
  id: number | null;
  name: string;
  wine_images: string[];
  quantity: number;
  is_owner: boolean;
  price: string | number;
  vintage: number;
  fromm: string;
  oldest_vintage: number;
  bottle_size: string[];
};

export type BigBottlesVintage = {
  vintage: WineDetailsBigBottleType;
  parent: WineParentBigBottleType;
};

export type WineDetailsBigBottleType = {
  id: number;
  lwin11: string;
  name: string;
  vintage: number;
  wine: number;
  rp_score: string;
  release_price: string;
  rp_released: string;
  rp_tasting_notes: string;
  rp_reviewer: string;
  holding_years: string;
  liv_ex_value: string;
  is_listed: boolean;
  size: string;
  status: string;
  drinking_window: string;
  market_value: string;
  tags: string;
  processed_case: number | null;
  bottle_size: string;
  oldest_vintage: number;
  mean: string;
  median: string;
  available_case_size: number[];
  is_user_investment: boolean;
};

export type WineParentBigBottleType = {
  id: number;
  lwin7: string;
  name: string;
  fromm: string;
  red_wine: string;
  grapes: string;
  maturation: string;
  pair_with: string;
  region_of_appellation: string;
  alcohol_abv: string;
  sweetness: string;
  blend: string;
  ownership: string;
  closure_type: string;
  grape_variety: string;
  region: string;
  winery: string;
  images: string[];
  wine_images: string[];
  oldest_vintage: number;
  maximum_price: number;
};

export type WineType = {
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
  wine_images: string | File | null;
  ownership: string;
  closure_type: string;
  wine_vintages: VintageWineType[];
  basket: any[];
  for_sale: any[];
  grape_variety: string;
  region: string;
  winery: string;
  maximum_price: number;
  oldest_vintage: number;
};

export type WineParentType = {
  id: number | null;
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
  wine_images: string[];
};

export type PortfolioType = {
  id: number | null;
  investment: string;
  wine_vintage: number | null;
  quantity: number;
  case_size: number | null;
  market_value: number | null;
  profit_lost: number;
  profit_lost_by_percent: number;
  investment_status: string;
  quantity_to_sell: number;
  quantity_to_transfer: number;
  sub_account: string;
  wine_parent: WineParentType;
  wine_vintage_details: VintageWineType;
  created_at: string;
  basket_details: {
    id: number;
    name: string;
    image: string;
  };
  basket_items: SpecialBundleDetails[];
  is_special_volumes: boolean;
};

export type InvestmentListType = {
  id: number | null;
  wine_name: string;
  investment: string;
  wine_vintage: number | null;
  quantity: number;
  case_size: number | null;
  market_value: number | null;
  profit_lost: number;
  profit_lost_by_percent: number;
  bottle_size: string;
  investment_status: string;
  quantity_to_sell: number;
  quantity_to_transfer: number;
  sub_account: string;
  vintage: number;
  wine_image: string | StaticImport;
  wine_vintage_details: VintageWineType;
  wine_parent: WineParentType;
  basket_details: {
    id: number;
    name: string;
    image: string;
  };
  basket_items: SpecialBundleDetails[];
};

export type BundleDetailsType = {
  id: number | null;
  investment: string;
  wine_vintage: number | null;
  quantity: number;
  case_size: number | null;
  market_value: number | null;
  profit_lost: number;
  profit_lost_by_percent: number;
  investment_status: string;
  quantity_to_sell: number;
  quantity_to_transfer: number;
  sub_account: string;
  created_at: string;
  basket_details: {
    id: number;
    name: string;
    image: string;
    winery: string;
    region: string;
    special_id: null | number;
    is_assortment: boolean;
  };
  basket_items: SpecialBundleDetails[];
};

export type MarketplaceInvest = {
  investment_id: number;
  case_size: number;
  quantity: number;
  is_owner: boolean;
  market_value: number;
  wine_vintage_details: VintageWineType;
  wine_parent: WineParentType;
  basket_details: {
    id: number;
    name: string;
    image: string;
    winery: string;
    region: string;
    special_id: null;
    is_assortment: false;
  };
};

export type LevelInfoType = {
  level: number;
  name: string;
  fee: number;
};

export type NotificationType = {
  id: number;
  title: string;
  link: null;
  type: string;
  user: string;
  investment: number;
  market_price: number;
  quantity: number;
  wine_image: string;
  image: string;
  created_at: string;
  action: string;
  isRead: boolean;
  is_gift: boolean;
};

export type SubAccountType = {
  id: number | null;
  first_name: string;
  last_name: string;
  birth_date: string;
  created_at: string;
  profile_picture: string;
  relationship: string | null;
  user: number;
};

export type SubAccountInvestments = {
  wine_name: string;
  wine_images: [string];
  wines_investment_value: number;
  held: string;
};

export type SubAccountList = {
  sub_account_info: SubAccountType;
  portfolio_performance: PortfolioPerformanceType[];
  current_market_value: number;
  assets_by_region: { [region: string]: number };
  case_due: number;
  profit_loss: number;
  total_case: number;
  investments: InvestmentType[];
  total_investments: number;
  cases_sold: number;
  profit_loss_money: number;
};

export type UserType = {
  is_admin: boolean;
  birth_date: string;
  dashboard_title: string;
  dashboard_value: number | string;
  state: string;
  country: string;
  city: string;
  street_address: string;
  postal_code: string;
  is_superuser: boolean;
  email: string;
  balance: string;
  created_at: string;
  updated_at: string;
  phone_number: string;
  budget: number;
  investment_time: string;
  invested_before: boolean;
  nearest_office: string | null;
  first_name: string;
  last_name: string;
  pk: number;
  profile_picture: string;
  request: RequestType[];
  transactions: TransactionsType[];
  investment: InvestmentType[];
  total_case: number;
  assets_by_region: { [region: string]: number };
  total_investments: string;
  life_time_investment: number;
  total_withdrawn: string;
  total_withdrawn_state: string;
  case_due_state: number;
  is_old_user: number;
  old_fee: string;
  level_info: LevelInfoType[];
  portfolio_performance: PortfolioPerformanceType[];
  current_market_value: number;
  investments: SubAccountInvestments[];
  case_due: number;
  profit_loss: number;
  notifications: NotificationType[];
  payment_methods: PaymentMethodType[];
  current_investment: number;
  sub_accounts: SubAccountType[];
  signed_agreement: boolean;
  paid_fee: number;
  cases_sold: number;
  profit_loss_money: number;
};

export type GuestType = {
  id: number;
  user: number;
  participants: number;
};

export type EventListType = {
  pk: string;
  name: string;
  date: string;
  status: string;
  limit: number;
  total_participants: number;
  guests: GuestType[];
};

export type IndiciesType = {
  id: number;
  name: string;
  description: string;
  is_processed: boolean;
  current_value: string;
  mom: string;
  ytd: string;
  one_years: string;
  two_years: string;
  five_years: string;
  chart_data: {
    yearly: [
      {
        id: number;
        date: string;
        value: number;
      }
    ];
    monthly: [
      {
        id: number;
        date: string;
        value: number;
      }
    ];
  };
};

export type CalculationType = {
  name: string;
  description: string;
  image: string;
  price: number | string;
  total_price: number | string;
  wine_vintage: number;
  cart_id: number;
  request_photo: boolean;
  quantity: number;
  user_investment: boolean;
  bottle_size: string;
  investment_id: null | number;
  total_investment: number;
  case_size: number;
  is_special_volumes: boolean;
  basket: {
    id: 0;
    name: string;
    quantity: number;
    case_size: number;
    winery: string;
    region: string;
    grape_variety: string;
    image: string;
    special_id: null | number;
    is_assortment: boolean;
  };
};

export type LinkAccountType = {
  link_token: string;
  expiration: string;
  request_id: string;
};

export type DataPointsDetails = {
  id: number;
  value: string;
  date: string;
  wine: number;
  performance: number;
};

export type DataPointsType = {
  yearly: DataPointsDetails[];
  monthly: DataPointsDetails[];
};

export type PortfolioBuilderType = {
  id: number;
  name: string;
  lwin11: string;
  vintage: number;
  drinking_window_start: number;
  drinking_window_end: number;
  rp_score: string;
  release_price: string;
  fromm: string;
  market_value: number;
  images: string[];
  bottle_size: string;
  case_size: number;
  quantity: number;
  holding_years: string;
};

type UserContextType = {
  link_account: LinkAccountType;
  calculation_list: CalculationType[];
  data_points: {
    yearly: DataPointsDetails[];
    monthly: DataPointsDetails[];
  };
  portfolio_builder: {
    wines: PortfolioBuilderType[];
    total_market_value: number;
    final_allocation: number;
    remaining_budget: number;
  };
  isSubAccount: boolean;
  email: string;
  subAccountID: number;
  subAccountUser: number;
  oldemail: string;
  password: string;
  password1: string;
  password2: string;
  phone_number: string;
  budget: number;
  investment_time: string;
  invested_before: boolean;
  otpauth_url?: string;
  first_name: string;
  last_name: string;
  sessionid: string;
  sessionkey: string;
  mfa: string;
  otp_verify: string;
  otp_validated: string;
  kyc_verify: string;
  profile_picture: string | File | null;
  request: RequestType[];
  investment: InvestmentType[];
  portfolio_performance: PortfolioPerformanceType[];
  transactions: TransactionsType[];
  assets_by_region: { [region: string]: number };
  phoneNumber: string;
  balance: string;
  total_investments: string;
  life_time_investment: number;
  total_withdrawn: string;
  total_withdrawn_state: string;
  case_due_state: number;
  old_fee: string;
  level: number | null;
  current_market_value: number | null;
  case_due: number | null;
  profit_loss: number | null;
  total_case: number | null;
  wine_marketplace: WineType[];
  wine_image: WineImageType[];
  wine_vintages: VintageWineType[];
  portfolio: PortfolioType[];
  yearSelect: number;
  level_info: LevelInfoType;
  wine_parent: WineParentType[];
  portfolio_subpage: string;
  marketplace_subpage: string;
  insights_subpage: string;
  pay_method: PaymentMethodType[];
  row_count_portfolio: number;
  row_count_market: number;
  cart_items: CartItemsType[];
  is_old_user: boolean | undefined;
  marketplace_invest: MarketplaceInvest[];
  cartCount: number;
  sellQuantity: number;
  currentPageMarket: number;
  currentFilter: string;
  currentPageMarketRare: number;
  currentPagePortfoio: number;
  current_investment: number;
  quantity_to_transfer: number;
  quantity_to_sell: number;
  userData: UserType;
  notifications: NotificationType[];
  indicies: IndiciesType[];
  event_list: EventListType[];
  special_bundle_list: SpecialBundlesList[];
  special_bundle_item_list: SpecialBundleDetails[];
  assortment_list: AssortmentList[];
  assortment_details: AssortmentDetails[];
  sub_accounts: SubAccountType[];
  investments: SubAccountInvestments[];
  selectedAccountIndex: null | number;
  select_vintage: number;
  active_user: string;
  special_volume_parent: WineParentBigBottleType[];
  special_volume_details: WineDetailsBigBottleType[];
  big_bottle_list: BigBottlesListType[];
  big_bottles_details: BigBottlesVintage[];
  bottle_listing: string[];
  signed_agreement: boolean;
  user_now: string;
  user_now_id: number | null;
  birth_date: string;
  state: string;
  country: string;
  city: string;
  street_address: string;
  postal_code: string;
  notification_count: number;
  dashboard_title: string;
  dashboard_value: number | string;
  count_notif: number;
  portfolio_basket_detail: {
    id: number | null;
    investment: string;
    wine_vintage: number | null;
    quantity: number;
    case_size: number | null;
    market_value: number | null;
    profit_lost: number;
    profit_lost_by_percent: number;
    investment_status: string;
    quantity_to_sell: number;
    quantity_to_transfer: number;
    sub_account: string;
    created_at: string;
    basket_details: {
      id: number;
      name: string;
      image: string;
      winery: string;
      region: string;
      special_id: null | number;
      is_assortment: boolean;
    };
    basket_items: SpecialBundleDetails[];
  };
  rare_bundle_detail: {
    id: number | null;
    investment: string;
    wine_vintage: number | null;
    quantity: number;
    case_size: number | null;
    market_value: number | null;
    profit_lost: number;
    profit_lost_by_percent: number;
    investment_status: string;
    quantity_to_sell: number;
    quantity_to_transfer: number;
    sub_account: string;
    created_at: string;
    basket_details: {
      id: number;
      name: string;
      image: string;
      winery: string;
      region: string;
      special_id: null | number;
      is_assortment: boolean;
    };
    basket_items: SpecialBundleDetails[];
  };
  setUserDetails: (details: Partial<UserContextType>) => void;
  resetUserDetails: () => void;
  paid_fee: number;
  cases_sold: number;
  profit_loss_money: number;
  cases_sold_state: number;
  profit_loss_money_state: number;
  total_cases_state: number;
  gain_loss_filter: boolean;
  selected_case_size: number;
  select_case_size_region: number;
  select_case_size_rare: number | null | undefined;
  select_case_size_special: number;
  select_case_size_investment: number | null | undefined;
  sub_account_list: SubAccountList;
  botVisibility: boolean;
  isLoggedIn: boolean;
};

const defaultUserContext: UserContextType = {
  isLoggedIn: false,
  sub_account_list: {
    sub_account_info: {
      id: 0,
      profile_picture: "",
      first_name: "",
      last_name: "",
      birth_date: "",
      created_at: "",
      user: 0,
      relationship: null,
    },
    portfolio_performance: [],
    current_market_value: 0,
    assets_by_region: {},
    case_due: 0,
    profit_loss: 0,
    total_case: 0,
    investments: [],
    total_investments: 0,
    cases_sold: 0,
    profit_loss_money: 0,
  },
  gain_loss_filter: false,
  portfolio_builder: {
    wines: [],
    final_allocation: 0,
    total_market_value: 0,
    remaining_budget: 0,
  },
  portfolio_basket_detail: {
    id: 0,
    investment: "",
    wine_vintage: 0,
    quantity: 0,
    case_size: 0,
    market_value: 0,
    profit_lost: 0,
    profit_lost_by_percent: 0,
    investment_status: "",
    quantity_to_sell: 0,
    quantity_to_transfer: 0,
    sub_account: "",
    created_at: "",
    basket_details: {
      id: 0,
      name: "",
      image: "",
      winery: "",
      region: "",
      special_id: null,
      is_assortment: false,
    },
    basket_items: [],
  },
  rare_bundle_detail: {
    id: 0,
    investment: "",
    wine_vintage: 0,
    quantity: 0,
    case_size: 0,
    market_value: 0,
    profit_lost: 0,
    profit_lost_by_percent: 0,
    investment_status: "",
    quantity_to_sell: 0,
    quantity_to_transfer: 0,
    sub_account: "",
    created_at: "",
    basket_details: {
      id: 0,
      name: "",
      image: "",
      winery: "",
      region: "",
      special_id: null,
      is_assortment: false,
    },
    basket_items: [],
  },
  link_account: {
    link_token: "",
    expiration: "",
    request_id: "",
  },
  data_points: {
    yearly: [],
    monthly: [],
  },
  calculation_list: [],
  dashboard_title: "",
  dashboard_value: 0 || "",
  birth_date: "",
  notification_count: 0,
  count_notif: 0,
  state: "",
  country: "",
  city: "",
  street_address: "",
  postal_code: "",
  signed_agreement: false,
  user_now: "",
  user_now_id: 0,
  isSubAccount: false,
  active_user: "",
  big_bottle_list: [],
  big_bottles_details: [],
  select_vintage: 0,
  subAccountID: 0,
  subAccountUser: 0,
  email: "",
  oldemail: "",
  password: "",
  password1: "",
  password2: "",
  phone_number: "",
  budget: 0,
  investment_time: "",
  invested_before: false,
  first_name: "",
  last_name: "",
  sessionid: "",
  sessionkey: "",
  mfa: "",
  otp_verify: "",
  otp_validated: "",
  kyc_verify: "",
  total_withdrawn_state: "",
  case_due_state: 0,
  profile_picture: null,
  request: [],
  investments: [],
  investment: [],
  portfolio_performance: [],
  transactions: [],
  assets_by_region: {},
  phoneNumber: "",
  balance: "",
  total_investments: "",
  life_time_investment: 0,
  total_withdrawn: "",
  old_fee: "",
  level: null,
  current_market_value: null,
  case_due: null,
  profit_loss: null,
  total_case: null,
  wine_marketplace: [],
  wine_image: [],
  wine_vintages: [],
  portfolio: [],
  yearSelect: 0,
  level_info: {
    level: 0,
    name: "",
    fee: 0,
  },
  wine_parent: [],
  portfolio_subpage: "",
  marketplace_subpage: "",
  insights_subpage: "",
  pay_method: [],
  row_count_portfolio: 0,
  row_count_market: 0,
  cart_items: [],
  is_old_user: undefined,
  marketplace_invest: [],
  cartCount: 0,
  sellQuantity: 1,
  currentPageMarket: 1,
  currentPageMarketRare: 1,
  currentPagePortfoio: 1,
  currentFilter: "",
  quantity_to_transfer: 0,
  quantity_to_sell: 0,
  current_investment: 0,
  notifications: [],
  event_list: [],
  indicies: [],
  sub_accounts: [],
  selectedAccountIndex: 0,
  special_bundle_list: [],
  special_bundle_item_list: [],
  special_volume_parent: [],
  special_volume_details: [],
  userData: {} as UserType,
  bottle_listing: [],
  assortment_list: [],
  assortment_details: [],
  setUserDetails: () => {},
  resetUserDetails: () => {},
  paid_fee: 0,
  cases_sold: 0,
  profit_loss_money: 0,
  cases_sold_state: 0,
  profit_loss_money_state: 0,
  total_cases_state: 0,
  selected_case_size: 0,
  select_case_size_region: 0,
  select_case_size_rare: 0,
  select_case_size_special: 0,
  select_case_size_investment: 0,
  botVisibility: false,
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetailsState] =
    useState<UserContextType>(defaultUserContext);

  useEffect(() => {
    const savedUserData = JSON.parse(
      localStorage.getItem("userDetails") || "{}"
    );
    setUserDetailsState((prev) => ({ ...prev, ...savedUserData }));
  }, []);

  const setUserDetails = (details: Partial<UserContextType>) => {
    const updatedUserDetails = { ...userDetails, ...details };

    // Check if the details have actually changed before updating
    if (JSON.stringify(updatedUserDetails) !== JSON.stringify(userDetails)) {
      setUserDetailsState(updatedUserDetails as UserContextType);
      localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
    }
  };

  return (
    <UserContext.Provider value={{ ...userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
