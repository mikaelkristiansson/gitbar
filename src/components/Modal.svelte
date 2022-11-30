<script lang="ts">
  export let modalVisible = false;
  let modalBg: HTMLDivElement;
  let lastFocus: Element | null;
  $: if (modalVisible) {
    lastFocus = document.activeElement;
  } else if (lastFocus instanceof HTMLElement) {
    lastFocus.focus();
  }
  $: if (modalVisible && modalBg) {
    modalBg.focus();
  }
  function close() {
    modalVisible = false;
  }
</script>

{#if modalVisible}
  <div
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center p-5 bg-black/50 z-50"
    on:click|self={close}
    tabindex="-1"
    on:keydown
    bind:this={modalBg}
  >
    <div class="bg-white rounded-lg shadow dark:bg-gray-900 w-10/12">
      <slot {close} />
    </div>
  </div>
{/if}
