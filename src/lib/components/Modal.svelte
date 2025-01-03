<script>
	import Close from 'svelte-material-icons/Close.svelte';
	let { children, onClose } = $props();
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
	<div class="relative h-3/4 w-3/4 rounded-md bg-slate-200 p-4">
		<button class="absolute right-5 top-5" onclick={onClose}>
			<Close size="1.5rem" />
		</button>
		{@render children()}
	</div>
</div>
