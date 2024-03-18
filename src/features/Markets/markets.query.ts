import { getMarkets } from "@/api/markets";

import { useQuery } from "@tanstack/react-query";

const useMarketsQuery = () => {
  return useQuery({
    queryKey: ["markets"],
    queryFn: () => {
      return getMarkets();
    },
    // refetchInterval: 1000 * 30, // Refetch every 30 second
  });
};

export default useMarketsQuery;
