import React, { useMemo } from "react";
import { TextStyle } from "react-native";

import { Text as KittenText, TextProps } from "@ui-kitten/components";

interface CustomTextProps extends TextProps {
  color?: string;
  style?: TextProps["style"] & { color?: string };
}

const Text: React.FC<CustomTextProps> = ({ color, ...rest }) => {
  const textStyle = useMemo(() => {
    const _color = color ?? rest.style?.color;
    const res: TextStyle = {};
    if (_color) {
      res["color"] = _color;
    }

    return Object.keys(res).length > 0 ? res : undefined;
  }, [color]);

  return <KittenText {...rest} style={[rest.style, textStyle]} />;
};

export default Text;
