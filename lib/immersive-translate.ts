import type { InitImmersiveTranslateOptions } from "~/lib/types";

export const immersiveTranslateConfig: Parameters<InitImmersiveTranslateOptions>[0] =
	{
		pageRule: {
			selectors: ['[translatable="true"]'],
			excludeSelectors: ['[translatable="false"]'],
			excludeTags: ["title"],
			translationClasses: ["font-translation"],
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
