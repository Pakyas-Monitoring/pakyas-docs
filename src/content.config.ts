import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader({
			generateId: ({ entry }) => {
				// Use the full file path (without extension) to ensure unique IDs
				return entry.replace(/\.mdx?$/, '');
			},
		}),
		schema: docsSchema(),
	}),
};
