import { useCallback, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import EyeOffIcon from "@assets/svg/eye-off-2-outline.svg";
import EyeIcon from "@assets/svg/eye-outline.svg";

import Spacer from "../Atoms/Spacer";

type AuthInputType = "email" | "password" | "-";

type AutoCompleteMode = "email" | "password" | "off";

interface InputProps extends TextInputProps {
  renderLeftIcon?: () => React.ReactNode;
  type: AuthInputType;
}

const AUTO_COMPLETE_TYPE: Record<AuthInputType, AutoCompleteMode> = {
  email: "email",
  password: "password",
  "-": "off",
};

const AuthInput: React.FC<InputProps> = (props) => {
  const { renderLeftIcon, type = "-" } = props;
  const autoCompleteMode = AUTO_COMPLETE_TYPE[type] ?? "off";
  const [isShowSecure, setIsShowSecure] = useState(type === "password");

  const onChangeSecure = useCallback(() => {
    setIsShowSecure((prev) => !prev);
  }, []);

  return (
    <View style={[styles.container]}>
      {renderLeftIcon && (
        <>
          <View style={styles.iconBox}>{renderLeftIcon()}</View>
          <Spacer width={16} />
        </>
      )}
      <TextInput
        {...props}
        placeholderTextColor="#D6E1FF"
        autoCapitalize="none"
        autoCorrect={false}
        importantForAutofill="auto"
        secureTextEntry={isShowSecure}
        autoComplete={autoCompleteMode}
        style={styles.inputStyle}
      />
      {type === "password" && (
        <Pressable onPress={onChangeSecure} style={styles.eyeIconBox}>
          {isShowSecure ? (
            <EyeOffIcon width={ICON_SIZE} height={ICON_SIZE} fill="white" />
          ) : (
            <EyeIcon width={ICON_SIZE} height={ICON_SIZE} fill="white" />
          )}
        </Pressable>
      )}
    </View>
  );
};

const ICON_SIZE = 24;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF33",
    borderRadius: 8,
    paddingHorizontal: 16,
    width: "100%",
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: "#FFFFFF33",
    height: 48,
  },
  iconBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 18,
    textAlignVertical: "center",
    flex: 1,
    letterSpacing: 0.2,
    color: "#D6E1FF",
  },
  eyeIconBox: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    width: 40,
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default AuthInput;
