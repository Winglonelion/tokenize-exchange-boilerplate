import React, { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface ColumnProps {
  children: React.ReactNode;
  style?: ViewStyle;
  justifyContent?: "space-between" | "center" | "flex-start" | "flex-end";
  alignItems?: "center" | "flex-start" | "flex-end";
}

const Column: React.FC<ColumnProps> = ({
  children,
  style,
  alignItems,
  justifyContent,
}) => {
  const layoutStyle = useMemo(() => {
    const flattenStyles = StyleSheet.flatten([styles.column, style]);
    return {
      justifyContent: justifyContent ?? flattenStyles.justifyContent,
      alignItems: alignItems ?? flattenStyles.alignItems,
    };
  }, [justifyContent, alignItems]);

  return <View style={[styles.column, style, layoutStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Column;
