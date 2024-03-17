module.exports = {
  root: true,
  extends: ["universe/native", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["simple-import-sort", "@typescript-eslint"],
  rules: {
    "import/order": "off",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          ["^react$", "^react-native$"],
          ["^(@?expo)"],
          ["^@?react-.+", "^@?react-native-.+"],
          ["^@ui-kitten", "^(@/components)", "^i18n"],
          ["^(@/.+)"],
          ["@assets/"],
          ["^@?\\w"],
          ["^\\."],
        ],
      },
    ],
  },
};
