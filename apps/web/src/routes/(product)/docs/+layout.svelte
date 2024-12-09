<script lang="ts">
	import { AppFooter } from "@/components/app";
	import { ScrollArea } from "@/components/ui/scroll-area";
	import {
		Sidebar,
		SidebarContent,
		SidebarGroup,
		SidebarHeader,
		SidebarMenu,
		SidebarMenuButton,
		SidebarMenuItem,
		SidebarProvider
	} from "@/components/ui/sidebar";
	import { getDocsPageTree } from "@/helpers/doc";
	import { BookOpen, LibraryBig, TerminalSquare } from "lucide-svelte";
	import type { Snippet } from "svelte";
	import Header from "./header.svelte";
	import Item from "./item.svelte";

	let { children }: { children: Snippet } = $props();

	const pageTree = getDocsPageTree();
</script>

<div class="flex size-full min-h-screen flex-col">
	<Header />
	<main class="min-h-screen flex-1">
		<div class="relative flex justify-center">
			<SidebarProvider class="mr-12 w-full max-w-xs flex-shrink border-r">
				<Sidebar
					collapsible="none"
					class="bg-background sticky top-0 hidden h-fit max-h-svh min-h-fit w-full min-w-full lg:flex"
				>
					<SidebarHeader>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									class="text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<div class="rounded-lg border p-1">
										<BookOpen class="size-5" />
									</div>
									<span class="font-bold">Documentation</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									class="text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<div class="rounded-lg border p-1">
										<TerminalSquare class="size-5" />
									</div>
									<span class="font-bold">
										API Reference
									</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									class="text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<div class="rounded-lg border p-1">
										<LibraryBig class="size-5" />
									</div>
									<span class="font-bold">Knowledge Base</span
									>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarHeader>
					<SidebarContent>
						<ScrollArea>
							<SidebarGroup>
								<SidebarMenu>
									{#each pageTree as item (item.id)}
										<Item {item} />
									{/each}
								</SidebarMenu>
							</SidebarGroup>
						</ScrollArea>
					</SidebarContent>
				</Sidebar>
			</SidebarProvider>

			<main
				class="flex flex-shrink-0 flex-grow flex-nowrap justify-center gap-6"
			>
				{@render children()}
			</main>
		</div>
	</main>
	<AppFooter />
</div>
