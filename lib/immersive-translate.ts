import type { InitImmersiveTranslateOptions } from "~/lib/types";

export const immersiveTranslateConfig: Parameters<InitImmersiveTranslateOptions>[0] =
	{
		pageRule: {
			selectors: ["div[id^='content']"],
			excludeSelectors: ["header", "footer", "nav", ".non-content-class"],
			translationClasses: ["py-1", "text-gray-700", "dark:text-gray-400"],
		},
	};

export const onLoadImmersiveTranslate = (
	initImmersiveTranslate: InitImmersiveTranslateOptions,
) => {
	initImmersiveTranslate(immersiveTranslateConfig);
};
