import { MarketPricingInfo } from "../markets";

export function combineMarketsMap(markets: MarketPricingInfo[]) {
  return markets.reduce((acc, each) => {
    const pair = each.market.split("-");
    const [first = "", second = ""] = pair;
    const newItem = {
      ...each,
      displayName: second ?? first,
      pair,
    };

    return {
      ...acc,
      [each.market]: newItem,
    };
  }, {});
}
