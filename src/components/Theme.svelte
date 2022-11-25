<script lang="ts">
  import { appearance } from '../lib/theme';
  let dark = $appearance.theme === 'dark';
  appearance.subscribe(({ theme }) => {
    dark = theme === 'dark';
  });
</script>

<!-- animated switch version -->
<button
  class="{dark
    ? 'bg-gray-600 focus:ring-gray-400 ring-offset-gray-700'
    : 'bg-yellow-400 focus:ring-yellow-200 ring-offset-white'} 
    relative inline-flex flex-shrink-0 h-6 w-10 rounded-full border border-slate-900/5 cursor-pointer transition duration-200 ease-in-out focus:outline-none focus:ring-4"
  type="button"
  aria-checked={dark}
  on:click={$appearance.toggle}
>
  <span class="sr-only">Toggle Dark Mode</span>
  <span
    class="{dark
      ? 'translate-x-0 bg-gray-300'
      : 'translate-x-4 bg-white'} pointer-events-none relative inline-block h-4 w-4 top-[3px] left-[3px] rounded-full shadow transform ring-0 transition ease-in-out duration-200"
  >
    <span
      class="{dark
        ? 'opacity-100 ease-in duration-200'
        : 'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
      aria-hidden="true"
    >
      <!-- moon icon -->
      <svg
        class="h-3 w-3 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        />
      </svg>
    </span>
    <span
      class="{dark
        ? 'opacity-0 ease-out duration-100'
        : 'opacity-100 ease-in duration-200'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
      aria-hidden="true"
    >
      <!-- sun icon -->
      <svg
        class="h-3 w-3 text-yellow-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
  </span>
</button>

<span class="ml-3 text-sm font-bold text-gray-900 dark:text-white">
  Appearance
</span>
