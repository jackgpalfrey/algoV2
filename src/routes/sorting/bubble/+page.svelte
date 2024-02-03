<script lang="ts">
	import { AlgorithmState } from '$lib/algorithmControllers/AlgorithmController';
	import BarView from '$lib/components/BarView.svelte';
	import StatusLine from '$lib/components/StatusBar.svelte';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import BubbleSort from './algorithm';

	let algo = new BubbleSort([5, 12, 15, 3, 4, 20]);

	algo.onUpdate = () => {
		algo = algo;
	};
</script>

<TitleBar breadcrumb={['Sorting', 'Bubble Sort']} />
<BarView {algo} onUpdate={algo.onUpdate} />
<StatusLine {algo} onUpdate={algo.onUpdate}>
	<button on:click={() => algo.exec('toggleStart')} class="bold text-lg text-red-400"
		>{algo.state === AlgorithmState.Running ? 'Stop' : 'Start'}</button
	>
	<button on:click={() => algo.exec('step')} class="bold text-lg text-red-400">Step</button>
</StatusLine>
