<script lang="ts">
  import Toggle from './Toggle.svelte';
  import { auth } from '../lib/auth';
  import Select from './Select.svelte';

  export let modalVisible: boolean;
  export let onSaved: () => void;
  let showArchive = $auth.githubSettings.archive;
  let state = $auth.githubSettings.state;
  let type = $auth.githubSettings.type;

  const changeShowArchive = e => {
    showArchive = e.target.checked;
  };

  const onSave = () => {
    $auth.updateGithubSettings({
      archive: showArchive,
      state,
      type,
    });
    modalVisible = false;
    onSaved();
  };
</script>

<div class="flex justify-between items-start p-4 rounded-t border-b dark:border-slate-900">
  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Filters</h3>
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
  <div>
    <Toggle name="archive" checked={showArchive} label="Show archived" on:change={changeShowArchive} />
    <Select
      name="type"
      label="Type"
      options={[
        { value: 'review-requested', label: 'Reviews' },
        { value: 'author', label: 'Created' },
        { value: 'mentions', label: 'Mentions' },
        { value: 'assignee', label: 'Assigned' },
      ]}
      selected={type}
      onChange={e => (type = e.target.value)}
    />
    <Select
      name="state"
      label="State"
      options={[
        { value: 'open', label: 'Open' },
        { value: 'closed', label: 'Closed' },
        { value: 'all', label: 'All' },
      ]}
      selected={state}
      onChange={e => (state = e.target.value)}
    />
  </div>
  <div class="relative mt-4 flex items-end justify-end">
    <button
      type="button"
      on:click={onSave}
      class="text-white font-bold bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-md text-sm px-4 py-2 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >Save</button
    >
  </div>
</div>
