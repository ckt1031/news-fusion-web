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
				sans: ["Inter", "Noto Sans TC", "sans-serif"],
				mono: ["JetBrains Mono", "Inter", "Noto Sans TC", "monospace"],
			},
		},
	},
});
