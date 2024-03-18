import BigNumber from "bignumber.js";

export function calculatePriceChangePercentage(
  oldPrice: string,
  newPrice: string,
): string {
  const oldPriceBN = new BigNumber(oldPrice);
  const newPriceBN = new BigNumber(newPrice);

  if (oldPriceBN.eq(new BigNumber(0))) {
    return "0";
  }

  const priceChange = newPriceBN.minus(oldPriceBN);
  const priceChangePercentage = priceChange.dividedBy(oldPriceBN).times(100);
  return priceChangePercentage.toFixed(2); // Return the percentage with 2 decimal places
}

export function roundToTwoDecimalPlaces(number: string): string {
  const bigNumber = new BigNumber(number);

  const decimalPlaces = bigNumber.decimalPlaces();

  return bigNumber.toFixed(Math.min(8, decimalPlaces ?? 0));
}

export function formatPercentage(percentage: string): {
  trend: "up" | "down" | "neutral";
  formatted: string;
} {
  const percentageBN = new BigNumber(percentage);

  if (percentageBN.isGreaterThan(0)) {
    return {
      trend: "up",
      formatted: `+${percentageBN.toFixed(2)}%`,
    };
  }

  if (percentageBN.isLessThan(0)) {
    return {
      trend: "down",
      formatted: `${percentageBN.toFixed(2)}%`,
    };
  }

  return {
    trend: "neutral",
    formatted: `${percentageBN.toFixed(2)}%`,
  };
}
