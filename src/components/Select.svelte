<script lang="ts">
  export let name: string;
  export let options: Array<{ value: string; label: string }>;
  export let selected: string | undefined = undefined;
  export let label: string;
  export let onChange: (e: any) => void;
</script>

<label for={name} class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
<select
  id={name}
  class="block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 select"
  bind:value={selected}
  on:change={onChange}
>
  {#each options as option}
    <option value={option.value} selected={selected === option.value}>{option.label}</option>
  {/each}
</select>

<style>
  .select {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 1 4 4 4-4'/%3E%3C/svg%3E");
    background-position: right 0.75rem center;
    background-repeat: no-repeat;
    background-size: 0.75em 0.75em;
    padding-right: 2.5rem;
  }
</style>
