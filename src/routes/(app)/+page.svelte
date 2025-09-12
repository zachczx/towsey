<script lang="ts">
	import { goto } from '$app/navigation';
	import PageWrapper from '$lib/PageWrapper.svelte';
	import { pb } from '$lib/pb';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!pb.authStore.isValid) {
			goto('/login');
		}
	});
</script>

<PageWrapper title="Towsey" {pb}>
	<main class="-mt-12 grid h-full content-center justify-items-center max-lg:gap-24 lg:grid-cols-2">
		<a href="/towelie" class="grid gap-2 text-center">
			<h2 class="font-towelie-logo hover:text-primary text-center text-7xl xl:text-9xl">Towelie</h2>
			<div>Track towel washes</div>
		</a>
		<a href="/nosey" class="grid gap-2 text-center">
			<h2 class="font-space hover:text-primary text-7xl font-bold xl:text-9xl">Nosey</h2>
			<div>Track nasal sprays</div>
		</a>
	</main>
</PageWrapper>
