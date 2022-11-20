<script lang="ts">
  import { onMount } from 'svelte';
  import { getVersion, getName } from '@tauri-apps/api/app';
  import { auth, defaultSettings } from '../lib/auth';
  import { github } from '../lib/github';
  import Image from './Image.svelte';
  import Modal from './Modal.svelte';
  import Toggle from './Toggle.svelte';
  import Range from './Range.svelte';

  let fetching = false;
  let modalVisible = false;
  let openAtStartup = $auth.settings?.openAtStartup;
  let fetchInterval =
    ($auth.settings.fetchInterval || defaultSettings.fetchInterval) / 1000;
  let app = { name: '', version: '' };

  const startFetch = () => {
    fetching = true;
    $github.fetchReviews($auth.account).finally(() => {
      fetching = false;
    });
  };

  function keydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && e.target) {
      modalVisible = false;
      e.preventDefault();
    }
  }

  const changeAutoStart = (e) => {
    openAtStartup = e.target.checked;
  };

  const onSave = () => {
    $auth.updateSettings({
      openAtStartup,
      fetchInterval: fetchInterval * 1000,
    });
    modalVisible = false;
  };
  onMount(() => {
    Promise.all([getName(), getVersion()]).then((values) => {
      const [name, version] = values;
      app = { name, version };
    });
  });
</script>

<footer
  class="fixed bottom-0 left-0 border-t dark:bg-gray-800 bg-white border-gray-200 shadow-md dark:border-gray-700 w-full px-2 py-2"
>
  <div class="flex justify-between">
    <div class="p-2 flex items-center">
      <Image
        src={$auth.account?.user?.avatar_url}
        class="h-6 w-6 flex-shrink-0 rounded-full"
      >
        <svg
          slot="error"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6 flex-shrink-0 rounded-full"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </Image>
      <span class="ml-1 block truncate">{$auth.account?.user?.name}</span>
    </div>
    <div class="flex justify-between">
      <button class="p-2" on:click={startFetch}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class={`h-6 w-6 ${fetching ? 'animate-spin' : ''}`}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
      <button class="p-2" on:click={() => (modalVisible = true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
          />
        </svg>
      </button>
      <button class="p-2" on:click={$auth.signOut}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
          />
        </svg>
      </button>
    </div>
  </div>
</footer>

<Modal bind:modalVisible on:keydown={keydown}>
  <div
    class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
  >
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
      Settings
    </h3>
    <button
      type="button"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      on:click={() => (modalVisible = false)}
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="sr-only">Close modal</span>
    </button>
  </div>
  <div class="p-6 space-y-6">
    <Toggle
      name="open_at_start"
      checked={openAtStartup}
      label="Auto start Gitbar"
      on:change={changeAutoStart}
    />
    <div>
      <label
        for="fetch_interval"
        class="block text-sm font-bold text-gray-700 dark:text-gray-100"
      >
        Fetch interval <strong>{fetchInterval} sec</strong>
      </label>
      <div class="relative mt-2">
        <Range
          on:change={(e) => (fetchInterval = e.detail.value)}
          initialValue={fetchInterval}
          id="fetch_interval"
        />
      </div>
      <div class="relative mt-4 flex items-end justify-end">
        <button
          type="button"
          on:click={onSave}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >Save</button
        >
      </div>
    </div>
    <span class="text-sm font-bold italic float-right pb-2">
      {app.name}@{app.version}
    </span>
  </div>
</Modal>
