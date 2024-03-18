import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  ViewStyle,
} from "react-native";

import Text from "@/components/Atoms/Text";

interface SubmitButtonProps {
  disabled?: boolean;
  loading?: boolean;
  text?: string;
  onPress: () => void;
  children?: React.ReactNode;
  style: ViewStyle;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  disabled,
  loading,
  onPress,
  text = "",
  children,
  style,
}) => {
  const buttonStyles = useMemo(
    () => [styles.button, style, disabled && styles.disabledButton],
    [disabled],
  );

  return (
    <Pressable
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        children ?? <Text style={styles.buttonText}>{text}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: "#A8A7A7",
  },
});

export default SubmitButton;
