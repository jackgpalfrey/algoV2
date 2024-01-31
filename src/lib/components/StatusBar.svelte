<script lang="ts">
	import { onMount } from 'svelte';
	import type BubbleSort from '../../routes/sorting/bubble/algorithm';

	export let algo: BubbleSort;
	export let onUpdate: () => void = () => {};

	algo.onStep = () => {
		algo = algo;
		onUpdate();
	};

	function step() {
		inputVal = ':step';
		submitInput();
	}

	function toggleStart() {
		inputVal = algo.isRunning ? ':stop' : ':start';
		submitInput();
	}

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
</script>

<footer class="flex h-[5%] w-full items-center justify-between p-3">
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
		<p>{algo.swaps}/{algo.comparisons}</p>
		<button on:click={toggleStart} class="bold text-lg text-red-400">{ algo.isRunning ? "Stop": "Start" }</button>
		<button on:click={step} class="bold text-lg text-red-400">Step</button>
	</div>
</footer>
