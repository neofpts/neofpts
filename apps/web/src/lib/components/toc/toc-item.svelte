<script lang="ts">
	import { SidebarMenuItem } from "@/components/ui/sidebar";
	import type { TocItem } from "@/helpers/rehype-toc-json";
	import Self from "./toc-item.svelte";

	let { item }: { item: TocItem } = $props();
</script>

<SidebarMenuItem
	class="before:bg-sidebar-border relative before:absolute before:-bottom-2 before:-top-2 before:left-0 before:w-0.5 first:before:top-0 last:before:bottom-0"
>
	<a
		href={`#${item.id}`}
		class="text-muted-foreground hover:text-foreground"
		style={`padding-left: ${item.depth}rem`}
	>
		{item.text}
	</a>
</SidebarMenuItem>
{#if item.items && item.items.length > 0}
	{#each item.items as subItem (subItem.id)}
		<Self item={subItem} />
	{/each}
{/if}
