import dayjs from "dayjs";
import { z } from "zod";

const querySchema = z.object({
	href: z.string().url(),
});

export default defineEventHandler(async (event) => {
	const queries = await getValidatedQuery(event, (q) => querySchema.parse(q));
	const href = queries.href;

	// console.log(`Fetching image from ${href}`);

	// Fetch image
	const image = await fetch(href);

	const contentType = image.headers.get("Content-Type");

	if (!contentType || !contentType.startsWith("image/")) {
		return {
			error: "Invalid image",
		};
	}

	setHeader(event, "Content-Type", contentType);

	const arrayBuffer = await image.arrayBuffer();

	const img64 = Buffer.from(arrayBuffer).toString("base64");

	return Buffer.from(img64, "base64");
});
