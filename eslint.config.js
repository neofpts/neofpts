import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	prettier,
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 2021,
				sourceType: "module",
			},
			globals: globals.node, // Add Node.js globals
		},
	},
	{
		ignores: ["dist/", "node_modules/"],
	},
);
