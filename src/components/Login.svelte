<script lang="ts">
  import { open } from '@tauri-apps/api/shell';
  import {
    Validators,
    type ValidatorFn,
    type ValidatorResult,
  } from '../lib/validators';
  import { auth } from '../lib/auth';

  const defaultHost = 'github.com';
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
    return !Object.values(errors).some((field) =>
      Object.values(field).some((errorObject) => errorObject.error)
    );
  }

  function validateForm(data: { [inputName: string]: any }): void {
    Object.keys(data).forEach((field) => validateField(field, data[field]));
  }

  function validateField(field, value) {
    form[field]?.validators &&
      form[field].validators.forEach((fn) => {
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
    <div class="pb-2">
      <label
        for="token"
        class="block text-sm font-bold text-gray-700 dark:text-gray-100"
      >
        Token
      </label>
      <div class="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          name="token"
          id="token"
          class="
          block
          w-full
          rounded-md
          text-gray-900
          border-gray-300
          shadow-sm
          focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
        "
          on:blur={onBlur}
          placeholder="The 40 characters token generated on GitHub"
        />
      </div>
      {#if errors?.token?.required?.error}
        <p class="text-red-400 dark:text-red-300">Token is required</p>
      {/if}
      <span class="text-sm">
        To generate a token, go to GitHub,
        <button
          class="underline hover:text-gray-500 dark:hover:text-gray-300 cursor-pointer"
          on:click={() => open('https://github.com/settings/tokens')}
        >
          personal access tokens
        </button>
      </span>
    </div>
    <div class="pb-2">
      <label
        for="hostname"
        class="block text-sm font-bold text-gray-700 dark:text-gray-100"
      >
        Hostname
      </label>
      <div class="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          name="hostname"
          placeholder="github.company.com"
          id="hostname"
          value={defaultHost}
          on:blur={onBlur}
          class="
          block
          w-full
          rounded-md
          border-gray-300
          text-gray-900
          shadow-sm
          focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
          "
        />
      </div>
      {#if errors?.hostname?.required?.error}
        <p class="text-red-400 dark:text-red-300">Password is required</p>
      {/if}
      <span class="text-sm">
        Defaults to {defaultHost}. Change only if you are using GitHub for
        Enterprise.
      </span>
    </div>
    <button
      class={`${
        loading ? 'opacity-50' : ''
      } flex justify-center items-center w-full text-white font-bold bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-md text-sm px-4 py-2 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
      type="submit"
      title="Submit Button"
      disabled={loading}
    >
      Submit
      {#if loading}
        <svg
          class="animate-spin h-4 w-4 text-white ml-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      {/if}
    </button>
  </form>
</div>
