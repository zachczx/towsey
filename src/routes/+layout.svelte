<script lang="ts">
	import ArkToaster from '$lib/ui/ArkToaster.svelte';
	import '../app.css';
	import { pb } from '$lib/pb';
	import { goto } from '$app/navigation';

	let { children } = $props();

	if (!pb.authStore.isValid) {
		goto('/login');
	}
</script>

<ArkToaster />
{@render children()}
