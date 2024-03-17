import React, { useMemo } from "react";
import { View } from "react-native";

interface SpacerProps {
  width?: number;
  height?: number;
}

const Spacer: React.FC<SpacerProps> = ({ width = 0, height = 0 }) => {
  const style = useMemo(() => ({ width, height }), [width, height]);

  return <View pointerEvents="none" style={style} />;
};

export default Spacer;
