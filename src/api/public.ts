import { MarketPricingInfo } from "@/models/markets";

import { AxiosManager } from "./axios.manager";
import { AXIOS_INSTANCE_NAMES } from "./const";

export type MarketSummaryResponse = {
  status: string;
  message: string;
  data: MarketPricingInfo[];
};

export function getMarketsSummarise() {
  const instant = AxiosManager.getAxiosInstance(AXIOS_INSTANCE_NAMES.public);
  return instant.get<MarketSummaryResponse>("market/get-summaries");
}
