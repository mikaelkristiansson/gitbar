<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { open } from '@tauri-apps/api/shell';
  import { timeAgo } from '../lib/formatters';
  import { github } from '../lib/github';
  import { auth, defaultSettings } from '../lib/auth';
  import { setWindowSize } from '../lib/window-size';
  import { appearance } from '../lib/theme';

  let loading = true;
  let dateUpdater = 0;

  function onClick(url: string) {
    open(url);
  }
  const interval = setInterval(() => {
    $github.fetchReviews($auth.account, $auth.githubSettings);
    dateUpdater++;
    const ele = document.getElementById('reviews');
    setWindowSize(ele.clientHeight);
  }, $auth.settings.fetchInterval || defaultSettings.fetchInterval);

  const onLoad = (ele: Element) => {
    setTimeout(() => {
      setWindowSize(ele.clientHeight);
    }, 100);
  };

  onMount(() => {
    $github.fetchReviews($auth.account, $auth.githubSettings).finally(() => (loading = false));
  });

  onDestroy(() => clearInterval(interval));
</script>

<div class="overflow-scroll h-full">
  {#if loading}
    <ul class="divide-y divide-gray-200 dark:divide-slate-900">
      <li class="m-2 p-2 max-w w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-slate-200 dark:bg-slate-500 h-6 w-6" />
          <div class="flex-1 space-y-4 py-1">
            <div class="h-2 bg-slate-200 dark:bg-slate-500 rounded" />
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-200 dark:bg-slate-500 rounded col-span-2" />
                <div class="h-2 bg-slate-200 dark:bg-slate-500 rounded col-span-1" />
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="m-2 p-2 max-w w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-slate-200 dark:bg-slate-500 h-6 w-6" />
          <div class="flex-1 space-y-4 py-1">
            <div class="h-2 bg-slate-200 dark:bg-slate-500 rounded" />
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-200 dark:bg-slate-500 rounded col-span-2" />
                <div class="h-2 bg-slate-200 dark:bg-slate-500 rounded col-span-1" />
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="m-2 p-2 max-w w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-slate-200 dark:bg-slate-500 h-6 w-6" />
          <div class="flex-1 space-y-4 py-1">
            <div class="h-2 bg-slate-200 dark:bg-slate-500 rounded" />
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-200 dark:bg-slate-500 rounded col-span-2" />
                <div class="h-2 bg-slate-200 dark:bg-slate-500 rounded col-span-1" />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  {:else if $github.reviews.count === 0}
    <div class="mx-4 my-8">
      <div class="p-4 w-full bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-slate-900">
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
    <ul class="divide-y divide-gray-200 dark:divide-slate-900 mb-14" id="reviews" use:onLoad>
      {#each $github.reviews.data as review}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
          class="group p-2 hover:cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900"
          on:click={() => onClick(review.node.url)}
        >
          <div class="flex items-start">
            <div class="pr-1">
              <span aria-label="Open pull request">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="fill-green-500 inline-block overflow-visible w-5 h-5"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  ><path
                    d="M16 19.25a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0Zm-14.5 0a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0Zm0-14.5a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM4.75 3a1.75 1.75 0 1 0 .001 3.501A1.75 1.75 0 0 0 4.75 3Zm0 14.5a1.75 1.75 0 1 0 .001 3.501A1.75 1.75 0 0 0 4.75 17.5Zm14.5 0a1.75 1.75 0 1 0 .001 3.501 1.75 1.75 0 0 0-.001-3.501Z"
                  ></path><path
                    d="M13.405 1.72a.75.75 0 0 1 0 1.06L12.185 4h4.065A3.75 3.75 0 0 1 20 7.75v8.75a.75.75 0 0 1-1.5 0V7.75a2.25 2.25 0 0 0-2.25-2.25h-4.064l1.22 1.22a.75.75 0 0 1-1.061 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 0ZM4.75 7.25A.75.75 0 0 1 5.5 8v8A.75.75 0 0 1 4 16V8a.75.75 0 0 1 .75-.75Z"
                  ></path></svg
                >
              </span>
            </div>
            <div class="whitespace-nowrap text-ellipsis overflow-hidden w-full">
              <span class="text-slate-500 dark:text-gray-300 text-sm inline-flex items-center justify-between w-full"
                >{review.node.repository.nameWithOwner} #{review.node.number}
                {#if !review.node.isReadByViewer}
                  <div class="w-2 h-2 rounded-full bg-blue-400 inline-flex mr-2" />
                {/if}</span
              >
              <br />
              <span
                class="dark:text-white text-gray-900 group-hover:text-blue-700 dark:group-hover:text-blue-500 transition-colors text-sm font-medium"
              >
                {review.node.title}
              </span>
              <br />
              {#if !$auth.settings?.isCompactMode}
                <div class="flex flex-row items-center gap-1">
                  {#key dateUpdater}
                    <span class="text-sm text-gray-500 truncate dark:text-gray-400">
                      {timeAgo(review.node.createdAt)} by @{review.node.author.login}
                    </span>
                  {/key}
                  <span
                    class="px-2 rounded-full bg-white text-slate-800 dark:text-slate-400 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 inline-flex items-center gap-1 text-xs"
                  >
                    {#if review.node.statusCheckRollup?.state === 'SUCCESS'}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
                        class="fill-green-600 flex overflow-visible w-3 h-3"
                        ><path
                          d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
                        ></path></svg
                      >
                    {:else}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        width="12"
                        height="12"
                        class="fill-red-600 flex overflow-visible w-3 h-3"
                        ><path
                          d="M2.22 2.22a.749.749 0 0 1 1.06 0L6 4.939 8.72 2.22a.749.749 0 1 1 1.06 1.06L7.061 6 9.78 8.72a.749.749 0 1 1-1.06 1.06L6 7.061 3.28 9.78a.749.749 0 1 1-1.06-1.06L4.939 6 2.22 3.28a.749.749 0 0 1 0-1.06Z"
                        ></path></svg
                      >
                    {/if} Checks
                  </span>
                </div>
                <div class="flex flex-row gap-1 mt-1 flex-wrap">
                  {#each review.node.labels.edges as label}
                    {#if $appearance.theme === 'dark'}
                      <span
                        class="px-2 rounded-full text-black text-xs border"
                        style="color: #{label.node.color}; border-color: #{label.node.color}; background-color: #{label
                          .node.color}22;">{label.node.name}</span
                      >
                    {:else}
                      <span class="px-2 rounded-full text-black text-xs" style="background-color: #{label.node.color};"
                        >{label.node.name}</span
                      >
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
