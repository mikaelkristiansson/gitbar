<script>
    import { onMount } from 'svelte';

    onMount(() => {
        // listen for changes so we auto-adjust based on system settings
        const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
        // update page styling
        if (matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
</script>

<div
    class="relative overflow-hidden bg-white text-slate-500 antialiased dark:bg-stone-900 dark:text-slate-400 p-4 rounded-lg"
    style="height: 400px; width: 500px;"
>
    <slot />
</div>
