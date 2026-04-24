// // @ts-check
// import eslint from "@eslint/js";
// import prettier from "eslint-plugin-prettier/recommended";
// import reactPlugin from "eslint-plugin-react";
// import reactHooks from "eslint-plugin-react-hooks";
// import globals from "globals";
// import tseslint from "typescript-eslint";

// export default tseslint.config(
//   {
//     ignores: [
//       "node_modules/**",
//       "dist/**",
//       "build/**",
//       "coverage/**",
//       "eslint.config.js",
//     ],
//   },

//   // Regras básicas do JS
//   eslint.configs.recommended,

//   // TypeScript (type-checked)
//   ...tseslint.configs.recommendedTypeChecked,

//   // React
//   {
//     files: ["apps/frontend-react/**/*.{ts,tsx,js,jsx}"],
//     languageOptions: {
//       parser: tseslint.parser,
//       ecmaVersion: 2020,
//       sourceType: "module",
//       globals: {
//         ...globals.browser,
//       },
//     },
//     plugins: {
//       react: reactPlugin,
//       "react-hooks": reactHooks,
//     },
//     rules: {
//       "react/react-in-jsx-scope": "off",
//       "react-hooks/rules-of-hooks": "error",
//       "react-hooks/exhaustive-deps": "warn",
//     },
//   },

//   // NestJS (backend)
//   {
//     files: ["apps/backend-nest/**/*.ts"],
//     languageOptions: {
//       globals: globals.node,
//       parser: tseslint.parser,
//       parserOptions: {
//         project: "./apps/backend-nest/tsconfig.json",
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },
//     rules: {
//       "@typescript-eslint/no-unused-vars": [
//         "error",
//         { argsIgnorePattern: "^_" },
//       ],
//       "no-console": ["warn", { allow: ["warn", "error"] }],
//     },
//   },

//   // Prettier (para todos)
//   prettier
// );
