<script lang="ts">
	import type { Snippet } from 'svelte';
	import { goto } from '$app/navigation';
	import '../app.css';
	import { type LayoutData } from './$types';
	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let user = data.user;

	function logout() {
		goto('/login?logout=true');
	}
</script>

<nav class="nav">
	<h1>Task Tracker</h1>
	<div class="actions">
		{#if user.verified === true}
			<a href="/profile">Profile</a>
			<button type="button" onclick={logout}>Logout</button>
		{:else}
			<a href="/login">Login</a>
		{/if}
	</div>
</nav>
<main>
	{@render children()}
</main>

<style lang="postcss">
	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		padding: 1rem;
		background-color: #333;
		color: white;

		.actions {
			display: flex;
			gap: 1rem;
		}
	}
	main {
		flex-grow: 1;
		display: flex;
		width: 100%;
		background-color: #d8d8d8;
	}
</style>
