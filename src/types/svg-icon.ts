import { ViewStyle } from "react-native";

export interface SvgIconProps {
  fill?: string;
  stroke?: string;
  width?: number | string;
  height?: number | string;
  style?: ViewStyle;
  handlePress?: () => void;
  opacity?: string;
  testID?: string;
  strokeWidth?: number | string;
  backGroundColor?: string;
  tint?: string;
}
