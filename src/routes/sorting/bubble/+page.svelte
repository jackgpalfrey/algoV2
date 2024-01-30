<script lang="ts">
	import StatusLine from '$lib/components/StatusBar.svelte';
	import BubbleSort from './algorithm';
	import { flip } from 'svelte/animate';

	let { arr, max, min } = BubbleSort.makeSortable([5, 4, 3, 2, 4, 1]);

	let algo = new BubbleSort(arr);

	function onUpdate() {
		algo = algo;
	}

	let main: HTMLElement;
	function calcPxHeight(value: number): number {
		return (value / max) * (main.clientHeight - 50);
	}
</script>

<title>Bubble Sort</title>
<div class="flex h-[100%] flex-col">
	<header class="flex h-[5%] items-center justify-center">
		<h1 class="text-center text-2xl text-red-500">Sorting - Bubble Sort</h1>
	</header>
	<main class="h-full p-5" bind:this={main}>
		<ul class="flex h-full items-center justify-between gap-3">
			{#if main != undefined}
				{#each algo.data as { id, value, isSelected } (id)}
					<li
						animate:flip={{ duration: 200 }}
						class={`flex w-full items-center justify-center p-1 ${isSelected ? 'bg-red-300' : 'bg-red-500'}`}
						style={`height:${calcPxHeight(value)}px;`}
					>
						{value}
					</li>
				{/each}
			{/if}
		</ul>
	</main>
	<StatusLine {algo} {onUpdate} />
</div>
