import { StyleSheet } from "react-native";

import { responsiveHeight } from "@/utils/screen";

export const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    alignSelf: "center",
    top: responsiveHeight(80),
  },
  titleBox: {
    position: "absolute",
    top: responsiveHeight(159),
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
    top: responsiveHeight(516),
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
