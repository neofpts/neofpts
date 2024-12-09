<script lang="ts">
	import { Button } from "@/components/ui/button";
	import {
		CommandDialog,
		CommandEmpty,
		CommandInput,
		CommandLinkItem,
		CommandList
	} from "@/components/ui/command";
	import { getDocSearchIndex, type DocSearchIndexItem } from "@/helpers/doc";
	import { Search } from "lucide-svelte";

	let open = $state(false);
	const searchIndex = getDocSearchIndex();
	let searchResult = $state([] as DocSearchIndexItem[]);
	let searchValue = $state("");

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}

	function onSearch(value: string) {
		const data = searchIndex.search(value, {
			enrich: true
		});

		const result = [
			...new Map(
				data
					.flatMap((value) =>
						value.result.map(
							(value) =>
								(
									value as unknown as {
										doc: DocSearchIndexItem;
									}
								).doc
						)
					)
					.map((value) => [value.id, value])
			).values()
		];

		searchResult = result;
	}

	$effect(() => {
		onSearch(searchValue);
	});
</script>

<svelte:document onkeydown={handleKeydown} />

<CommandDialog shouldFilter={false} bind:open>
	<CommandInput
		bind:value={searchValue}
		placeholder="Type a command or search..."
	/>
	<CommandList>
		{#each searchResult as item (item.id)}
			<CommandLinkItem href={`/docs/${item.id}`} class="cursor-pointer">
				{item.title}
			</CommandLinkItem>
		{:else}
			<CommandEmpty>No results found.</CommandEmpty>
		{/each}
	</CommandList>
</CommandDialog>

<Button
	variant="outline"
	onclick={() => (open = true)}
	class="w-64 items-center justify-between"
>
	<Search />
	<p>Search Documentation</p>
	<kbd
		class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100"
	>
		<span class="text-xs">⌘</span>k
	</kbd>
</Button>
