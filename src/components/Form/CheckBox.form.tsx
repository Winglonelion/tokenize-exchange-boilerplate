import React from "react";
import { StyleSheet, Text } from "react-native";

import { Control, Controller } from "react-hook-form";

import {
  CheckBox as UIKittenCheckBox,
  CheckBoxProps,
} from "@ui-kitten/components";

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
            status="info"
          >
            <Text>
              <Text style={styles.rememberMe}>Remember me</Text>
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
