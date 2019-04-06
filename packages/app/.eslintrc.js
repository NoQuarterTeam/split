module.exports = {
  extends: ["plugin:react/recommended", "../../.eslintrc.js"],
  rules: {
    "jsx-a11y/anchor-is-valid": "off",
    "no-extend-native": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/array-type": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
