import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";

const docs = defineCollection({
	name: "docs",
	directory: "src/content/docs",
	include: "**/*.md",
	schema: (z) => ({
		title: z.string(),
		description: z.string()
	}),
	transform: async (document, context) => {
		const html = await compileMarkdown(context, document);
		return {
			...document,
			html,
			id: document._meta.path
		};
	},
	onSuccess: async (documents) => {}
});

export default defineConfig({
	collections: [docs]
});
