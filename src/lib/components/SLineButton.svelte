<script lang="ts">
	export let text: string;
    export let action: () => void;
</script>

<button on:message on:click={action} class="bold text-lg text-red-400">{text}</button>
