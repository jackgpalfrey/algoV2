<script lang="ts">
	import BarView from '$lib/components/BarView.svelte';
	import StatusLine from '$lib/components/StatusBar.svelte';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import BubbleSort from './algorithm';

	let algo = new BubbleSort([5,12,15,3,4,20]);

	function onUpdate() {
		algo = algo;
	}
</script>

<TitleBar breadcrumb={['Sorting', 'Bubble Sort']} />
<BarView {algo} {onUpdate} />
<StatusLine {algo} {onUpdate} />
