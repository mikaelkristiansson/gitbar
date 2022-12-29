<script>
    import Github from './LoginGithub.svelte';
    import Azure from './LoginAzure.svelte';
    import Tabs from './Tabs.svelte';

    // List of tab items with labels, values and assigned components
    let items = [
        { label: 'Github', value: 1, component: Github },
        { label: 'Azure', value: 2, component: Azure },
    ];
</script>

<div class="m-8">
    <Tabs {items} />
</div>
