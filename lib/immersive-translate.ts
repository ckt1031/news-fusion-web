import type { InitImmersiveTranslateOptions } from "~/lib/types";

export const onLoadImmersiveTranslate = (
	initImmersiveTranslate: InitImmersiveTranslateOptions,
) => {
	initImmersiveTranslate({
		pageRule: {
			selectors: ["div[id^='content']"],
			excludeSelectors: ["header", "footer", "nav"],
		},
	});
};
