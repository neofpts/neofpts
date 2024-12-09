<script lang="ts">
	import { buttonVariants } from "@/components/ui/button/index.js";
	import { cn } from "@/utils.js";
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: AlertDialogPrimitive.ActionProps = $props();
</script>

<AlertDialogPrimitive.Action
	bind:ref
	class={cn(buttonVariants(), className)}
	{...restProps}
/>
