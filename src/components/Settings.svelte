<script lang="ts">
  import { onMount } from 'svelte';
  import { getVersion, getName } from '@tauri-apps/api/app';
  import { auth, defaultSettings } from '../lib/auth';
  import Toggle from './Toggle.svelte';
  import Range from './Range.svelte';
  import Theme from './Theme.svelte';
  import { isEnabled } from '../lib/auto-start';

  export let modalVisible: boolean;
  let openAtStartup = $auth.settings?.openAtStartup;
  let isCompactMode = $auth.settings?.isCompactMode;
  let fetchInterval = ($auth.settings.fetchInterval || defaultSettings.fetchInterval) / 1000;
  let app = { name: '', version: '' };

  const changeAutoStart = e => {
    openAtStartup = e.target.checked;
  };

  const changeCompactMode = e => {
    isCompactMode = e.target.checked;
  };

  const onSave = () => {
    $auth.updateSettings({
      openAtStartup,
      isCompactMode,
      fetchInterval: fetchInterval * 1000,
    });
    modalVisible = false;
  };
  onMount(() => {
    Promise.all([getName(), getVersion()]).then(values => {
      const [name, version] = values;
      app = { name, version };
    });
    isEnabled().then(active => {
      openAtStartup = active;
    });
  });
</script>

<div class="flex justify-between items-start p-4 rounded-t border-b dark:border-slate-900">
  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Settings</h3>
  <button
    type="button"
    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
    on:click={() => (modalVisible = false)}
  >
    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
  <Theme />
  <br />
  <Toggle name="open_at_start" checked={openAtStartup} label="Auto start Gitbar" on:change={changeAutoStart} />
  <Toggle name="comact_mode" checked={isCompactMode} label="Compact mode" on:change={changeCompactMode} />
  <div>
    <label for="fetch_interval" class="block text-sm font-bold text-gray-700 dark:text-gray-100 mb-4">
      Fetch interval <strong>{fetchInterval} sec</strong>
    </label>
    <Range
      on:change={e => (fetchInterval = e.detail.value)}
      initialValue={fetchInterval}
      min={5}
      max={60}
      id="fetch_interval"
    />
    <div class="relative mt-4 flex items-end justify-end">
      <button
        type="button"
        on:click={onSave}
        class="text-white font-bold bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-md text-sm px-4 py-2 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >Save</button
      >
    </div>
  </div>
  <span class="text-sm font-bold italic float-right pb-2">
    {app.name}@{app.version}
  </span>
</div>
