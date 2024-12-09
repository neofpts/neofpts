<script lang="ts">
	import { cn } from "@/utils.js";
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: RangeCalendarPrimitive.GridBodyProps = $props();
</script>

<RangeCalendarPrimitive.GridBody
	bind:ref
	class={cn(className)}
	{...restProps}
/>
