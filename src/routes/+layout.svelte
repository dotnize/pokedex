<script>
	import "@fontsource/press-start-2p";

	import "../app.css";
</script>

<svelte:head>
	<title>Nate's Pokedex</title>
</svelte:head>

<header class="flex h-32 flex-col items-center justify-center font-title">
	<div class="flex flex-col text-purple-950">
		nate's
		<a href="/" class="rounded bg-purple-950 p-2 text-3xl font-bold text-purple-400"
			>Poke<span class="text-purple-50">dex</span></a
		>
	</div>
</header>

<main>
	<slot />
</main>

<style lang="postcss">
	:global(body) {
		@apply bg-purple-200 font-mono;
	}
</style>
