import docIndexes from "content-search/docs";
import Flexsearch from "flexsearch";

export const createIndex = () => {
	const index = new Flexsearch.Document({
		document: {
			id: "id",
			index: ["id", "title", "description"]
		}
	});

	return index;
};

export const getIndex = () => {
	const index = createIndex();

	for (const [key, value] of Object.entries(docIndexes)) {
		index.import(key, value);
	}

	return index;
};
