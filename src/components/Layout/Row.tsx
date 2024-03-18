import React, { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface RowProps {
  children: React.ReactNode;
  style?: ViewStyle;
  justifyContent?: "space-between" | "center" | "flex-start" | "flex-end";
  alignItems?: "center" | "flex-start" | "flex-end";
}

const Row: React.FC<RowProps> = ({
  children,
  style,
  alignItems,
  justifyContent,
}) => {
  const layoutStyle = useMemo(() => {
    const flattenStyles = StyleSheet.flatten([styles.row, style]);
    return {
      justifyContent: justifyContent ?? flattenStyles.justifyContent,
      alignItems: alignItems ?? flattenStyles.alignItems,
    };
  }, [justifyContent, alignItems]);

  return <View style={[styles.row, style, layoutStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Row;
