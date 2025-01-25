import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default (<Partial<Config>>{
	plugins: [typography],
	theme: {
		extend: {
			colors: {
				gray: colors.zinc,
				primary: colors.blue,
			},
			fontFamily: {
				sans: [
					"Inter",
					"sans-serif",
					"Noto Sans TC",
					"Noto Sans SC",
					"sans-serif",
				],
				mono: ["Geist Mono", "Consolas", "monospace"],
				summary: ["LXGW WenKai Mono TC", "monospace"],
			},
		},
	},
});
