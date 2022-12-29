<script lang="ts">
    import { fade } from 'svelte/transition';
    export let items = [];
    export let activeTabValue = 1;

    const handleClick = (tabValue: number) => () => (activeTabValue = tabValue);
</script>

<ul class="flex flex-wrap pl-0 mb-0 justify-center">
    {#each items as item}
        <li class="mr-2">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <button
                class={`${
                    activeTabValue === item.value ? 'border-b-2 border-gray-100 text-gray-100' : ''
                } font-bold text-blue-400 mx-4 px-1 py-1`}
                on:click={handleClick(item.value)}>{item.label}</button
            >
        </li>
    {/each}
</ul>
{#each items as item}
    {#if activeTabValue == item.value}
        <div in:fade>
            <svelte:component this={item.component} />
        </div>
    {/if}
{/each}
