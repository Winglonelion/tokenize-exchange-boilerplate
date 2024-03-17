import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Controller } from "react-hook-form";
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

import useAuthForm from "./auth.form";
import { styles } from "./auth.styles";
import useLoginLogic from "./login.logic";

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
  } = useAuthForm();

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
          render={({ field: { onChange, onBlur } }) => (
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
          render={({ field: { onChange, onBlur } }) => (
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

export default LoginScreen;
