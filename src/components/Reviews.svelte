<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { open } from '@tauri-apps/api/shell';
  import { dateToString } from '../lib/formatters';
  import { github } from '../lib/github';
  import { auth, defaultSettings } from '../lib/auth';
  function onClick(url: string) {
    open(url);
  }
  const interval = setInterval(() => {
    $github.fetchReviews($auth.account);
  }, $auth.settings.fetchInterval || defaultSettings.fetchInterval);

  onMount(() => {
    $github.fetchReviews($auth.account);
  });

  onDestroy(() => clearInterval(interval));
</script>

<ul class="divide-y divide-gray-200 dark:divide-gray-700">
  {#each $github.reviews.data as review}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li
      class="p-2 hover:cursor-pointer hover:bg-gray-100 hover:dark:bg-slate-800 whitespace-nowrap text-ellipsis overflow-hidden"
      on:click={() => onClick(review.node.url)}
    >
      <span class="dark:text-white text-gray-900">
        {review.node.repository.nameWithOwner} - {review.node.title}
      </span>
      <br />
      <span class="text-sm text-gray-500 truncate dark:text-gray-400">
        #{review.node.number} opened on{' '}
        {dateToString(review.node.createdAt, 'YYYY-MM-DD h:m')} by @
        {review.node.author.login}
      </span>
    </li>
  {/each}
</ul>
