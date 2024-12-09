import { QueryClient } from "@tanstack/svelte-query";
import { browser } from "$app/environment";
import type { LayoutLoad } from "./(product)/$types";

export const load: LayoutLoad = (event) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	return { queryClient };
};
