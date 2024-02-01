<script lang="ts">
	import BarView from '$lib/components/BarView.svelte';
	import StatusLine from '$lib/components/StatusBar.svelte';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import SelectionSort from './algorithm';

	let algo = new SelectionSort([5, 10, 15, 20, 27, 35]);

	function onUpdate() {
		algo = algo;
	}
</script>

<TitleBar breadcrumb={['Sorting', 'Selection Sort']} />
<BarView {algo} {onUpdate} />
<StatusLine {algo} {onUpdate} />
