import React, { useMemo } from "react";
import { StyleSheet, TextStyle } from "react-native";

import { Text as KittenText, TextProps } from "@ui-kitten/components";

interface CustomTextProps extends TextProps {
  color?: string;
  style?: TextProps["style"] & { color?: string };
}

const Text: React.FC<CustomTextProps> = ({ color, ...rest }) => {
  const textStyle = useMemo(() => {
    const _color = color ?? StyleSheet.flatten(rest.style)?.color;
    const res: TextStyle = {};
    if (_color) {
      res["color"] = _color;
    }

    return Object.keys(res).length > 0 ? res : undefined;
  }, [color]);

  return (
    <KittenText {...rest} style={[defaultStyles.text, textStyle, rest.style]} />
  );
};

const defaultStyles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
  },
});

export default Text;
