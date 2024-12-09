import type { Element, Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Data, VFile } from "vfile";

export type TocItem = {
	text: string;
	id: string;
	depth: number;
	items: TocItem[];
};

// Extend VFile's data type
export interface VFileWithToc extends VFile {
	data: Data & {
		toc: TocItem[];
	};
}

// Helper function to build a tree
const buildTocTree = (items: TocItem[]) => {
	const root: TocItem[] = [];
	const stack: TocItem[] = [];

	items.forEach((item) => {
		const tocItem: TocItem = { ...item, items: [] };

		// Ensure the stack only contains items at the correct depth
		while (stack.length && stack[stack.length - 1].depth >= tocItem.depth) {
			stack.pop();
		}

		if (stack.length) {
			// Add to the last item in the stack (i.e., its parent)
			stack[stack.length - 1].items?.push(tocItem);
		} else {
			// Add to root if no parent exists
			root.push(tocItem);
		}

		// Push this item onto the stack for future children
		stack.push(tocItem);
	});

	return root;
};

// Plugin to generate a Table of Contents in a tree structure
const rehypeTocJson: Plugin<[], Root> = () => {
	return (tree: Root, file: VFileWithToc) => {
		const toc: TocItem[] = [];

		visit(tree, "element", (node: Element) => {
			// Check if the node is a heading (e.g., h1, h2, ..., h6)
			if (
				node.type === "element" &&
				["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)
			) {
				const depth = parseInt(node.tagName[1], 10); // Extract heading level
				const id = node.properties?.id as string; // Extract id (if any)

				// Extract the visible text inside the heading
				const text = (node.children ?? [])
					.filter((child: Element) => child.type === "text")
					.map((child: Element) => child.value)
					.join(" ")
					.trim();

				// Add to the ToC array if valid
				if (id && text) {
					toc.push({ depth, text, id, items: [] });
				}
			}
		});

		// Build the ToC tree
		const tocTree = buildTocTree(toc);

		// Attach the generated ToC tree to the VFile `data` property
		file.data.toc = tocTree;
	};
};

export default rehypeTocJson;
