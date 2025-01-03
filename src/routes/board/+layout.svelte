<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import type { BoardDto } from '$lib/domain/Board';

	let isMenuOpen = $state(false);

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let boards: BoardDto[] = data.boards ?? [];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function addTask() {}

	function addBoard() {}
</script>

<div class="flex h-full w-full">
	<aside class="c flex h-full w-1/5 bg-slate-400">
		{#each boards as board}
			<a
				href="/board/{board.id}"
				class="flex h-16 w-full items-center justify-center border-b-2 border-slate-600 hover:bg-slate-600"
			>
				{board.name}
			</a>
		{/each}
	</aside>
	<div class="w-full bg-slate-100">
		{@render children()}
		<div class="menu">
			{#if isMenuOpen}
				<ul class="menu__content" transition:slide>
					<li>
						<button type="button" onclick={addTask}>
							<img src="/icons/SquarePlusIcon.svg" alt="table icon" />
							Añadir Tarea
						</button>
					</li>
					<li>
						<button type="button" onclick={addBoard}>
							<img src="/icons/TableIcon.svg" alt="table icon" />
							Añadir Tablero
						</button>
					</li>
				</ul>
			{/if}
			<button
				type="button"
				class="menu__button {isMenuOpen ? 'menu--open' : ''}"
				onclick={() => {
					isMenuOpen = !isMenuOpen;
				}}
				aria-label="menu button"
			>
				<img src="/icons/PlusIcon.svg" alt="Plus Icon" />
			</button>
		</div>
	</div>
</div>

<style lang="postcss">
	.menu {
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: end;
		bottom: 3rem;
		right: 3rem;
	}

	.menu__button {
		position: relative;
		bottom: 0;
		left: 0;
		color: white;
		background-color: rgb(124, 124, 244);
		box-shadow: inset 10px 0 20px rgba(0, 0, 0, 0.2);
		width: 50px;
		border-radius: 40px;
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			background-color: rgba(124, 124, 244, 0.8);
		}
		&.menu--open {
			border-radius: 50px !important;
			background-color: rgba(124, 124, 244, 2);
		}
	}

	.menu__content {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: start;
		border-radius: 20px;
		list-style: none;
		padding: 0;
		align-items: left;
		width: 20vw;
		margin-bottom: 1rem;

		li {
			padding: 0.75rem;
			margin-top: 0.5rem;
			border-radius: 20px;
			background-color: #c3c3c3;
			box-shadow: inset 20px 0 20px rgba(0, 0, 0, 0.1);
			transition: background-color 0.3s;
			&:hover {
				background-color: #666666;
			}
			&:last-child {
				margin-bottom: 0.5rem;
			}

			button {
				display: flex;
				flex: 1 0 auto;
				flex-direction: row;

				img {
					margin-right: 1rem;
				}
			}
		}
	}
</style>
