<script lang="ts">
	import { flip } from 'svelte/animate';
	import { ElementState } from '../../routes/sorting/insertion/algorithm';
	import type { SortingAlgorithm } from '$lib/algorithmControllers/SortingAlgorithm';

	export let algo: SortingAlgorithm<any, {}>;
	export let onUpdate: () => void = () => {};

	algo.register('update', () => {
		onUpdate();
	});

	let main: HTMLElement;

	function calcPxHeight(value: number): number {
		return (value / algo.data.arrMax) * (main.clientHeight - 90) + 40;
	}

	const stateColorMap: any = {
		[ElementState.Default]: 'bg-red-500',
		[ElementState.Checking]: 'bg-red-300',
		[ElementState.Inserting]: 'bg-blue-300',
		[ElementState.Complete]: 'bg-green-700'
	};
</script>

<main class="h-full overflow-hidden p-5" bind:this={main}>
	<ul class="flex h-full items-center justify-between gap-3">
		{#if main != undefined}
			{#each algo.data.arr as { id, value, state } (id)}
				<li
					animate:flip={{ duration: algo.interval / 4 }}
					class={`flex w-full items-center justify-center rounded-xl p-1 text-2xl ${stateColorMap[state]}`}
					style={`height:${calcPxHeight(value)}px;`}
				>
					{value}
				</li>
			{/each}
		{/if}
	</ul>
</main>
