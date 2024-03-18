import React from "react";

import { useRoute } from "@react-navigation/native";

import Text from "@/components/Atoms/Text";
import ScreenContainer from "@/components/Layout/ScreenContainer";

const BlankScreen = () => {
  const router = useRoute();
  return (
    <ScreenContainer>
      <Text>{router.name}</Text>
    </ScreenContainer>
  );
};

export default BlankScreen;
