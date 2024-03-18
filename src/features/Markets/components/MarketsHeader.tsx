import React from "react";
import { StyleSheet } from "react-native";

import { useTranslation } from "react-i18next";

import Text from "@/components/Atoms/Text";
import Row from "@/components/Layout/Row";

import SearchIcon from "@assets/svg/search-icon.svg";

const MarketsHeader = () => {
  const { t } = useTranslation();
  return (
    <Row alignItems="center">
      <Text category="s1" style={styles.headerTitle}>
        {t("markets.screen_header")}
      </Text>
      <SearchIcon />
    </Row>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: "#3D436C",
  },
});

export default MarketsHeader;
