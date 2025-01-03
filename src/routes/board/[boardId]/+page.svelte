<script lang="ts">
	import { writable, derived } from 'svelte/store';
	import type { PageData } from './$types';
	import type { TaskDto } from '$lib/domain/Task';
	import TaskModal from './TaskModal.svelte';
	import { tasks, taskId } from '$lib/stores/tasks.store';
	let { data }: { data: PageData } = $props();

	tasks.set(data.tasks);

	let selectTask = derived(
		[taskId, tasks],
		([$taskId, $tasks]) => $tasks.find((task) => task.id === $taskId) || null
	);

	function generateEmojis(start, end) {
		let emojis = [];
		for (let i = start; i <= end; i++) {
			emojis.push(String.fromCodePoint(i));
		}
		return emojis;
	}

	// Generar emojis de los rangos deseados
	let emoticons = [
		...generateEmojis(0x1f600, 0x1f64f), // Emojis de caras
		...generateEmojis(0x1f680, 0x1f6ff), // Emojis de transporte y símbolos
		...generateEmojis(0x1f300, 0x1f5ff) // Emojis de naturaleza y objetos
	];

	$effect(() => {
		$inspect($tasks);
		$inspect($taskId);
	});
</script>

<div class="flex h-full w-full flex-col items-center">
	<h1 class="w-full pl-56 pt-10 text-4xl">Tareas</h1>

	<div class="table">
		{#each $tasks as task}
			<div class="table__row" onclick={() => taskId.set(task.id)} role="button">
				<div class="table__cell">
					<div
						class="flex aspect-square w-8 items-center justify-center rounded-md bg-slate-200 text-lg"
					>
						{task.icon}&#128027
					</div>
				</div>
				<div class="table__cell">{task.title}</div>
				<div class="table__cell">{task.status}</div>
			</div>
		{/each}
	</div>
</div>

{#if $taskId}
	<TaskModal task={$selectTask} />
{/if}

<style lang="postcss">
	.table {
		margin-top: 4rem;
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 70%;
		.table__row {
			display: flex;
			flex-direction: row;
			flex: 1;
			max-height: 3rem;
			border-radius: 0.5rem;
			margin-bottom: 0.75rem;
			transition: background-color 0.2s;

			.table__cell {
				justify-content: center;
				align-items: center;
				display: flex;
				flex: 1;

				&:first-child {
					padding-left: 1.5rem;
					flex: 0.25;
					display: flex;
					justify-content: start;
				}

				&:last-child {
					flex: 0.5;
					display: flex;
					justify-content: end;
					padding-right: 1.5rem;
				}
			}

			&:nth-child(4n + 1) {
				background-color: rgb(242, 205, 84);
				&:hover {
					background-color: rgba(242, 205, 84, 0.65);
				}
			}
			&:nth-child(4n + 2) {
				background-color: #3e923e;
				&:hover {
					background-color: rgba(62, 146, 62, 0.65);
				}
			}
			&:nth-child(4n + 3) {
				background-color: #7f98f1;
				&:hover {
					background-color: rgba(127, 152, 241, 0.65);
				}
			}
			&:nth-child(4n + 4) {
				background-color: rgb(239, 92, 44);
				&:hover {
					background-color: rgba(239, 92, 44, 0.65);
				}
			}

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
