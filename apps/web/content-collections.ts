import fs from "fs/promises";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import { createIndex } from "./src/lib/helpers/doc";

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
	onSuccess: async (docs) => {
		const index = createIndex();

		for (let i = 0; i < docs.length; i++) {
			const doc = docs[i];
			index.add({
				id: doc.id,
				title: doc.title,
				description: doc.description
			});
		}

		const exportedData: Record<string, unknown> = {};

		await index.export((key, value) => {
			exportedData[key] = value;
		});

		const path = ".content-search/docs.js";

		let source = "";

		source += "export default ";
		source += JSON.stringify(exportedData, null, 4);

		try {
			await fs.readdir(".content-search");
		} catch (error) {
			await fs.mkdir(".content-search");
		} finally {
			fs.writeFile(path, source, "utf8");
		}
	}
});

export default defineConfig({
	collections: [docs]
});
