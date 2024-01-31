<script lang="ts">
	export let breadcrumb: string[];
</script>

<title>{breadcrumb[breadcrumb.length - 1]}</title>
<header class="flex h-[5%] items-center justify-center">
	<h1 class="text-center text-2xl text-red-500">{breadcrumb.join(' - ')}</h1>
</header>
