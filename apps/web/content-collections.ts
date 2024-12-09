import rehypeTocJson, { type TocItem } from "@/helpers/rehype-toc-json";
import { defineCollection, defineConfig } from "@content-collections/core";
import type { Context, Meta } from "@content-collections/core";
import rehypeShiki from "@shikijs/rehype";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeFormat from "rehype-format";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkNormalizeHeadings from "remark-normalize-headings";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type Document = {
	_meta: Meta;
	content: string;
};

async function compile(document: Document) {
	const data = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkNormalizeHeadings)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, {
			behavior: "prepend"
		})
		.use(rehypeTocJson)
		.use(rehypeShiki, {
			theme: "tokyo-night"
		})
		.use(rehypeFormat)
		.use(rehypeStringify)
		.process(document.content);

	return {
		html: data.toString(),
		toc: data.data.toc as TocItem[]
	};
}

// Remove all unnecessary keys from the document
// and return a new object containing only the keys
// that should trigger a regeneration if changed.
function createCacheKey(document: Document): Document {
	const { content, _meta } = document;
	return { content, _meta };
}

export function compileMarkdown(
	{ cache }: Pick<Context, "cache">,
	document: Document
) {
	const cacheKey = createCacheKey(document);
	return cache(cacheKey, (doc) => compile(doc));
}

const docs = defineCollection({
	name: "docs",
	directory: "src/content/docs",
	include: "**/*.md",
	schema: (z) => ({
		title: z.string(),
		description: z.string()
	}),
	transform: async (document, context) => {
		// Compile the current document
		const compiledMarkdown = await compileMarkdown(context, document);

		// Get all documents in the collection
		const allDocs = await context.collection.documents();

		// Sort documents by `_meta.path` or another criteria
		const sortedDocs = allDocs.sort((a, b) =>
			a._meta.path.localeCompare(b._meta.path)
		);

		// Find the index of the current document
		const currentIndex = sortedDocs.findIndex(
			(doc) => doc._meta.path === document._meta.path
		);

		// Determine the next and previous documents
		const nextDoc = sortedDocs[currentIndex + 1];
		const prevDoc = sortedDocs[currentIndex - 1];

		return {
			id: document._meta.path,
			metadata: {
				title: document.title,
				description: document.description,
				...document._meta
			},
			html: compiledMarkdown.html,
			toc: compiledMarkdown.toc,
			nextDoc: nextDoc
				? { id: nextDoc._meta.path, title: nextDoc.title }
				: null,
			prevDoc: prevDoc
				? { id: prevDoc._meta.path, title: prevDoc.title }
				: null
		};
	}
});

export default defineConfig({
	collections: [docs]
});
