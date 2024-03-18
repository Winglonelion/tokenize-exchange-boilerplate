import React, { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

import { Layout } from "@ui-kitten/components";

import Spacer from "@/components/Atoms/Spacer";
import Text from "@/components/Atoms/Text";
import AuthInput from "@/components/Form/AuthInput";
import CheckBoxForm from "@/components/Form/CheckBox.form";
import SubmitButton from "@/components/Form/SubmitButton";
import Row from "@/components/Layout/Row";
import CommonStyles from "@/styles/common.styles";
import Screen, { responsiveHeight, responsiveWidth } from "@/utils/screen";

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
      handleLogin(data.email, data.password);
    });
  }, []);

  const renderEmailIcon = useCallback(() => <UserEmailIcon />, []);

  const renderPasswordIcon = useCallback(() => <PasswordIcon />, []);

  const onPressForgotPassword = useCallback(() => {
    Toast.show({
      type: "info",
      text1: t("sign_in.sign_in_forgot_password"),
      text2: t("sign_in.sub_title_forgot_password"),
      visibilityTime: 3000,
    });
  }, []);

  const onPressSignUp = useCallback(() => {
    Toast.show({
      type: "info",
      text1: t("sign_in.click_sign_up_header"),
      text2: t("sign_in.click_sign_up_content"),
      visibilityTime: 3000,
    });
  }, []);

  return (
    <Layout style={CommonStyles.layout}>
      <View style={StyleSheet.absoluteFill}>
        <ColorfulBackground
          scaleX={Screen.widthRatio}
          scaleY={Screen.heightRatio}
          width={responsiveWidth(375)}
          height={responsiveHeight(667)}
        />
      </View>

      <View style={styles.logo}>
        <LogoSymbolWhite
          width={responsiveHeight(55)}
          height={responsiveHeight(55)}
        />
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
          render={({
            field: { onChange, onBlur },
            formState: { defaultValues },
          }) => (
            <AuthInput
              defaultValue={defaultValues?.email ?? ""}
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
          render={({
            field: { onChange, onBlur },
            formState: { defaultValues },
          }) => (
            <AuthInput
              defaultValue={defaultValues?.password ?? ""}
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
          <Pressable onPress={onPressForgotPassword}>
            <Text style={styles.forgotPassword}>
              {t("sign_in.sign_in_forgot_password")}
            </Text>
          </Pressable>
        </Row>
      </View>

      <View style={styles.submitSuttonBox}>
        <SubmitButton
          loading={isPending}
          disabled={!isValid}
          onPress={onSubmit}
          style={styles.button}>
          <Text category="s1" color="#5073F2">
            {t("sign_in.sign_in_title").toUpperCase()}
          </Text>
        </SubmitButton>
        <Spacer height={24} />
        <Pressable onPress={onPressSignUp}>
          <Text style={styles.signUpQuestion}>
            {t("sign_in.dont_have_account_cta")}
            <Text style={[styles.signUpQuestion, styles.strong]}>
              {t("sign_in.sign_up_title")}
            </Text>
          </Text>
        </Pressable>
      </View>
    </Layout>
  );
};

export default LoginScreen;
