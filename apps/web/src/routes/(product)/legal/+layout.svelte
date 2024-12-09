<script lang="ts">
	import { AppFooter } from "@/components/app";
	import type { Snippet } from "svelte";
	import Header from "./header.svelte";

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex size-full min-h-screen flex-col">
	<Header />
	<main class="min-h-screen flex-1">
		<div class="relative flex justify-center">
			<main
				class="flex flex-shrink-0 flex-grow flex-nowrap justify-center gap-6"
			>
				{@render children()}
			</main>
		</div>
	</main>
	<AppFooter />
</div>
