<script lang="ts">
    import LoaderCircle from 'lucide-svelte/icons/loader-circle';
    import {
        Select,
        SelectTrigger,
        SelectContent,
        SelectGroup,
        SelectValue,
        SelectItem,
    } from '$lib/components/ui/select';
    import { Label } from '$lib/components/ui/label';
    import { Input } from '$lib/components/ui/input';
    import { Button } from '$lib/components/ui/button';
    import { open } from '@tauri-apps/api/shell';
    import { Validators, type ValidatorFn, type ValidatorResult } from '../lib/validators';
    import { auth } from '../lib/auth';

    let defaultHost = '';
    let accessTokenURL = '';

    const gitProviders = [
        { value: 'github', label: 'GitHub' },
        { value: 'gitlab', label: 'GitLab' },
        { value: 'bitbucket', label: 'Bitbucket' },
    ];

    function onSelectedChange(e) {
        if (e.value === 'github') {
            defaultHost = 'github.com';
            accessTokenURL = 'https://github.com/settings/tokens';
        } else if (e.value === 'gitlab') {
            defaultHost = 'gitlab.com';
            accessTokenURL = 'https://gitlab.com/-/user_settings/personal_access_tokens';
        } else if (e.value === 'bitbucket') {
            defaultHost = 'bitbucket.org';
        }
        return e;
    }

    let errors: { [inputName: string]: ValidatorResult } = {};
    let loading = false;

    let form: {
        [inputName: string]: {
            validators: ValidatorFn[];
        };
    } = {
        token: {
            validators: [Validators.required],
        },
        hostname: {
            validators: [Validators.required],
        },
    };

    function isFormValid(): boolean {
        return !Object.values(errors).some(field => Object.values(field).some(errorObject => errorObject.error));
    }

    function validateForm(data: { [inputName: string]: any }): void {
        Object.keys(data).forEach(field => validateField(field, data[field]));
    }

    function validateField(field, value) {
        form[field]?.validators &&
            form[field].validators.forEach(fn => {
                const error = fn(value);
                errors[field] = { ...errors[field], ...error };
            });
    }

    function onBlur(e) {
        validateField(e.target.name, e.target.value);
    }

    function onSubmit(e) {
        const formData = new FormData(e.target);

        const data: any = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        validateForm(data);

        if (isFormValid()) {
            loading = true;
            $auth.signIn(data).finally(() => (loading = false));
        } else {
            console.log('Invalid Form');
        }
    }
</script>

<div class="m-8">
    <form on:submit|preventDefault={onSubmit}>
        <Label for="gitProvider">Git provider</Label>
        <Select portal={null} {onSelectedChange}>
            <SelectTrigger>
                <SelectValue id="gitProvider" placeholder="Select a provider" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {#each gitProviders as provider}
                        <SelectItem value={provider.value}>{provider.label}</SelectItem>
                    {/each}
                </SelectGroup>
            </SelectContent>
        </Select>

        <Label for="token">Token</Label>
        <Input type="text" name="token" id="token" placeholder="Git token" on:blur={onBlur} />
        {#if errors?.token?.required?.error}
            <p class="text-sm text-red-400 dark:text-red-300">Token is required</p>
        {/if}
        <span class="text-sm">
            To generate a token, go to GitHub,
            <Button class="p-0 underline" variant="link" on:click={() => open(accessTokenURL)}>
                personal access tokens
            </Button>
        </span>
        <Label for="hostname">Hostname</Label>
        <Input
            type="text"
            name="hostname"
            id="hostname"
            placeholder="github.company.com"
            on:blur={onBlur}
            value={defaultHost}
        />
        {#if errors?.hostname?.required?.error}
            <p class="text-sm text-red-400 dark:text-red-300">Hostname is required</p>
        {/if}

        <div class="flex justify-end my-4">
            <Button type="submit" disabled={loading}>
                {#if loading}
                    <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                {/if}
                <span>Add account</span>
            </Button>
        </div>
    </form>
</div>
