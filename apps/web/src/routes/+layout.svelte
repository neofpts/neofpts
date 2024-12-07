<script lang="ts">
	import { ParaglideJS } from "@inlang/paraglide-sveltekit";
	import { i18n } from "$lib/i18n";
	import "../app.css";
	import { Toaster } from "@/components/ui/sonner";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<ModeWatcher />
<Toaster richColors />
<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>
