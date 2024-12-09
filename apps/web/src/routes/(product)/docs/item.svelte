<script lang="ts">
	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger
	} from "@/components/ui/collapsible";
	import {
		SidebarMenuAction,
		SidebarMenuButton,
		SidebarMenuItem,
		SidebarMenuSub
	} from "@/components/ui/sidebar";
	import type { PageTreeItem } from "@/helpers/doc";
	import { ChevronRight } from "lucide-svelte";
	import Self from "./item.svelte";

	let { item }: { item: PageTreeItem } = $props();
</script>

{#if item.items.length > 0}
	<Collapsible title={item.title} class="group/collapsible">
		<SidebarMenuItem>
			<SidebarMenuButton class="w-full">
				<a href={`/docs/${item.id}`} class="flex-1 font-medium">
					{item.title}
				</a>
			</SidebarMenuButton>
			<CollapsibleTrigger>
				{#snippet child({ props })}
					<SidebarMenuAction class="aspect-square size-5 " {...props}>
						<ChevronRight
							class="transition-transform group-data-[state=open]/collapsible:rotate-90"
						/>
					</SidebarMenuAction>
				{/snippet}
			</CollapsibleTrigger>
			<CollapsibleContent>
				<SidebarMenuSub class="mr-0 pr-0.5">
					{#each item.items as subItem (subItem.id)}
						<Self item={subItem} />
					{/each}
				</SidebarMenuSub>
			</CollapsibleContent>
		</SidebarMenuItem>
	</Collapsible>
{:else}
	<SidebarMenuItem>
		<SidebarMenuButton class="w-full">
			<a href={`/docs/${item.id}`} class="flex-1 font-medium">
				{item.title}
			</a>
		</SidebarMenuButton>
	</SidebarMenuItem>
{/if}
