<script lang="ts">
	import { Button } from "@/components/ui/button";
	import { ChevronLeft, ChevronRight, Edit } from "lucide-svelte";
	import type { PageData } from "./$types";
	import Toc from "./toc.svelte";

	let { data }: { data: PageData } = $props();
</script>

<article
	class="prose prose-neutral dark:prose-invert flex-shrink-0 flex-grow py-12"
>
	{@html data.html}
	<div class="mt-12 flex flex-col gap-4">
		<div class="flex items-center justify-between">
			<a href={`/docs/${data.id}.md`} class="flex items-center gap-0.5">
				<Edit class="size-5" />
				<span>Edit this page</span>
			</a>
			<span> Last updated on Nov 22, 2024 by Sébastien Lorber </span>
		</div>
		<div class="grid grid-cols-2 gap-2">
			{#if data.prevDoc}
				<Button
					variant="outline"
					href={`/docs/${data.prevDoc.id}`}
					class="col-start-1 w-fit"
				>
					<ChevronLeft />
					<span>
						{data.prevDoc.title}
					</span>
				</Button>
			{/if}

			{#if data.nextDoc}
				<Button
					variant="outline"
					href={`/docs/${data.nextDoc.id}`}
					class="col-start-2 ml-auto w-fit"
				>
					<span>
						{data.nextDoc.title}
					</span>
					<ChevronRight />
				</Button>
			{/if}
		</div>
	</div>
</article>

<Toc items={data.toc} />
