<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { type LayoutData } from './$types';
	let { data, children }: { data: LayoutData, children: Snippet } = $props();

	let user = data.user
</script>

<nav class="nav">
	<h1> Task Tracker </h1>
	{#if user.verified === true}
		<a href="/tasks">Tasks</a>
		<a href="/profile">Profile</a>
		<a href="/logout">Logout</a>
	{:else}
		<a href="/login">Login</a>
	{/if}
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
	}
	main{
		flex-grow: 1;
		display: flex;
		width: 100%;
		background-color: #d8d8d8;
	}
</style>
