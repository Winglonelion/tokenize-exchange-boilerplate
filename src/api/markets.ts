import { MarketCategory } from "@/models/markets";

import { AxiosManager } from "./axios.manager";
import { AXIOS_INSTANCE_NAMES } from "./const";

export type MarketOverViewResponse = {
  status: string;
  message: string;
  data: MarketCategory[];
};

export function getMarkets() {
  const instant = AxiosManager.getAxiosInstance(AXIOS_INSTANCE_NAMES.markets);
  return instant.get<MarketOverViewResponse>("market/getMarkets");
}
