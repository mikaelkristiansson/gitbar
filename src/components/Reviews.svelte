<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { open } from '@tauri-apps/api/shell';
  import { timeAgo } from '../lib/formatters';
  import { github } from '../lib/github';
  import { auth, defaultSettings } from '../lib/auth';

  let loading = true;

  function onClick(url: string) {
    open(url);
  }
  const interval = setInterval(() => {
    $github.fetchReviews($auth.account);
  }, $auth.settings.fetchInterval || defaultSettings.fetchInterval);

  onMount(() => {
    $github.fetchReviews($auth.account).finally(() => (loading = false));
  });

  onDestroy(() => clearInterval(interval));
</script>

{#if loading}
  <div class="m-2 p-2 max-w w-full mx-auto">
    <div class="animate-pulse flex space-x-4">
      <div class="rounded-full bg-slate-200 h-6 w-6" />
      <div class="flex-1 space-y-6 py-1">
        <div class="h-2 bg-slate-200 rounded" />
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-slate-200 rounded col-span-2" />
            <div class="h-2 bg-slate-200 rounded col-span-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="m-2 p-2 max-w w-full mx-auto">
    <div class="animate-pulse flex space-x-4">
      <div class="rounded-full bg-slate-200 h-6 w-6" />
      <div class="flex-1 space-y-6 py-1">
        <div class="h-2 bg-slate-200 rounded" />
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-slate-200 rounded col-span-2" />
            <div class="h-2 bg-slate-200 rounded col-span-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="m-2 p-2 max-w w-full mx-auto">
    <div class="animate-pulse flex space-x-4">
      <div class="rounded-full bg-slate-200 h-6 w-6" />
      <div class="flex-1 space-y-6 py-1">
        <div class="h-2 bg-slate-200 rounded" />
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-slate-200 rounded col-span-2" />
            <div class="h-2 bg-slate-200 rounded col-span-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
{:else if $github.reviews.count === 0}
  <div class="mx-4 my-8">
    <div
      class="p-4 w-full bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-slate-900"
    >
      <span class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8 pr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
          />
        </svg>
        You have no reviews at the moment!
      </span>
    </div>
  </div>
{:else}
  <div class="mb-14">
    <ul class="divide-y divide-gray-200 dark:divide-slate-900">
      {#each $github.reviews.data as review}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
          class="p-2 hover:cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900"
          on:click={() => onClick(review.node.url)}
        >
          <div class="flex">
            <div class="flex-shrink-0 pr-1">
              <span aria-label="Open pull request">
                <svg
                  class="fill-green-500 inline-block overflow-visible align-text-bottom"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  ><path
                    fill-rule="evenodd"
                    d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"
                  /></svg
                >
              </span>
            </div>
            <div class="whitespace-nowrap text-ellipsis overflow-hidden">
              <span
                class="dark:text-white text-gray-900 hover:text-blue-700 dark:hover:text-blue-600 font-bold"
              >
                <span class="text-slate-500 dark:text-gray-300"
                  >{review.node.repository.nameWithOwner}</span
                >
                <span class="">{review.node.title}</span>
              </span>
              <br />
              <span class="text-sm text-gray-500 truncate dark:text-gray-400">
                #{review.node.number} opened
                {timeAgo(review.node.createdAt)} by @{review.node.author.login}
              </span>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
{/if}
