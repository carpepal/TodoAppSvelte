<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav>
	<h1> Task Tracker </h1>
</nav>
{@render children()}
