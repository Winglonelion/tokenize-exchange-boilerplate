import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import { Image } from "expo-image";

import Platform from "@/utils/platform";

interface ItemImageProps {
  image?: string;
  thumbHash?: string;
}
/**a random blur hash for Image
 * TODO: will map offline to blur hash then have hash map
 *  */

const ItemImage: React.FC<ItemImageProps> = (props) => {
  return (
    <View style={styles.shadowBox}>
      <View style={styles.imageBox}>
        <Image
          allowDownscaling
          renderToHardwareTextureAndroid
          removeClippedSubviews
          style={styles.itemImage}
          cachePolicy="disk"
          source={props.image}
          placeholder={{ thumbhash: props.thumbHash }}
          contentFit="cover"
          transition={300}
        />
      </View>
    </View>
  );
};

const IMAGE_SIZE = 45;
const IMAGE_BORDER_RADIUS = 4;

export default memo(ItemImage);

const styles = StyleSheet.create({
  itemImage: {
    borderRadius: IMAGE_BORDER_RADIUS,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  imageBox: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: Platform.isAndroid ? IMAGE_SIZE / 2 : IMAGE_BORDER_RADIUS,
    overflow: "hidden",
  },
  shadowBox: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: Platform.isAndroid ? IMAGE_SIZE / 2 : IMAGE_BORDER_RADIUS,
    shadowColor: "#333333",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    backgroundColor: Platform.OS === "android" ? "white" : "transparent",
    elevation: 3,
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
});
