import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { useSelector } from "react-redux";

import Spacer from "@/components/Atoms/Spacer";
import Text from "@/components/Atoms/Text";
import Column from "@/components/Layout/Column";
import Row from "@/components/Layout/Row";
import THUMB_HASH_MAP from "@/constants/thumb_hash.json";
import { selectMarketItem } from "@/states/selectors/markets";
import { Colors } from "@/styles/colors.theme";
import CommonStyles from "@/styles/common.styles";
import {
  calculatePriceChangePercentage,
  formatPercentage,
  roundToTwoDecimalPlaces,
} from "@/utils/finance";

import ArrowGreen from "@assets/svg/arrow-green.svg";
import ArrowRed from "@assets/svg/arrow-red.svg";

import ItemImage from "./ItemImage";

type MarketItemProps = {
  pair: string;
  code: string;
  longName: string;
};

const MarketItem: React.FC<MarketItemProps> = ({ pair, code, longName }) => {
  const item = useSelector((state) => selectMarketItem(state, pair));

  const percentage = useMemo(() => {
    const _percentage = calculatePriceChangePercentage(
      item?.openPrice.toString() ?? "0",
      item?.lastPrice.toString() ?? "0",
    );
    return formatPercentage(_percentage);
  }, [item?.openPrice, item?.lastPrice]);

  if (!item) {
    return <View style={styles.marketListItem} />;
  }

  const displayName = item?.displayName ?? "";
  const thumbKey = displayName.toUpperCase() as keyof typeof THUMB_HASH_MAP;
  const thumbHash = THUMB_HASH_MAP[thumbKey];

  const image = `https://tokenize-dev.com/assets/images/currency-logos/${displayName?.toLowerCase() ?? ""}.png`;

  const [first = ""] = item.market.split("-") ?? [];
  return (
    <View style={styles.marketListItem}>
      <Row style={styles.iconAndTitle}>
        <ItemImage image={image} thumbHash={thumbHash} />
        <Spacer width={8} />
        <Column justifyContent="flex-start" alignItems="flex-start">
          <Text style={styles.symbolTxt}>{code}</Text>
          <Spacer height={4} />
          <Text style={styles.longNameTxt}>{longName}</Text>
        </Column>
      </Row>
      <Column justifyContent="flex-start" alignItems="flex-end">
        <Text style={styles.priceTxt}>
          <Text style={styles.second}>{first}</Text>
          <Spacer width={1} />
          {roundToTwoDecimalPlaces(item?.lastPrice?.toString())}
        </Text>
        <Spacer height={4} />
        <Row alignItems="flex-end" style={CommonStyles.widthAuto}>
          <Text style={[styles.trendTxt, TREND_MAP[percentage.trend]]}>
            {percentage.formatted}
          </Text>
          <Spacer width={2} />
          <View style={styles.trendArrow}>
            {percentage.trend === "up" && <ArrowGreen />}
            {percentage.trend === "down" && <ArrowRed />}
          </View>
        </Row>
      </Column>
    </View>
  );
};

export default MarketItem;

export const MARKET_ITEM_HEIGHT = 75;

export const MARKET_ITEM_SEPARATOR_HEIGHT = 10;

const styles = StyleSheet.create({
  marketListItem: {
    alignItems: "center",
    justifyContent: "space-between",
    height: MARKET_ITEM_HEIGHT,
    borderRadius: 6,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
  },
  iconAndTitle: {
    width: "60%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pairBox: {
    marginLeft: 4,
    alignItems: "center",
    width: "auto",
  },
  symbolTxt: {
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    color: Colors.text,
  },
  longNameTxt: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.3,
    color: Colors.quote,
  },
  second: {
    fontWeight: "500",
    fontSize: 8,
    lineHeight: 18,
    letterSpacing: 0.3,
    color: Colors.grey,
  },
  priceTxt: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 18,
    textAlign: "right",
    color: Colors.text,
  },
  trendTxt: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "right",
    letterSpacing: 0.3,
    verticalAlign: "bottom",
    textAlignVertical: "bottom",
  },
  neutral: {
    color: Colors.inactive,
  },
  up: {
    color: Colors.signal_up,
  },
  down: {
    color: Colors.signal_down,
  },
  trendArrow: {
    top: -3.5,
  },
});

const TREND_MAP = {
  up: styles.up,
  down: styles.down,
  neutral: styles.neutral,
};
