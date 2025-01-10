import {z} from "zod";

export const AtomFeedSchema = z.object({
    feed: z.object({
        entry: z
            .object({
                id: z.string(),
                title: z.string(),
                updated: z.string().transform((date) => new Date(date).toISOString()),
                content: z.string(),
                'media:group': z.object({
                    'media:content': z.object({
                        '@_url': z.string(),
                    }).optional(),
                }).optional(),
            })
            .array(),
    }),
});