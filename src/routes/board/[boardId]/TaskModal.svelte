<script lang="ts">
	import type { TaskDto } from '$lib/domain/Task';
	import Modal from '$lib/components/Modal.svelte';
	import EditSquare from 'svelte-material-icons/SquareEditOutline.svelte';
	import TrashCan from 'svelte-material-icons/TrashCan.svelte';
	import { taskId, tasks } from '$lib/stores/tasks.store';
	let { task } = $props();
	let isEditing = $state(false);

	const handleChangeStatus = async () => {
		const result = await fetch(`/api/task/${task.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(task)
		});
		console.log(result);
		if (result.ok) {
			tasks.update((prevTasks) => {
				return prevTasks.map((prevTask) => {
					if (prevTask.id === task.id) {
						return task;
					}
					return prevTask;
				});
			});
		}
	};

	const handleDeleteTask = async () => {
		const result = await fetch(`/api/task/${task.id}`, {
			method: 'DELETE'
		});
		if (result.ok) {
			tasks.update((prevTasks) => {
				return prevTasks.filter((prevTask) => prevTask.id !== task.id);
			});
			closeModal();
		}
	};

	const closeModal = () => {
		taskId.set(null);
	};

	$effect(() => {
		$inspect(task);
	});
</script>

<Modal onClose={closeModal}>
	{#if isEditing}
		<div></div>
	{:else}
		<div class="mb-5 flex min-w-96 flex-row items-center text-2xl">
			<h1 class="mr-3">
				{task.title}
			</h1>
			<EditSquare size="1.5rem" />
		</div>
		<div class="mb-5 flex w-full flex-col">
			<h3>Estado</h3>
			<select bind:value={task.status} onchange={handleChangeStatus} class=" w-1/2">
				<option value="OPEN" selected={task.status === 'OPEN'}>OPEN</option>
				<option value="IN_PROGRESS" selected={task.status === 'IN_PROGRESS'}>IN_PROGRESS</option>
				<option value="DONE" selected={task.status === 'DONE'}>DONE</option>
			</select>
		</div>
		<div class="description">
			<h3>Descripción</h3>
			<p>{task.description}</p>
		</div>
	{/if}
	<button class="absolute bottom-5 right-5 rounded bg-red-500 p-2" onclick={handleDeleteTask}>
		<TrashCan size="2rem" />
	</button>
</Modal>

<style lang="postcss">
	select {
		border-radius: 0.5rem;
		border: 1px solid rgba(109, 173, 233, 0.8);
		padding: 0.5rem;
		background-color: rgba(109, 173, 233, 0.1);
	}

	.description p {
		border-radius: 0.5rem;
		border: 1px solid rgba(109, 173, 233, 0.8);
		padding: 0.5rem;
	}
</style>
