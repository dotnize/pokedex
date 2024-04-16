<script>
	import "../app.css";
</script>

<svelte:head>
	<title>Nate's Pokedex</title>
</svelte:head>

<header class="flex h-32 flex-col items-center justify-center gap-4">
	<a href="/" class="text-2xl font-bold">Pokedex</a>
	<span>work in progress, will also explore other ui styles and add icons(?)</span>
</header>

<main>
	<slot />
</main>
