<script lang="ts">
  import { open } from '@tauri-apps/api/shell';
  import { auth } from '../lib/auth';
  import { github } from '../lib/github';
  import Image from './Image.svelte';
  import Modal from './Modal.svelte';
  import Settings from './Settings.svelte';

  let fetching = false;
  let modalVisible = false;

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
</script>

<footer
  class="fixed bottom-0 left-0 dark:bg-gray-900 bg-gray-50 shadow-md w-full px-2 py-2"
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
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        class={`${
          $auth.account?.user?.html_url
            ? 'cursor-pointer hover:text-slate-600/70 dark:hover:text-white/70'
            : ''
        } ml-1 block truncate`}
        on:click={() =>
          $auth.account?.user?.html_url
            ? open($auth.account?.user?.html_url)
            : null}>{$auth.account?.user?.name}</span
      >
    </div>
    <div class="flex justify-between">
      <button
        class="p-2 dark:text-white dark:hover:text-white/70 text-slate-600 hover:text-slate-600/70"
        on:click={startFetch}
        title="Fetch"
      >
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
      <button
        class="p-2 dark:text-white dark:hover:text-white/70 text-slate-600 hover:text-slate-600/70"
        on:click={() => (modalVisible = true)}
        title="Settings"
      >
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
      <button
        class="p-2 dark:text-white dark:hover:text-white/70 text-slate-600 hover:text-slate-600/70"
        on:click={$auth.signOut}
        title="Sign Out"
      >
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
  <Settings bind:modalVisible />
</Modal>

<style>
  @keyframes slide-up {
    0% {
      transform: translateY(110vh);
    }
    100% {
      transform: translateY(0vh);
    }
  }

  footer {
    transform: translateY(110vh);
    animation: slide-up 1s forwards;
  }
</style>
