<script lang="ts">
	import { AlgorithmState } from '$lib/algorithmControllers/AlgorithmController';
	import BarView from '$lib/components/BarView.svelte';
	import SLineButton from '$lib/components/SLineButton.svelte';
	import StatusLine from '$lib/components/StatusBar.svelte';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import SelectionSort from './algorithm';

	let algo = new SelectionSort([5, 10, 15, 20, 27, 35]);

	function onUpdate() {
		algo = algo;
	}
	algo.onUpdate = onUpdate;
</script>

<TitleBar breadcrumb={['Sorting', 'Selection Sort']} />
<BarView {algo} {onUpdate} />
<StatusLine {algo} {onUpdate}>
	<SLineButton
		text={algo.state === AlgorithmState.Running ? 'Stop' : 'Start'}
		action={() => algo.exec('toggleStart')}
	/>
	<SLineButton text="Step" action={() => algo.exec('step')} />
</StatusLine>
