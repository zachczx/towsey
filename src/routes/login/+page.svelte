<script>
	import { goto } from '$app/navigation';
	import MaterialSymbolsVisibilityOffOutline from '$lib/assets/svg/MaterialSymbolsVisibilityOffOutline.svelte';
	import MaterialSymbolsVisibilityOutline from '$lib/assets/svg/MaterialSymbolsVisibilityOutline.svelte';
	import PageWrapper from '$lib/PageWrapper.svelte';
	import { pb } from '$lib/pb';
	import { addToast } from '$lib/ui/ArkToaster.svelte';

	if (pb.authStore.isValid) {
		goto('/');
	}

	let email = $state('');
	let password = $state('');
	let togglePasswordStatus = $state(false);

	async function submitHandler() {
		spinner = true;
		const cleanEmail = email.toLowerCase().trim();
		const cleanPassword = password.trim();

		try {
			const authData = await pb.collection('users').authWithPassword(cleanEmail, cleanPassword);
			console.log(authData);
			if (authData.token) {
				addToast('success', 'Logged in successfully!');
				spinner = false;
				goto('/app');
			}
		} catch (err) {
			console.log(err);
		}
	}

	let spinner = $state(false);
</script>

<PageWrapper title="Login" {pb}>
	<form class="grid w-full max-w-sm content-center">
		<div class="mb-12">
			<h1 class="text-primary text-9xl font-bold">Towsey</h1>
			<!-- <h2 class="flex items-center gap-2 text-2xl">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					class="material-symbols:subdirectory-arrow-right-rounded"
					viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M13.3 20.275q-.3-.3-.3-.7t.3-.7L16.175 16H7q-.825 0-1.412-.587T5 14V5q0-.425.288-.712T6 4t.713.288T7 5v9h9.175l-2.9-2.9q-.3-.3-.288-.7t.288-.7q.3-.3.7-.312t.7.287L19.3 14.3q.15.15.212.325t.063.375t-.063.375t-.212.325l-4.575 4.575q-.3.3-.712.3t-.713-.3"
					/></svg
				>Login
			</h2> -->
		</div>

		<fieldset class="fieldset">
			<input
				type="text"
				name="email"
				bind:value={email}
				class="input w-full"
				placeholder="Email address"
			/>
		</fieldset>

		<fieldset class="fieldset">
			<label class="input validator w-full gap-4">
				<input
					type={togglePasswordStatus ? 'text' : 'password'}
					bind:value={password}
					placeholder="Password"
					required
				/>
				<button type="button" class="cursor-pointer" onclick={togglePassword}>
					{#if togglePasswordStatus}
						<MaterialSymbolsVisibilityOffOutline class="h-[1em] opacity-75" />
					{:else}
						<MaterialSymbolsVisibilityOutline class="h-[1em] opacity-75" />
					{/if}
				</button>
			</label>
		</fieldset>
		<button class="btn btn-primary mt-4" onclick={() => submitHandler()}>
			{#if !spinner}
				Login
			{:else}
				<span class="loading loading-md loading-spinner"></span>
			{/if}
		</button>
	</form>
</PageWrapper>
