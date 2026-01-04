<script lang="ts">
    import type { PageProps } from './$types';
    import SongsProvider from "$lib/data/SongsProvider.svelte";
    import type Song from "../../../types/Song";

    let { params }: PageProps = $props();

    let song: Song|undefined = $derived(SongsProvider.getSongByTitle(params.title));
</script>


{#if song}
    <h1>{song.title}</h1>
    <div>
        <h2>Artists:</h2>
        {#each song.artists as artist}
            <p>{artist.role}. {artist.name}</p>
        {/each}
    </div>
    <div>
        {#each song.verses as verse}
            <div class="verse" class:chorus={verse.isChorus}>
                {#each verse.lines as line}
                    <p>{line.text}</p>
                {/each}
            </div>
        {/each}
    </div>
{:else}
    <h1>Song not found</h1>
{/if}

<style>
    .verse {
        line-height: 1.2;
        margin-top: 1.5rem;
    }
    .chorus {
        margin-left: 2rem;
    }
</style>