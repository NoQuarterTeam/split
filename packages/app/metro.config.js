const path = require("path")
module.exports = {
  resolver: {
    extraNodeModules: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-native": path.resolve(__dirname, "node_modules/react-native"),
      "@split/connector": path.resolve(
        __dirname,
        "node_modules/@split/connector",
      ),
    },
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, "../../node_modules"),
    path.resolve(__dirname, "../connector"),
  ],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
}
