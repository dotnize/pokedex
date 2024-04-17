<script lang="ts">
	import { ArrowBigUp } from "lucide-svelte";
	import { fade } from "svelte/transition";

	let visible = false;

	function onScroll() {
		visible = window.scrollY > 300;
	}
</script>

<svelte:window on:scroll={onScroll} />

{#if visible}
	<button
		on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		transition:fade={{ duration: 200 }}
		title="Scroll to top"
		aria-label="Scroll to top"
		class="fixed bottom-8 right-2 z-50 flex h-12 w-12 items-center justify-center rounded border-b-4 border-r-4 border-purple-500 bg-purple-700 text-purple-50 transition hover:bg-purple-600 md:right-10 lg:right-36 xl:right-48"
	>
		<ArrowBigUp />
	</button>
{/if}
