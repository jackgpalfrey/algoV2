<script lang="ts">
	import type BubbleSort from '../../routes/sorting/bubble/algorithm';

	export let algo: BubbleSort;
	export let onUpdate: () => void = () => {};

	let status = 'Ready';

	function step() {
		({ status } = algo.step());
		onUpdate();
		algo = algo;
	}
</script>

<footer class="flex h-[5%] w-full items-center justify-between p-3">
	<p class="justify-self-start">{status}</p>
	<div class="flex h-[5%] items-center gap-5">
		<p>{algo.swaps}/{algo.comparisons}</p>
		<button on:click={step} class="bold text-lg text-red-400">Step</button>
	</div>
</footer>
