<script lang="ts">
  export let name: string;
  export let disabled = false;
  export let checked: boolean;
  export let label: string;
</script>

<label
  for={name}
  class={`relative inline-flex dark:text-white cursor-pointer items-center ${
    disabled && 'opacity-60'
  }`}
>
  <input
    type="checkbox"
    id={name}
    class="peer sr-only"
    {checked}
    on:change
    {...$$restProps}
  />
  <div
    class="peer relative h-6 w-10 rounded-full border border-slate-900/5 bg-slate-900/10 p-1 transition duration-200 ease-in-out after:absolute after:top-[3px] after:left-[3px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
  />
  <span class="ml-3 text-sm font-bold text-gray-900 dark:text-white">
    {label}
  </span>
</label>
