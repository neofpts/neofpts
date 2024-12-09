<script>
	import { SiGithub } from "@icons-pack/svelte-simple-icons";
</script>

<footer class="border-t px-4 py-12 md:px-6">
	<div class="container mx-auto">
		<div class="flex flex-wrap gap-8">
			<div>
				<h3 class="mb-4 text-lg font-semibold">Neofpts</h3>
				<p class="text-muted-foreground max-w-md text-sm">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Possimus, veniam illum nulla magnam totam quisquam facere
					molestias soluta unde, fuga magni reiciendis libero debitis
					quibusdam consectetur quaerat ad provident sequi.
				</p>
			</div>
			<div
				class="flex min-w-56 flex-1 flex-row flex-wrap justify-between lg:justify-evenly"
			>
				<div>
					<h4 class="mb-4 text-sm font-semibold">Legal</h4>
					<ul class="space-y-2">
						<li>
							<a
								href="/legal/privacy-policy"
								class="text-muted-foreground hover:text-foreground text-sm"
								>Privacy Policy</a
							>
						</li>
						<li>
							<a
								href="/legal/terms-of-service"
								class="text-muted-foreground hover:text-foreground text-sm"
								>Terms of Service</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div
			class="border-muted-foreground/20 mt-12 flex flex-col items-center justify-between border-t pt-8 md:flex-row"
		>
			<p class="text-muted-foreground text-sm">
				&copy; {new Date().getFullYear()} Neofpts. All rights reserved.
			</p>
			<div class="mt-4 flex space-x-4 md:mt-0">
				<a
					href="https://github.com/neofpts/neofpts"
					class="text-muted-foreground hover:text-foreground"
				>
					<SiGithub size={24} />
					<span class="sr-only">Github</span>
				</a>
			</div>
		</div>
	</div>
</footer>
