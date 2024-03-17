import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Layout } from "@ui-kitten/components";

import Row from "@/components/Atoms/Row";
import Spacer from "@/components/Atoms/Spacer";
import Text from "@/components/Atoms/Text";
import AuthInput from "@/components/Form/AuthInput";
import CheckBoxForm from "@/components/Form/CheckBox.form";
import SubmitButton from "@/components/Form/SubmitButton";
import CommonStyles from "@/styles/common.styles";

import ColorfulBackground from "@assets/svg/colorful-bg.svg";
import LogoSymbolWhite from "@assets/svg/logo-symbol-white.svg";
import PasswordIcon from "@assets/svg/password-icon.svg";
import UserEmailIcon from "@assets/svg/user-email-icon.svg";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useLoginLogic from "./login.logic";

// Define validation schema using yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email is not correct format")
    .required("Email must not be empty"),
  password: yup.string().required("Password must not be empty"),
  keepSignedIn: yup.boolean().required(),
});

type FormData = {
  email: string;
  password: string;
  keepSignedIn: boolean;
};

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      keepSignedIn: false,
    },
  });

  const { handleLogin, isPending } = useLoginLogic();

  const onSubmit = useMemo(() => {
    return handleSubmit((data: FormData) => {
      // Handle form submission
      console.log(data);
      handleLogin(data.email, data.password);
    });
  }, []);

  const renderEmailIcon = useCallback(() => <UserEmailIcon />, []);

  const renderPasswordIcon = useCallback(() => <PasswordIcon />, []);

  return (
    <Layout style={CommonStyles.layout}>
      <View style={StyleSheet.absoluteFill}>
        <ColorfulBackground style={CommonStyles.flex} />
      </View>

      <View style={styles.logo}>
        <LogoSymbolWhite />
      </View>

      <View style={styles.titleBox}>
        <Text category="h1" style={styles.title}>
          {t("sign_in.sign_in_title")}
        </Text>
        <Spacer height={8} />
        <Text category="h2" style={styles.subTitle}>
          {t("sign_in.sign_in_sub_title")}
        </Text>
      </View>
      <Spacer height={36} />
      <View style={styles.loginForm}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <AuthInput
              renderLeftIcon={renderEmailIcon}
              placeholder="Email"
              onChangeText={onChange}
              onBlur={onBlur}
              type="email"
            />
          )}
          name="email"
          defaultValue=""
        />
        <Text style={styles.errorText}>{errors?.email?.message ?? ""}</Text>
        <Spacer height={8} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <AuthInput
              renderLeftIcon={renderPasswordIcon}
              placeholder="Password"
              onChangeText={onChange}
              onBlur={onBlur}
              type="password"
            />
          )}
          name="password"
          defaultValue=""
        />
        <Text style={styles.errorText}>{errors?.password?.message ?? ""}</Text>
        <Spacer height={8} />
        <Row>
          <CheckBoxForm name="keepSignedIn" control={control} />
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </Row>
      </View>

      <View style={styles.submitSuttonBox}>
        <SubmitButton
          loading={isPending}
          disabled={!isValid}
          onPress={onSubmit}
          style={styles.button}
        >
          <Text category="s1" color="#5073F2">
            {"Sign In".toUpperCase()}
          </Text>
        </SubmitButton>
        <Spacer height={16} />
        <Text style={styles.signUpQuestion}>
          {"Don’t have an account yet? "}
          <Text style={[styles.signUpQuestion, styles.strong]}>SIGN UP</Text>
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    // width: 55,
    // height: 55,
    left: 160,
    top: 80,
  },
  titleBox: {
    position: "absolute",
    // width: 75,
    // height: 30,
    // left: 151,
    top: 159,
    fontWeight: "900",
    fontSize: 23,
    lineHeight: 30,
    textAlign: "center",
    letterSpacing: 0.5,
    color: "#FFFFFF",
  },
  loginForm: {
    width: "100%",
    paddingHorizontal: 12,
  },
  title: {
    // fontFamily: 'Roboto',
    // fontStyle: 'normal',
    fontWeight: "900",
    fontSize: 23,
    lineHeight: 30,
    textAlign: "center",
    letterSpacing: 0.5,
    color: "#FFFFFF",
  },
  subTitle: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    letterSpacing: 0.3,
    color: "#D6DFFF",
  },
  forgotPassword: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    color: "#FFFFFF",
  },
  submitSuttonBox: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 12,
    top: 516,
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#BDCFFF",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpQuestion: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    color: "#FFFFFF",
    textAlign: "center",
  },
  strong: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  errorText: {
    color: "#B30909",
    fontSize: 12,
    marginTop: 4,
    paddingLeft: 4,
    textShadowColor: "rgba(255, 220, 220, 1)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
    fontWeight: "500",
  },
});

export default LoginScreen;
