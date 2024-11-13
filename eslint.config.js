import path from "node:path";
import { fileURLToPath } from "node:url";
import globals from "globals";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["node_modules", "test", "docs", "eslint.config.js"],
}, ...compat.extends("eslint:recommended"), {
    languageOptions: {
        globals: {
            ...globals.commonjs,
            ...globals.node,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "no-var": "error",
        eqeqeq: "warn",
        "default-case": "error",
        "eol-last": "error",
        "spaced-comment": "error",
        "comma-spacing": "error",
        quotes: "error",
        "block-spacing": "error",
        "prefer-const": "error",

        indent: ["error", 2, {
            SwitchCase: 1,
        }],

        semi: "error",
    },
}];
