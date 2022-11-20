<script>
  import AuthGuard from './components/AuthGuard.svelte';
  import Footer from './components/Footer.svelte';
  import Reviews from './components/Reviews.svelte';
</script>

<AuthGuard>
  <Reviews />
  <Footer />
</AuthGuard>
