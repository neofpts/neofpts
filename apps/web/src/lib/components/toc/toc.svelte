<script lang="ts">
	import { ScrollArea } from "@/components/ui/scroll-area";
	import {
		Sidebar,
		SidebarContent,
		SidebarGroup,
		SidebarGroupContent,
		SidebarGroupLabel,
		SidebarMenu,
		SidebarProvider
	} from "@/components/ui/sidebar";
	import { type TocItem } from "@/helpers/rehype-toc-json";
	import Item from "./toc-item.svelte";

	let { items }: { items: TocItem[] } = $props();
</script>

<div class="h-full w-full max-w-sm flex-shrink">
	<div class="sticky top-0 h-fit max-h-svh">
		<ScrollArea class="h-full">
			<SidebarProvider class="h-full min-h-full">
				<Sidebar
					collapsible="none"
					class="bg-background h-full min-h-full w-full min-w-full"
				>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel class="pl-0 text-sm font-bold">
								On this page
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{#each items as item (item.id)}
										<Item {item} />
									{/each}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
			</SidebarProvider>
		</ScrollArea>
	</div>
</div>
