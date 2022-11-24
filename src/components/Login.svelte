<script lang="ts">
  const defaultHost = 'github.com';
  import {
    Validators,
    type ValidatorFn,
    type ValidatorResult,
  } from '../lib/validators';
  import { auth } from '../lib/auth';

  let errors: { [inputName: string]: ValidatorResult } = {};

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
      $auth.signIn(data);
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
          class="block w-full rounded-md text-gray-900 border-gray-300 px-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          on:blur={onBlur}
          placeholder="The 40 characters token generated on GitHub"
        />
        {#if errors?.token?.required?.error}
          <p class="text-red-500 dark:text-red-300">Token is required</p>
        {/if}
      </div>
      <span class="text-sm">
        To generate a token, go to GitHub,
        <a
          class="underline hover:text-gray-500 dark:hover:text-gray-300 cursor-pointer"
          href="https://github.com/settings/tokens"
        >
          personal access tokens
        </a>
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
          class="block w-full rounded-md text-gray-900 border-gray-300 px-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {#if errors?.hostname?.required?.error}
          <p class="text-red-500 dark:text-red-300">Password is required</p>
        {/if}
      </div>
      <span class="text-sm">
        Defaults to {defaultHost}. Change only if you are using GitHub for
        Enterprise.
      </span>
    </div>
    <button
      class="w-full text-white font-bold bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-md text-sm px-4 py-2 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      type="submit"
      title="Submit Button"
    >
      Submit
    </button>
  </form>
</div>
