<script lang="ts">
	import { flip } from 'svelte/animate';
	import { ElementState } from '../../routes/sorting/insertion/algorithm';
	import type { SortingAlgorithm } from '$lib/algorithmControllers/SortingAlgorithm';
	import { onMount } from 'svelte';

	export let algo: SortingAlgorithm<any, {}>;
	export let onUpdate: () => void = () => {};

	algo.register('update', () => {
		onUpdate();
	});

	let main: HTMLElement;

	onMount(() => {
		algo.exec('rand 6');
	});

	function calcPxHeight(value: number): number {
		return (value / algo.data.arrMax) * (main.clientHeight - 90) + 40;
	}

	function getContent(value: number): string | number {
		if (!algo.getConfig('numbers')) return '';
		return value;
	}

	const stateColorMap: any = {
		[ElementState.Default]: 'bg-red-500',
		[ElementState.Checking]: 'bg-red-300',
		[ElementState.Inserting]: 'bg-blue-300',
		[ElementState.Complete]: 'bg-green-700'
	};
</script>

<main class="h-full overflow-y-hidden p-5" bind:this={main}>
	<ul class={`flex h-full items-${algo.getConfig('barPos')} justify-between gap-2`}>
		{#if main != undefined}
			{#each algo.data.arr as { id, value, state } (id)}
				<li
					animate:flip={{ duration: algo.interval / 4 }}
					class={`bar flex w-full items-center justify-center rounded-md text-2xl ${stateColorMap[state]}`}
					style={`height:${calcPxHeight(value)}px;`}
				>
					{getContent(value)}
				</li>
			{/each}
		{/if}
	</ul>
</main>
