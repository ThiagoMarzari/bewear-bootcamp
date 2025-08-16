import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      // Desabilita regras que podem reorganizar linhas de código
      "@typescript-eslint/no-unused-vars": "warn",
      "prefer-const": "off",
      "no-multiple-empty-lines": "off",
      "padded-blocks": "off",
      "object-curly-newline": "off",
      "function-paren-newline": "off",
      "array-bracket-newline": "off",
      "array-element-newline": "off",
    },
  },
];

// Configuração adicional para preservar formatação
eslintConfig.push({
  rules: {
    // Desabilita regras do Prettier que podem mover linhas
    "prettier/prettier": "off",
  },
});

export default eslintConfig;
