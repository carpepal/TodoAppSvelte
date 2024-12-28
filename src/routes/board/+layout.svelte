<script lang="ts">
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import type { BoardDto } from "$lib/domain/Board";


    let { data , children }: {data: LayoutData , children:Snippet}= $props();

    let boards: BoardDto[]= data.boards ?? [];

</script>
<div class="flex w-full h-full">
    <aside class="flex h-full w-1/5 bg-slate-400 c">
            {#each boards as board}
                <a  href="/board/{board.id}" class="border-b-2 border-slate-600 w-full h-16 flex justify-center items-center hover:bg-slate-600">
                    {board.name}
                </a>
            {/each}
    </aside>
    <div>{@render children()}</div>
</div>