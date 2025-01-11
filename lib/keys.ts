export function getFeedFetchKey(category: string, date?: string) {
	return ["feed", category, date || "current"].join(":");
}
