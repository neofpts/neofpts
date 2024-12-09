import { error } from "@sveltejs/kit";
import { allLegals } from "content-collections";
import type { EntryGenerator, PageLoad } from "./$types";

export const load: PageLoad = (event) => {
	const id = event.params.id;
	const legal = allLegals.find((doc) => doc.id === id);

	if (!legal) {
		error(404, "The legals requested was not found");
	}

	return legal;
};

export const entries: EntryGenerator = () => {
	return allLegals.map((legal) => ({ id: legal.id }));
};
