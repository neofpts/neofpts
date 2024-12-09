<script lang="ts">
	import { cn } from "@/utils.js";
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";

	let {
		class: className,
		level = 3,
		ref = $bindable(null),
		...restProps
	}: AlertDialogPrimitive.TitleProps = $props();
</script>

<AlertDialogPrimitive.Title
	bind:ref
	class={cn("text-lg font-semibold", className)}
	{level}
	{...restProps}
/>
