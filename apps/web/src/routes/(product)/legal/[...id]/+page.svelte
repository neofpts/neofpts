<script lang="ts">
	import { Toc } from "@/components/toc";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<article
	class="prose prose-neutral dark:prose-invert flex-shrink-0 flex-grow py-12"
>
	{@html data.html}
</article>

<Toc items={data.toc} />
