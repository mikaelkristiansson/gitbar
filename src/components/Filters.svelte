<script lang="ts">
  import Toggle from './Toggle.svelte';
  import { auth } from '../lib/auth';
  import Select from './Select.svelte';
  import Button from './Button.svelte';
  import { onMount } from 'svelte';
  import { getOrganizations } from '../lib/api';

  export let modalVisible: boolean;
  export let onSaved: () => void;
  let showArchive = $auth.githubSettings.archive;
  let state = $auth.githubSettings.state;
  let type = $auth.githubSettings.type;
  let selectedOrganizations = $auth.githubSettings.organizations || [];
  let organizations: string[] = [];

  const changeShowArchive = e => {
    showArchive = e.target.checked;
  };

  const onSave = () => {
    $auth.updateGithubSettings({
      archive: showArchive,
      state,
      type,
      organizations: selectedOrganizations,
    });
    modalVisible = false;
    onSaved();
  };

  const updateSelectedOrganizations = e => {
    const value = e.target.value;
    if (selectedOrganizations.includes(value)) {
      selectedOrganizations = selectedOrganizations.filter(org => org !== e.target.value);
    } else {
      selectedOrganizations = [...selectedOrganizations, e.target.value];
    }
  };

  onMount(() => {
    if (!$auth.account) return;
    getOrganizations($auth.account).then(orgs => {
      organizations = orgs;
    });
  });
</script>

<div class="flex justify-between items-start px-4 py-2 rounded-t border-b dark:border-slate-900">
  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
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
    <div class="flex items-center justify-between gap-2">
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
    <Select
      name="organizations"
      label="Organizations"
      options={organizations.map(org => ({ value: org, label: org }))}
      selected={selectedOrganizations}
      onChange={updateSelectedOrganizations}
      multiple
    />
  </div>
  <div class="relative mt-4 flex items-end justify-end">
    <Button type="button" on:click={onSave}>Save</Button>
  </div>
</div>
