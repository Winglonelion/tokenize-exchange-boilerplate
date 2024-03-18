import React from "react";
import { StyleSheet, View } from "react-native";

import { useRoute } from "@react-navigation/native";

import { Button } from "@ui-kitten/components";

import Text from "@/components/Atoms/Text";
import ScreenContainer from "@/components/Layout/ScreenContainer";
import { clearUser } from "@/states/actions/auth.actions";
import { useAppDispatch } from "@/states/hooks/use.redux";

const MenuScreen = () => {
  const router = useRoute();
  const dispatch = useAppDispatch();

  return (
    <ScreenContainer>
      <Text>{router.name}</Text>
      <View style={styles.button}>
        <Button
          size="small"
          appearance="outline"
          status="basic"
          onPress={() => {
            dispatch(clearUser());
          }}>
          <Text>LOG OUT</Text>
        </Button>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
  },
});

export default MenuScreen;
