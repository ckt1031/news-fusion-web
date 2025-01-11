// https://stackoverflow.com/a/59499895/6277151
// biome-ignore lint/complexity/noUselessEmptyExport: <explanation>
export {};

import type { InitImmersiveTranslateOptions } from "./lib/types";

declare global {
	interface Window {
		initImmersiveTranslate: InitImmersiveTranslateOptions;
	}
}
