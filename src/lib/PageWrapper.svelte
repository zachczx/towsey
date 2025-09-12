<script lang="ts">
	import { page } from '$app/state';

	import type Client from 'pocketbase';
	import type { Snippet } from 'svelte';
	import MaterialSymbolsClose from './assets/svg/MaterialSymbolsClose.svelte';

	let { pb, children, title }: { pb: Client; children: Snippet; title: string } = $props();

	let drawerToggle = $state() as HTMLInputElement;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="grid min-h-dvh w-full grid-rows-[auto_1fr] content-start justify-items-center">
	<div class="navbar border-b-base-300/50 bg-neutral text-neutral-content h-14 border-b p-0.5 px-2">
		<div class="navbar-start">
			<div class="dropdown">
				<div class="drawer">
					<input id="side-drawer" type="checkbox" class="drawer-toggle" bind:this={drawerToggle} />
					<div class="drawer-content">
						<!-- Page content here -->
						<label for="side-drawer" class="btn btn-ghost drawer-button"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg></label
						>
					</div>
					<div class="drawer-side">
						<label for="side-drawer" aria-label="close sidebar" class="drawer-overlay"></label>

						<ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
							<div class="flex items-center justify-end">
								<button
									class="btn btn-ghost"
									onclick={() => {
										drawerToggle.checked = false;
									}}
									onmousedown={() => {
										drawerToggle.checked = false;
									}}><MaterialSymbolsClose class="size-5" /></button
								>
							</div>
							<li>
								<a
									href="/towelie"
									class="text-base-content flex w-full gap-4 py-4 text-lg font-semibold"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="1em"
										height="1em"
										class="lucide-lab:towel-rack size-[1.3em] opacity-50"
										viewBox="0 0 24 24"
										><path
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 6H2m4-4h12a2 2 0 0 1 2 2v18H8V4a2 2 0 0 0-4 0v15h4M22 6h-2M8 18h12"
										/></svg
									>Towelie</a
								>
							</li>
							<li>
								<a
									href="/nosey"
									class="text-base-content flex w-full gap-4 py-4 text-lg font-semibold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1em"
										height="1em"
										class="material-symbols:health-and-safety-outline size-[1.3em] opacity-50"
										viewBox="0 0 24 24"
										><path
											fill="currentColor"
											d="M10.5 15.5h3V13H16v-3h-2.5V7.5h-3V10H8v3h2.5zM12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22m0-2.1q2.6-.825 4.3-3.3t1.7-5.5V6.375l-6-2.25l-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3m0-7.9"
										/></svg
									>Nosey</a
								>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<a href="/" class="btn btn-ghost text-xl font-bold">Towsey</a>
		</div>
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal gap-8 px-1 text-lg">
				<li>
					<a
						href="/towelie"
						class={[
							page.route.id?.includes('towelie') &&
								'border-b-neutral-content rounded-none border-b-2 font-bold',
							!page.route.id?.includes('towelie') && 'hover:bg-white/20'
						]}>Towelie</a
					>
				</li>
				<li>
					<a
						href="/nosey"
						class={[
							page.route.id?.includes('nosey') &&
								'border-b-neutral-content rounded-none border-b-2 font-bold',
							!page.route.id?.includes('nosey') && 'hover:bg-white/20'
						]}>Nosey</a
					>
				</li>
			</ul>
		</div>
		<div class="navbar-end hidden gap-4 text-sm lg:flex">
			{#if pb.authStore.isValid}
				{pb.authStore.record?.email}<a href="/logout" class="btn btn-sm btn-outline">Logout</a>
			{:else}
				<a href="/register" class="underline">Register</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a
					href="/login"
					class="underline">Login</a
				>
			{/if}
		</div>
	</div>

	<div class="w-full px-2 py-4 lg:px-12 lg:pt-12">
		{@render children?.()}
	</div>
</div>
