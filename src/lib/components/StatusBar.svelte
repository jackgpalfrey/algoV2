<script lang="ts">
	import AlgorithmController from '$lib/algorithmControllers/AlgorithmController';
	import { onMount } from 'svelte';
	import ExplorerPanel from './ExplorerPanel.svelte';

	export let algo: AlgorithmController<any>;
	export let onUpdate: () => void = () => {};

	// INPUT STUFF
	onMount(() => {
		function keypressHandler(e: KeyboardEvent) {
			if (e.key === ':' && !inputOpen) openInput();
			if (e.key === 'c' && e.ctrlKey && inputOpen) closeInput();
		}

		window.addEventListener('keyup', keypressHandler);

		return () => window.removeEventListener('keyup', keypressHandler);
	});

	let inputEl: HTMLElement;
	let inputVal: string = '';

	let inputOpen = false;
	function openInput() {
		inputOpen = true;
		inputVal = ':';
	}

	function closeInput() {
		inputOpen = false;
		inputVal = '';
	}

	function onInputChange() {
		if (inputOpen && !inputVal.startsWith(':')) closeInput();
	}

	function submitInput() {
		algo.exec(inputVal.substring(1));
		onUpdate();
		closeInput();
	}

	let isExplorerOpen = false;
</script>

{#if isExplorerOpen}
	<ExplorerPanel />
{/if}
<footer class="z-20 flex h-[5%] w-full items-center justify-between p-3">
	{#if inputOpen}
		<input
			on:change={submitInput}
			bind:this={inputEl}
			bind:value={inputVal}
			on:input={onInputChange}
			autofocus
			class="justify-self-start bg-transparent"
		/>
	{:else}
		<p class="justify-self-start">{algo.status.status}</p>
	{/if}
	<div class="flex h-[5%] items-center gap-5">
		<slot />
	</div>
</footer>
