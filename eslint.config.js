import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**"]
  },
  {
    ...js.configs.recommended,
    files: ["lib/**/*.js", "test/**/*.js", "eslint.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }]
    }
  },
  {
    files: ["lib/client.js"],
    languageOptions: {
      globals: globals.browser
    }
  }
];
