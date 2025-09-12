<script lang="ts">
	import { page } from '$app/state';

	import type Client from 'pocketbase';
	import type { Snippet } from 'svelte';

	let { pb, children, title }: { pb: Client; children: Snippet; title: string } = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="grid min-h-dvh w-full grid-rows-[auto_1fr] content-start justify-items-center">
	<div
		class="navbar border-b-base-300/50 bg-neutral text-neutral-content min-h-14 border-b p-0.5 px-2"
	>
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
					<svg
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
					</svg>
				</div>
				<ul
					tabindex="-1"
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
				>
					<!-- <li><a>Item 1</a></li>
					<li>
						<a>Parent</a>
						<ul class="p-2">
							<li><a>Submenu 1</a></li>
							<li><a>Submenu 2</a></li>
						</ul>
					</li>
					<li><a>Item 3</a></li> -->
				</ul>
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
