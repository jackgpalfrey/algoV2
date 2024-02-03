<script lang="ts">
	import { AlgorithmState } from '$lib/algorithmControllers/AlgorithmController';
	import BarView from '$lib/components/BarView.svelte';
	import StatusLine from '$lib/components/StatusBar.svelte';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import SelectionSort from './algorithm';

	let algo = new SelectionSort([5, 10, 15, 20, 27, 35]);

	function onUpdate() {
		algo = algo;
	}
    algo.onUpdate = onUpdate
</script>

<TitleBar breadcrumb={['Sorting', 'Selection Sort']} />
<BarView {algo} {onUpdate} />
<StatusLine {algo} onUpdate={onUpdate}>
	<button on:click={() => algo.exec('toggleStart')} class="bold text-lg text-red-400"
		>{algo.state === AlgorithmState.Running ? 'Stop' : 'Start'}</button
	>
	<button on:click={() => algo.exec('step')} class="bold text-lg text-red-400">Step</button>
</StatusLine>
