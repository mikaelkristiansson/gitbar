<script lang="ts">
  import { join } from '@tauri-apps/api/path';

  export let name: string;
  export let placeholder: string = 'Select an option';
  export let options: Array<{ value: string; label: string }>;
  export let selected: string | undefined | string[] = undefined;
  export let label: string;
  export let onChange: (e: any) => void;
  export let multiple: boolean = false;

  let showOptions = false;

  const toggle = () => {
    showOptions = !showOptions;
  };
</script>

<div class="flex flex-col mb-2 relative">
  <button
    id="dropdownDefaultButton"
    data-dropdown-toggle="dropdown"
    on:click={toggle}
    class="text-gray-900 border border-gray-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center inline-flex items-center justify-between bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    type="button"
    >{Array.isArray(selected)
      ? selected.length > 0
        ? selected.join(', ')
        : placeholder
      : options.find(o => o.value === selected).label || placeholder}
    <svg
      class="w-2.5 h-2.5 ml-1 ms-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
    </svg>
  </button>

  <!-- Dropdown menu -->
  <div
    id="dropdown"
    class={`absolute top-9 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${!showOptions && 'hidden'}`}
  >
    <ul class="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      {#each options as option}
        <li
          class={`block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white first:rounded-t-lg last:rounded-b-lg ${
            selected === option.value || (Array.isArray(selected) && selected.includes(option.value))
              ? 'font-semibold dark:text-white'
              : ''
          }`}
        >
          <button
            type="button"
            on:click={() => {
              onChange({ target: { value: option.value } });
              showOptions = false;
            }}
            class="flex flex-row justify-between items-center w-full"
          >
            {option.label}
            {#if selected === option.value || (Array.isArray(selected) && selected.includes(option.value))}
              <svg
                class="dark:fill-white w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                ><path
                  d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
                ></path></svg
              >
            {/if}
          </button>
        </li>
      {/each}
      <!-- <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
        </li> -->
    </ul>
  </div>
</div>

<!-- <div class="flex flex-col w-full">
  <label for={name} class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
  <select
    id={name}
    class="block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 select"
    bind:value={selected}
    on:change={onChange}
    {multiple}
  >
    {#each options as option}
      <option
        value={option.value}
        selected={Array.isArray(selected) ? selected.includes(option.value) : selected === option.value}
        >{option.label}</option
      >
    {/each}
  </select>
</div>

<style>
  .select {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 1 4 4 4-4'/%3E%3C/svg%3E");
    background-position: right 0.75rem center;
    background-repeat: no-repeat;
    background-size: 0.75em 0.75em;
    padding-right: 2.5rem;
  }
</style> -->
