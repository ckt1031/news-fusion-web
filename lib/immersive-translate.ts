import type { InitImmersiveTranslateOptions } from "~/lib/types";

export const immersiveTranslateConfig: Parameters<InitImmersiveTranslateOptions>[0] =
	{
		pageRule: {
			selectors: ["article", ".is-content"],
			excludeSelectors: [".non-content-class"],
			excludeTags: [
				"header",
				"footer",
				"nav",
				"script",
				"style",
				"head",
				"title",
			],
			translationClasses: ["py-1", "text-zinc-700", "dark:text-zinc-400"],
		},
	};

const onLoadImmersiveTranslate = (
	initImmersiveTranslate: InitImmersiveTranslateOptions,
) => {
	initImmersiveTranslate(immersiveTranslateConfig);
	console.log("Immersive Translate loaded");
};

export const loadImmersiveTranslate = () => {
	const { onLoaded } = useScript(
		{
			src: "https://download.immersivetranslate.com/immersive-translate-sdk-latest.js",
			async: true,
			defer: true,
		},
		{
			use() {
				return { initImmersiveTranslate: window.initImmersiveTranslate };
			},
		},
	);

	onMounted(() => {
		onLoaded(({ initImmersiveTranslate }) => {
			onLoadImmersiveTranslate(initImmersiveTranslate);
		});
	});
};
