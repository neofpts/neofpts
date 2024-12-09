import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs["flat/recommended"],
	prettier,
	...svelte.configs["flat/prettier"],

	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},

	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		},
		rules: {
			"svelte/no-at-html-tags": "off"
		}
	},

	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: ts.parser,
			parserOptions: {
				ecmaVersion: 2021,
				sourceType: "module"
			},
			globals: globals.node // Add Node.js globals
		}
	},

	// Ignore Patterns
	{
		ignores: [
			"**/dist/**",
			"**/.output/**",
			"**/.vercel/**",
			"**/.netlify/**",
			"**/.wrangler/**",
			"**/.svelte-kit/**",
			"**/build/**",
			"**/.DS_Store/**",
			"**/Thumbs.db/**",
			"**/.env/**",
			"**/.env.*/**",
			"**/node_modules/**"
		]
	}
);
