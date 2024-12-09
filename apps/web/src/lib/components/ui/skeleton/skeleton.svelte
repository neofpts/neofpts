<script lang="ts">
	import { cn } from "@/utils.js";
	import type { WithElementRef, WithoutChildren } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<
		WithElementRef<HTMLAttributes<HTMLDivElement>>
	> = $props();
</script>

<div
	bind:this={ref}
	class={cn("bg-primary/10 animate-pulse rounded-md", className)}
	{...restProps}
></div>
