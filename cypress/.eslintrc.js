module.exports = {
  env: {
    "cypress/globals": true,
  },
  plugins: ["cypress"],
  extends: ["plugin:cypress/recommended"],
  rules: {
    "testing-library/await-async-query": "off",
    "testing-library/prefer-screen-queries": "off",
  },
};
