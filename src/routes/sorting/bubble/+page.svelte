<script lang="ts">
	import { AlgorithmState } from '$lib/algorithmControllers/AlgorithmController';
	import BarView from '$lib/components/BarView.svelte';
	import SLineButton from '$lib/components/SLineButton.svelte';
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
	<SLineButton
		text={algo.state === AlgorithmState.Running ? 'Stop' : 'Start'}
		action={() => algo.exec('toggleStart')}
	/>
	<SLineButton text="Step" action={() => algo.exec('step')} />
</StatusLine>
