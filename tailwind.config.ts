import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default (<Partial<Config>>{
	plugins: [typography],
	theme: {
		extend: {
			colors: {
				gray: colors.neutral,
				primary: colors.blue,
			},
			fontFamily: {
				sans: ["Inter", "Noto Sans TC", "Noto Sans SC", "sans-serif"],
				mono: [
					"Geist Mono",
					"Inter",
					"Noto Sans TC",
					"Noto Sans SC",
					"monospace",
				],
				console: ["JetBrains Mono", "Consolas", "monospace"],
			},
		},
	},
});
