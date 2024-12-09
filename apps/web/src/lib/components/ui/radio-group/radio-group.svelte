<script lang="ts">
	import { cn } from "@/utils.js";
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(),
		...restProps
	}: RadioGroupPrimitive.RootProps = $props();

	export { className as class };
</script>

<RadioGroupPrimitive.Root
	bind:value
	class={cn("grid gap-2", className)}
	{...restProps}
	bind:ref
/>
