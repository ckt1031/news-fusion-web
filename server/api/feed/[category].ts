import dayjs from "dayjs";
import { XMLParser } from "fast-xml-parser";
import { ofetch } from "ofetch";
import { z } from "zod";
import { allowedCategories } from "~/lib/config";
import { type AtomFeed, AtomFeedSchema } from "~/lib/types";

export const feedURL = "https://news-fusion.tsun1031.xyz/v1/feed";

const querySchema = z.object({
	date: z.string().optional(),
});

export async function getAtomFeed(url: string): Promise<AtomFeed> {
	// console.log(`Fetching feed from ${url}`);

	// Fetch feed
	const xml = await ofetch<string>(url, {
		timeout: 5 * 1000, // 5 seconds
		parseResponse: (txt) => txt,
	});

	const parser = new XMLParser({
		ignoreAttributes: false,
		parseAttributeValue: false,
	});

	// Validate feed
	const data = AtomFeedSchema.parse(parser.parse(xml));

	const entry = data.feed.entry ?? [];

	return {
		error: null,
		...data,
		feed: {
			// Re-order the feed with date descending
			...data.feed,
			entry: entry.sort((a, b) => {
				return new Date(b.updated).getTime() - new Date(a.updated).getTime();
			}),
		},
	};
}

export default defineEventHandler(async (event) => {
	const category = getRouterParam(event, "category") as string;

	// Get date query parameter
	const queries = await getValidatedQuery(event, (q) => querySchema.parse(q));
	const date = queries.date ?? dayjs().format("YYYY-MM-DD");

	// Verify date format
	if (!dayjs(date).isValid()) {
		return {
			error: "Invalid date format",
		};
	}

	// Check if category is allowed
	if (!allowedCategories.map((c) => c.value).includes(category.toLowerCase())) {
		return {
			error: "Category not found",
		};
	}

	const url = `${feedURL}/${category.toLowerCase()}?date=${date}`;

	try {
		return await getAtomFeed(url);
	} catch (e) {
		console.error(e);
		return {
			error: "Failed to fetch feed",
		};
	}
});
