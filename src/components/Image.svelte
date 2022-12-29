<script lang="ts">
    import { onMount } from 'svelte';
    export let src = undefined;
    console.log(src);
    export let alt = '';

    let img = null;
    let mounted = false;
    let loading = true;
    let error = false;

    onMount(() => {
        mounted = true;
    });

    function load() {
        loading = true;
        error = false;

        img.src = src;

        img.onload = () => {
            loading = false;
        };

        img.onerror = () => {
            error = true;
        };
    }

    $: if (img && src !== undefined) load();
</script>

{#if error || src === undefined}
    <slot name="error" />
{:else}
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <img
        {...$$restProps}
        bind:this={img}
        class:loading={loading && mounted}
        class:hide={error}
        on:click
        on:mouseover
        on:mouseenter
        on:mouseout
        {src}
        {alt}
    />
{/if}

<style>
    img.loading {
        opacity: 0;
    }

    img:not(.loading) {
        opacity: 1;
        transition: opacity 250ms ease-out;
    }

    .hide {
        display: none;
    }
</style>
