import { error } from "@sveltejs/kit";
import { allDocs } from "content-collections";
import type { EntryGenerator, PageLoad } from "./$types";

export const load: PageLoad = (event) => {
	const id = event.params.id;
	const doc = allDocs.find((doc) => doc.id === id);

	if (!doc) {
		error(404, "The docs requested was not found");
	}

	return doc;
};

export const entries: EntryGenerator = () => {
	return allDocs.map((doc) => ({ id: doc.id }));
};
