<script lang="ts">
	import BarView from '$lib/components/BarView.svelte';
	import StatusLine from '$lib/components/StatusBar.svelte';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import InsertionSort from './algorithm';

	let algo = new InsertionSort([5, 10, 15, 20]);

	function onUpdate() {
		algo = algo;
	}
</script>

<TitleBar breadcrumb={['Sorting', 'Insertion Sort']} />
<BarView {algo} {onUpdate} />
<StatusLine {algo} {onUpdate} />
