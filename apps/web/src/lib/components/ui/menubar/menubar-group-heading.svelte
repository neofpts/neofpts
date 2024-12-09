<script lang="ts">
	import { cn } from "@/utils.js";
	import { Menubar as MenubarPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		inset,
		...restProps
	}: MenubarPrimitive.GroupHeadingProps & {
		inset?: boolean;
	} = $props();
</script>

<MenubarPrimitive.GroupHeading
	bind:ref
	class={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
	{...restProps}
/>
