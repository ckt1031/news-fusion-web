import {allowedCategories} from "~/server/api/categories";
import {ofetch} from 'ofetch';
import {XMLParser} from "fast-xml-parser";
import {AtomFeedSchema} from "~/lib/types";
import {z} from "zod";
import dayjs from "dayjs";

const feedURL = "https://news-fusion.tsun1031.xyz/v1/feed"

const querySchema = z.object({
    date: z.string().optional().default(
        dayjs().format('YYYY-MM-DD'),
    ),
})


export default defineEventHandler(async (event) => {
    const category = getRouterParam(event, 'category')
    // Get date query parameter
    const queries = await getValidatedQuery(event, q => querySchema.parse(q))

    if (!category) {
        return 'Category not found'
    }

    // Check if category is allowed
    if (!allowedCategories.includes(category)) {
        return 'Category not allowed'
    }

    const url = `${feedURL}/${category.toLowerCase()}`

    // Fetch feed
    const xml = await ofetch<string>(url, {
        timeout: 10000, // 10 seconds
        parseResponse: (txt) => txt,
    });

    const parser = new XMLParser({
        ignoreAttributes: false,
        parseAttributeValue: false,
    });

    // Validate feed
    const data = AtomFeedSchema.parse(parser.parse(xml));

    // Filter entries by date, if the article is on that date only
    const entries = data.feed.entry.filter(entry =>
        queries.date ? new Date(entry.updated).toISOString().split('T')[0] === queries.date : true
    )

    return {
        // Re-order the feed with date descending
        ...data,
        feed: {
            ...data.feed,
            entry: entries.sort((a, b) => {
                return new Date(b.updated).getTime() - new Date(a.updated).getTime()
            }),
        },
    }
})
