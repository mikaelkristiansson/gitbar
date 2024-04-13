<script>
    import { ModeWatcher } from 'mode-watcher';
    import AuthGuard from './components/AuthGuard.svelte';
    import Footer from './components/Footer.svelte';
    import Reviews from './components/Reviews.svelte';
</script>

<ModeWatcher />
<AuthGuard>
    <Reviews />
    <Footer />
</AuthGuard>
