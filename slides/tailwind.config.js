import plugin from "tailwindcss/plugin";
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.svelte"],
	darkMode: ["class"],
	theme: {
		fontFamily: {
			sans: [...fontFamily.sans],
		},
		extend: {},
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					square: (value) => ({
						width: value,
						height: value,
					}),
				},
				{ values: theme("spacing") },
			);
		}),
	],
};
