<script>
  import Login from './Login.svelte';
  import { auth } from '../lib/auth';
</script>

{#if $auth.account}
  <slot />
  <!-- wait in case there's a session that we need to verify -->
{:else}
  <!-- user is a guest. Show a login widget instead of the current page. -->
  <Login />
{/if}
