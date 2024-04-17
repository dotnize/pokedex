<script>
	import "@fontsource/press-start-2p";

	import "../app.css";
</script>

<svelte:head>
	<title>Nate's Pokedex</title>
</svelte:head>

<header class="flex h-32 items-center justify-center">
	<a href="/" class="font-title text-3xl font-bold">Pokedex</a>
</header>

<main>
	<slot />
</main>
