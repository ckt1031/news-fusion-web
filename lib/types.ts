import { z } from "zod";

export const AtomFeedSchema = z.object({
	feed: z.object({
		entry: z
			.object({
				id: z.string(),
				title: z.string(),
				updated: z.string().transform((date) => new Date(date).toISOString()),
				content: z.string(),
				link: z.object({
					"@_href": z.string(),
				}),
				author: z.object({
					name: z.string(),
				}),
				"media:group": z
					.object({
						"media:content": z
							.object({
								"@_url": z.string(),
							})
							.optional(),
					})
					.optional(),
			})
			.transform(({ "media:group": mediaGroup, ...d }) => ({
				...d,
				link: d.link["@_href"],
				thumbnail: mediaGroup?.["media:content"]?.["@_url"],
			}))
			.array()
			.optional(),
	}),
});

interface Error {
	error: string | null;
}

type NonNullable<T> = Exclude<T, null | undefined>;

export type AtomFeed = z.infer<typeof AtomFeedSchema> & Error;
export type AtomFeedSingleEntry = NonNullable<
	AtomFeed["feed"]["entry"]
>[number];

export interface ImmTranPageRule {
	excludeMatches?: string | string[]; // Exclude specific websites.
	selectorMatches?: string | string[]; // Match using selectors without specifying all URLs
	excludeSelectorMatches?: string | string[]; // Exclude rules, same as above.

	// Specify translation range
	selectors?: string | string[]; // Translate only matched elements
	excludeSelectors?: string | string[]; // Exclude elements, do not translate matched elements
	excludeTags?: string | string[]; // Exclude tags, do not translate matched tags

	// Add translation range, not override
	additionalSelectors?: string | string[]; // Add translation range. Add translation positions in smart translation areas.
	additionalExcludeSelectors?: string | string[]; // Add excluded elements to prevent smart translation in specific positions.
	additionalExcludeTags?: string | string[]; // Add excluded tags

	// Keep original
	stayOriginalSelectors?: string | string[]; // Matched elements will remain original. Commonly used for tags on forum websites.
	stayOriginalTags?: string | string[]; // Matched tags will remain original, such as `code`

	// Region translation
	atomicBlockSelectors?: string | string[]; // Region selector, matched elements will be considered as a whole, not translated in segments
	atomicBlockTags?: string | string[]; // Region tag selector, same as above

	// Block or Inline
	extraBlockSelectors?: string | string[]; // Extra selectors, matched elements will be treated as block elements, occupying one line.
	extraInlineSelectors?: string | string[]; // Extra selectors, matched elements will be treated as inline elements.

	inlineTags?: string | string[]; // Matched tags will be treated as inline elements
	preWhitespaceDetectedTags?: string | string[]; // Matched tags will automatically wrap lines

	// Translation styles
	translationClasses?: string | string[]; // Add extra classes to the translation

	// Global styles
	globalStyles?: Record<string, string>; // Modify page styles, useful when translations cause page disorder.
	globalAttributes?: Record<string, Record<string, string>>; // Modify attributes of page elements

	// Embedded styles
	injectedCss?: string | string[]; // Embed CSS styles
	additionalInjectedCss?: string | string[]; // Add CSS styles instead of directly overriding.

	// Context
	wrapperPrefix?: string; // Prefix of the translation area, default is smart, decides whether to wrap lines based on the number of characters.
	wrapperSuffix?: string; // Suffix of the translation area

	// Translation wrapping character count
	blockMinTextCount?: number; // Minimum character count for translation as a block, otherwise, the translation will be an inline element.
	blockMinWordCount?: number; // Same as above. To always wrap lines, set both to 0.

	// Minimum character count for translatable content
	containerMinTextCount?: number; // Minimum character count for elements to be translated during smart recognition, default is 18
	paragraphMinTextCount?: number; // Minimum character count for original paragraph, content greater than the number will be translated
	paragraphMinWordCount?: number; // Minimum word count for original paragraph

	// Forced line break character count for long paragraphs
	lineBreakMaxTextCount?: number; // Maximum character count for forced line break when translating long paragraphs.

	// Timing to start translation
	urlChangeDelay?: number; // Delay in milliseconds before starting translation after entering the page. Default is 250ms to wait for webpage initialization.

	// AI streaming translation
	aiRule?: {
		streamingSelector: string; // GPT webpage selector marking the translating element
		messageWrapperSelector: string; // Message body selector
		streamingChange: boolean; // Incremental or full update for repeated messages in GPT-like webpages. GPT is incremental
	};
}

export type InitImmersiveTranslateOptions = (options: {
	pageRule: ImmTranPageRule;
}) => void;
