<script lang="ts">
	import type { PageData } from "./$types";
	import Toc from "./toc.svelte";

	let { data }: { data: PageData } = $props();
</script>

<article class="prose dark:prose-invert flex-shrink-0 flex-grow py-12">
	{@html data.html}
</article>

<Toc items={data.toc} />
