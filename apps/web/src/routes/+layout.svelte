<script lang="ts">
	import { ParaglideJS } from "@inlang/paraglide-sveltekit";
	import { i18n } from "$lib/i18n";
	import "../app.css";
	import { Toaster } from "@/components/ui/sonner";
	import { QueryClientProvider } from "@tanstack/svelte-query";
	import { ModeWatcher } from "mode-watcher";
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<ModeWatcher />
<Toaster richColors />
<ParaglideJS {i18n}>
	<QueryClientProvider client={data.queryClient}>
		{@render children()}
	</QueryClientProvider>
</ParaglideJS>
