import type { InputHTMLAttributes } from 'react';

interface ToggleProps extends InputHTMLAttributes<any> {
  label?: string;
}

export function Toggle({ checked, label, name, ...rest }: ToggleProps) {
  return (
    <label
      htmlFor={name}
      className={`relative inline-flex cursor-pointer items-center ${
        rest.disabled && 'opacity-60'
      }`}
    >
      <input
        type="checkbox"
        id={name}
        className="peer sr-only"
        checked={checked}
        {...rest}
      />
      <div className="peer relative h-6 w-10 rounded-full border border-slate-900/5 bg-slate-900/10 p-1 transition duration-200 ease-in-out after:absolute after:top-[3px] after:left-[3px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-indigo-800" />
      {label ? (
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      ) : null}
    </label>
  );
}
