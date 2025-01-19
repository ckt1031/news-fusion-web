import dayjs from "dayjs";
import { XMLParser } from "fast-xml-parser";
import { ofetch } from "ofetch";
import { z } from "zod";
import { allowedCategories } from "~/lib/config";
import { AtomFeedSchema } from "~/lib/types";

const feedURL = "https://news-fusion.tsun1031.xyz/v1/feed";

const querySchema = z.object({
	date: z.string().optional(),
});

export default defineEventHandler(async (event) => {
	const category = getRouterParam(event, "category");

	// Check if category exists
	if (!category) {
		return {
			error: "Category not found",
		};
	}

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

	console.log(`Fetching feed from ${url}`);

	try {
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

		return {
			error: null,
			// Re-order the feed with date descending
			...data,
			feed: {
				...data.feed,
				entry: data.feed.entry.sort((a, b) => {
					return new Date(b.updated).getTime() - new Date(a.updated).getTime();
				}),
			},
		};
	} catch (e) {
		console.error(e);
		return {
			error: "Failed to fetch feed",
		};
	}
});
