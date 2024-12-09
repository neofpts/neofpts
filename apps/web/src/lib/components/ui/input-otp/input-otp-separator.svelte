<script lang="ts">
	import type { WithElementRef } from "bits-ui";
	import Minus from "lucide-svelte/icons/minus";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div bind:this={ref} role="separator" {...restProps}>
	{#if children}
		{@render children?.()}
	{:else}
		<Minus />
	{/if}
</div>
