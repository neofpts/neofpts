<script lang="ts">
	import {
		buttonVariants,
		type Props as ButtonProps
	} from "@/components/ui/button/index.js";
	import { cn } from "@/utils.js";
	import {
		Pagination as PaginationPrimitive,
		type WithoutChild
	} from "bits-ui";

	type Props = WithoutChild<PaginationPrimitive.PageProps> &
		ButtonProps & {
			isActive?: boolean;
		};

	let {
		ref = $bindable(null),
		class: className,
		size = "icon",
		isActive = false,
		page,
		children,
		...restProps
	}: Props = $props();
</script>

{#snippet Fallback()}
	{page.value}
{/snippet}

<PaginationPrimitive.Page
	{page}
	bind:ref
	class={cn(
		buttonVariants({
			variant: isActive ? "outline" : "ghost",
			size
		}),
		className
	)}
	{...restProps}
	children={children || Fallback}
/>
