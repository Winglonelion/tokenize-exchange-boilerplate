export type MarketBasicInfo = {
  id: number;
  marketId: string;
  marketName: string;
  baseCurrency: string;
  marketCurrency: string;
  marketCurrencyLong: string;
  ceiling: string;
  floor: string;
  baseIncrement: string | null;
  quoteIncrement: string | null;
  baseMinSize: string | null;
  baseMaxSize: string | null;
  tradingStatus: string;
  listRoles: string[] | null;
  baseCurrencyTruncate: number;
  priceTruncate: number;
  quoteCurrencyTruncate: number;
};

export type MarketCategory = {
  title: string;
  list: MarketBasicInfo[];
};

export type MarketPricingInfo = {
  marketId: number;
  market: string;
  askPrice: number;
  bidPrice: number;
  lastPrice: number;
  openPrice: number;
  prevPrice: number;
  high: number;
  low: number;
  volume: number;
  listRoles: unknown;
  displayName?: string;
  pair: string[];
};
