module.exports = {
  transform: {
    "^.+\\.tsx?$": "<rootDir>/test-setup.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  setupFilesAfterEnv: ["@testing-library/react/cleanup-after-each"],
}
