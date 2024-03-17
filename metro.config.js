/* eslint-env node */
const { getDefaultConfig } = require("expo/metro-config");
const MetroConfig = require('@ui-kitten/metro-config');



module.exports = () => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  };


  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
  };

  const evaConfig = {
    evaPackage: '@eva-design/eva',
  };


  return MetroConfig.create(evaConfig, config);
};
