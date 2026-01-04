<script lang="ts">
    import SongsProvider from "$lib/data/SongsProvider.svelte";
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div>
    {SongsProvider.getSongs().length} songs available.
    {#each SongsProvider.getSongs() as song}
        <a href="/song/{song.title}">
            <div>
                {song.title}
            </div>
        </a>
    {/each}
</div>