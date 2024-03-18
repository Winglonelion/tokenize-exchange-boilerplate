import React from "react";
import { StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { SafeAreaView } from "react-native-safe-area-context";

import { Layout } from "@ui-kitten/components";

import CommonStyles from "@/styles/common.styles";

interface ScreenContainerProps {
  children: React.ReactNode;
}

const ScreenContainer: React.FC<ScreenContainerProps> = (props) => {
  return (
    <SafeAreaView style={[CommonStyles.flex1, styles.overLayout]}>
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={["#FAFBFE", "#EEF0FA"]}
          style={CommonStyles.flex1}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </View>
      <Layout style={[CommonStyles.layout, styles.layout]}>
        {props.children}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "transparent",
    // borderWidth: 1,
  },
  overLayout: {
    backgroundColor: "#FAFBFE",
  },
});

export default ScreenContainer;
