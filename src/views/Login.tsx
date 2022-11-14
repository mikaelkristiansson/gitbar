import { defaultHost, useAuthentication } from '../hooks/auth';
import { isRequired, useForm, Validations } from '../hooks/use-form';

type Inputs = {
  token: string;
  hostname: string;
};

export default function Login() {
  const { validateToken } = useAuthentication();
  const initialState = { token: '', hostname: defaultHost };
  const validations: Validations = [
    ({ token }) => /^[A-Z0-9_]{40}$/i.test(token) || { token: 'Invalid token' },
    ({ token }) => isRequired(token) || { token: 'Required' },
    ({ hostname }) =>
      /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/i.test(
        hostname
      ) || { hostname: 'Invalid hostname' },
  ];

  const onSubmit = (data: Inputs) => {
    validateToken?.(data);
  };

  const { values, errors, touched, changeHandler, blurHandler, submitHandler } =
    useForm<Inputs>({
      initialState,
      validations,
      onSubmit,
    });

  return (
    <div className="m-8">
      <form onSubmit={submitHandler}>
        <div className="pb-2">
          <label
            htmlFor="token"
            className="block text-sm font-bold text-gray-700 dark:text-gray-100"
          >
            Token
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="token"
              id="token"
              className="block w-full rounded-md text-gray-900 border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
              value={values.token}
              onChange={(e) => changeHandler('token', e.target.value)}
              onBlur={(e) => blurHandler('token', e.target.value)}
              placeholder="The 40 characters token generated on GitHub"
            />
          </div>
          {touched.token && errors.token ? (
            <p className="text-red-500 dark:text-red-300">{errors.token}</p>
          ) : null}
          <span className="text-sm">
            To generate a token, go to GitHub,{' '}
            <a
              className="underline hover:text-gray-500 dark:hover:text-gray-300 cursor-pointer"
              href="https://github.com/settings/tokens"
            >
              personal access tokens
            </a>
          </span>
        </div>
        <div className="pb-2">
          <label
            htmlFor="hostname"
            className="block text-sm font-bold text-gray-700 dark:text-gray-100"
          >
            Hostname
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="hostname"
              placeholder="github.company.com"
              id="hostname"
              value={values.hostname}
              onChange={(e) => changeHandler('hostname', e.target.value)}
              onBlur={(e) => blurHandler('hostname', e.target.value)}
              className="block w-full rounded-md text-gray-900 border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {touched.hostname && errors.hostname ? (
            <p className="text-red-500 dark:text-red-300">{errors.hostname}</p>
          ) : null}
          <span className="text-sm">
            Defaults to {defaultHost}. Change only if you are using GitHub for
            Enterprise.
          </span>
        </div>
        <button
          className="w-full px-4 py-2 my-4 bg-gray-300 font-semibold rounded text-sm text-center hover:bg-gray-500 hover:text-white dark:text-black focus:outline-none"
          type="submit"
          title="Submit Button"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
