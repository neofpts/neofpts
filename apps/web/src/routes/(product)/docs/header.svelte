<script lang="ts">
	import { Button } from "@/components/ui/button";
	import { Moon, Sun } from "lucide-svelte";
	import { toggleMode } from "mode-watcher";
	import Search from "./search.svelte";
</script>

<nav
	class="flex w-full items-center justify-between border-b px-2 py-2 lg:px-4"
>
	<div class="flex-1"></div>

	<div class="flex flex-1 justify-center">
		<Search />
	</div>

	<div class="flex flex-1 items-center justify-end">
		<Button onclick={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</nav>
