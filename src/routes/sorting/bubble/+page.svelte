<script lang="ts">
	import StatusLine from '$lib/components/StatusBar.svelte';
	import BubbleSort, { ElementState } from './algorithm';
	import { flip } from 'svelte/animate';

	let { arr, max } = BubbleSort.makeSortable([5, 4, 3, 2, 4, 1]);

	let algo = new BubbleSort(arr);

	function onUpdate() {
		algo = algo;
	}

	let main: HTMLElement;
	function calcPxHeight(value: number): number {
		return (value / max) * (main.clientHeight - 50);
	}

	const stateColorMap = {
		[ElementState.Default]: 'bg-red-500',
		[ElementState.Checking]: 'bg-red-300',
		[ElementState.Complete]: 'bg-green-700'
	};
</script>

<title>Bubble Sort</title>
<div class="flex h-[100%] flex-col">
	<header class="flex h-[5%] items-center justify-center">
		<h1 class="text-center text-2xl text-red-500">Sorting - Bubble Sort</h1>
	</header>
	<main class="h-full overflow-hidden p-5" bind:this={main}>
		<ul class="flex h-full items-center justify-between gap-3">
			{#if main != undefined}
				{#each algo.data as { id, value, state } (id)}
					<li
						animate:flip={{ duration: 200 }}
						class={`flex w-full items-center justify-center rounded-xl p-1 ${stateColorMap[state]}`}
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
