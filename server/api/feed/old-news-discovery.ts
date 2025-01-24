import dayjs from "dayjs";
import { z } from "zod";
import { allowedCategories } from "~/lib/config";
import { feedURL, getAtomFeed } from "~/server/api/feed/[category]";

const querySchema = z.object({
	category: z.string(),
	date: z.string().optional(),
});

export type OldNewsDiscoveryResponse = {
	error: string | null;
	hasNews: boolean;
	date: string;
};

// This endpoint is to check if there are news in previous days from the given date
export default defineEventHandler(async (event) => {
	// Get date query parameter
	const queries = await getValidatedQuery(event, (q) => querySchema.parse(q));
	const date = queries.date ?? dayjs().format("YYYY-MM-DD");
	const category = queries.category;

	// Check if category is allowed
	if (!allowedCategories.map((c) => c.value).includes(category.toLowerCase())) {
		return {
			error: "Category not found",
		};
	}

	// Verify date format
	if (!dayjs(date).isValid()) {
		return {
			error: "Invalid date format (Expected: YYYY-MM-DD)",
		};
	}

	// Loop for 5 days to check if there are news
	for (let i = 0; i < 5; i++) {
		const d = dayjs(date).subtract(i, "day").format("YYYY-MM-DD");
		const { feed } = await getAtomFeed(`${feedURL}/${category}?date=${d}`);

		if (feed.entry && feed.entry.length > 0) {
			return {
				error: null,
				hasNews: true,
				date: d,
			};
		}
	}

	return {
		error: "No old news found in the past 5 days",
		hasNews: false,
	};
});
