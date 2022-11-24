<script>
  import Login from './Login.svelte';
  import { auth } from '../lib/auth';
</script>

{#if $auth.account}
  <slot />
{:else}
  <!-- user is a guest. Show a login widget instead of the current page. -->
  <Login />
{/if}
