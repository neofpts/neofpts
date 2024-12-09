import { allDocs, type Doc } from "content-collections";
import Flexsearch from "flexsearch";

export type DocSearchIndexItem = {
	id: string;
	title: string;
	description: string;
};

export const createDocSearchIndex = () => {
	const index = new Flexsearch.Document({
		document: {
			id: "id",
			index: ["id", "title", "description"],
			store: ["id", "title", "description"]
		}
	});

	return index;
};

export const getDocSearchIndex = () => {
	const index = createDocSearchIndex();

	for (let i = 0; i < allDocs.length; i++) {
		const doc = allDocs[i];
		index.add(doc.id, {
			id: doc.id,
			title: doc.metadata.title,
			description: doc.metadata.description
		});

		for (let j = 0; j < doc.toc.length; j++) {
			const tocItem = doc.toc[j];
			const id = `${doc.id}#${tocItem.id}`;
			index.add(id, {
				id,
				title: `${doc.metadata.title} > ${tocItem.text}`,
				description: doc.metadata.description
			});
		}
	}

	return index;
};

export type PageTreeItem = {
	id: string;
	title: string;
	items: PageTreeItem[];
};

export type PageTree = PageTreeItem[];

const buildPageTree = (docs: Doc[]) => {
	const pageTreeItem: PageTreeItem = { id: "root", title: "", items: [] };

	for (const doc of docs) {
		const parts = doc.metadata.path.split("/"); // Split path into parts
		let currentLevel = pageTreeItem;

		for (const [index, part] of parts.entries()) {
			// Find or create the node for this part
			let node = currentLevel.items?.find(
				(child) => child.title === part
			);
			if (!node) {
				node = { id: doc.id, title: part, items: [] };
				currentLevel.items = currentLevel.items || [];
				currentLevel.items.push(node);
			}

			// If it's the last part of the path, assign the document ID
			if (index === parts.length - 1) {
				node.id = doc.id;
			}

			// Move to the next level
			currentLevel = node;
		}
	}

	return pageTreeItem.items;
};

export const getDocsPageTree = () => {
	return buildPageTree(allDocs);
};
