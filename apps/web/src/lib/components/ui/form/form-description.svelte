<script lang="ts">
	import { cn } from "@/utils.js";
	import type { WithoutChild } from "bits-ui";
	import * as FormPrimitive from "formsnap";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChild<FormPrimitive.DescriptionProps> = $props();
</script>

<FormPrimitive.Description
	bind:ref
	class={cn("text-muted-foreground text-[0.8rem]", className)}
	{...restProps}
/>
