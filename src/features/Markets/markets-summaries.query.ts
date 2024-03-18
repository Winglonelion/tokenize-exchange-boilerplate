import { getMarketsSummarise } from "@/api/public";
import { MarketCategory } from "@/models/markets";

import { useQuery } from "@tanstack/react-query";

const useMarketsSummariseQuery = (categories: MarketCategory[]) => {
  return useQuery({
    queryKey: ["markets-summaries"],
    queryFn: () => {
      return getMarketsSummarise();
    },
    networkMode: "always",
    enabled: categories.length > 0,
    gcTime: 1000 * 25, // Garbage collection every 25 seconds
    refetchInterval: 1000 * 30, // Refetch every 30 second
  });
};

export default useMarketsSummariseQuery;
