import React from "react";
import { StyleSheet } from "react-native";

import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  CheckBox as UIKittenCheckBox,
  CheckBoxProps,
} from "@ui-kitten/components";

import Text from "@/components/Atoms/Text";

interface CheckBoxFormProps extends CheckBoxProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const CheckBoxForm: React.FC<CheckBoxFormProps> = ({
  name,
  control,
  ...rest
}) => {
  const { t } = useTranslation();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, onBlur } }) => (
        <>
          <UIKittenCheckBox
            {...rest}
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            status="info">
            <Text>
              <Text style={styles.rememberMe}>
                {t("sign_in.remember_sign_in")}
              </Text>
            </Text>
          </UIKittenCheckBox>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  rememberMe: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    color: "#FFFFFF",
  },
});

export default CheckBoxForm;
