<script lang="ts">
	import type { User } from "$lib/domain/User";

    let {data} : {data: User} = $props();
</script>

<h1> Welcome {data.name} </h1>