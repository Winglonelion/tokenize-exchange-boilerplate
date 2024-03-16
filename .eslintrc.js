module.exports = {
  root: true,
  extends: ["universe/native"],
  plugins: ["simple-import-sort"],
  rules: {
    "import/order": "off",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          ["^react$","^react-native$"],
          ["^(@?expo)"],
          ["^@?react-.+","^@?react-native-.+"],
          ["^(@/components)"],
          ["^(@/.+)"],
          ["."],
        ],
      },
    ],
  },
};
