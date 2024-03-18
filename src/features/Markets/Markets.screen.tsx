import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList as CategoryList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import Spacer from "@/components/Atoms/Spacer";
import Text from "@/components/Atoms/Text";
import ScreenContainer from "@/components/Layout/ScreenContainer";
import { MarketBasicInfo, MarketCategory } from "@/models/markets";
import { setMarketsMap } from "@/states/actions/markets.actions";
import { useAppDispatch } from "@/states/hooks/use.redux";
import CommonStyles from "@/styles/common.styles";

import { FlashList as MarketList } from "@shopify/flash-list";

import MarketItem, {
  MARKET_ITEM_HEIGHT,
  MARKET_ITEM_SEPARATOR_HEIGHT,
} from "./components/MarketItem";
import MarketsHeader from "./components/MarketsHeader";
import useMarketsQuery from "./markets.query";
import useMarketsSummariseQuery from "./markets-summaries.query";

const MarketsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const mountedRef = React.useRef(false);
  const { data: marketsOverviewResponse } = useMarketsQuery();
  const [category, setCategory] = useState("");

  const categories = useMemo(() => {
    return marketsOverviewResponse?.data?.data ?? [];
  }, [marketsOverviewResponse?.data?.data]);

  const selectedList = useMemo(() => {
    const selectedCategory =
      categories.find((item) => item.title === category) ??
      ({} as MarketCategory);

    return selectedCategory?.list ?? [];
  }, [category]);

  const {
    data: summaryResponse,
    refetch: refetchSummaries,
    isRefetching,
  } = useMarketsSummariseQuery(categories);

  useEffect(() => {
    const marketNames: string[] = [];
    categories.forEach((category) => {
      category.list.forEach((market) => {
        marketNames.push(market.marketName);
      });
    });

    const pathsSet = new Set<string>();
    marketNames.forEach((marketName) => {
      const [path1, path2] = marketName.split("-");
      pathsSet.add(path1);
      pathsSet.add(path2);
    });
  }, [categories]);

  /**
   * update market map to redux store
   * item will get data from selector
   */
  useEffect(() => {
    const list = summaryResponse?.data.data ?? [];
    dispatch(setMarketsMap({ markets: list }));
  }, [summaryResponse?.data.data]);

  /**
   * set default active category when categories is loaded
   */
  useEffect(() => {
    if (mountedRef.current === true) return;

    // trigger when categories is loaded
    if (categories.length > 0) {
      mountedRef.current = true;

      setCategory(categories[0].title);
    }
  }, [categories]);

  const onPressCategory = useMemo(() => {
    return (category: string) => {
      return () => {
        setCategory(category);
      };
    };
  }, [category]);

  const renderMarketCategories = useCallback(
    ({ item }: { item: MarketCategory; index: number }) => {
      const isActive = category === item?.title;
      return (
        <Pressable
          onPress={onPressCategory(item.title)}
          style={[
            styles.coinCategoryItemBox,
            isActive && styles.activeCategoryItem,
          ]}>
          <Text
            style={[styles.categoryItemText, isActive && styles.activeText]}>
            {item.title}
          </Text>
        </Pressable>
      );
    },
    [category],
  );

  const renderMarketPriceItem = useCallback(
    ({ item }: { item: MarketBasicInfo; index: number }) => {
      return (
        <MarketItem
          code={item.marketCurrency}
          longName={item.marketCurrencyLong}
          pair={item.marketName ?? ""}
        />
      );
    },
    [],
  );

  const categoriesKeyExtractor = useCallback(
    (item: MarketCategory) => `market-category-${item.title}`,
    [],
  );

  const marketListKeyExtractor = useCallback(
    (item: MarketBasicInfo) => `market-item-${item.marketName}`,
    [],
  );

  const renderItemSeparatorMarketList = useCallback(() => {
    return <Spacer height={MARKET_ITEM_SEPARATOR_HEIGHT} />;
  }, []);

  const renderItemSeparatorCategories = useCallback(() => {
    return <Spacer width={CATEGORY_ITEM_SEPARATOR_WIDTH} />;
  }, []);

  const getItemLayoutCategory = useCallback((_data: unknown, index: number) => {
    return {
      length: CATEGORY_ITEM_HORIZONTAL_WIDTH,
      offset:
        CATEGORY_ITEM_HORIZONTAL_WIDTH * index +
        CATEGORY_ITEM_SEPARATOR_WIDTH * index,
      index,
    };
  }, []);

  return (
    <ScreenContainer>
      <Spacer height={20} />
      <View style={styles.content}>
        <MarketsHeader />
        <Spacer height={20} />
        <View style={styles.categoryBox}>
          <CategoryList
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            pagingEnabled
            data={categories}
            keyExtractor={categoriesKeyExtractor}
            horizontal
            renderItem={renderMarketCategories}
            ItemSeparatorComponent={renderItemSeparatorCategories}
            getItemLayout={getItemLayoutCategory}
          />
        </View>
      </View>

      <Spacer height={20} />

      <View
        style={[CommonStyles.flex1, CommonStyles.width100, styles.marketList]}>
        <MarketList
          onRefresh={() => {
            console.log("la la la");
            refetchSummaries();
          }}
          refreshing={isRefetching}
          data={selectedList}
          keyExtractor={marketListKeyExtractor}
          estimatedItemSize={MARKET_ITEM_HEIGHT}
          renderItem={renderMarketPriceItem}
          ItemSeparatorComponent={renderItemSeparatorMarketList}
        />
      </View>
    </ScreenContainer>
  );
};

export const CATEGORY_ITEM_HORIZONTAL_WIDTH = 80;
export const CATEGORY_ITEM_SEPARATOR_WIDTH = 10;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 12,
  },
  categoryBox: {
    width: "100%",
    height: 32,
  },
  coinCategoryItemBox: {
    height: 32,
    borderRadius: 6,
    paddingVertical: 16,
    width: CATEGORY_ITEM_HORIZONTAL_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E4E9F9",
  },
  activeCategoryItem: {
    backgroundColor: "#6992FF",
  },
  categoryItemText: {
    height: 15,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 15,
    textAlign: "center",
    color: "#8E92B2",
  },
  activeText: {
    color: "#FFFFFF",
  },
  marketList: {},
  marketListContent: {
    paddingHorizontal: 12,
  },
});

export default MarketsScreen;
