import { useCallback, useState } from 'react';

declare const $NestedValue: unique symbol;

/**
 * @deprecated to be removed in the next major version
 */
export type NestedValue<TValue extends object = object> = {
  [$NestedValue]: never;
} & TValue;

type IsAny<T> = 0 extends 1 & T ? true : false;
type NonUndefined<T> = T extends undefined ? never : T;
type BrowserNativeObject = Date | FileList | File;

type DeepMap<T, TValue> = IsAny<T> extends true
  ? any
  : T extends BrowserNativeObject | NestedValue
  ? TValue
  : T extends object
  ? { [K in keyof T]: DeepMap<NonUndefined<T[K]>, TValue> }
  : TValue;

type DeepPartial<T> = T extends BrowserNativeObject | NestedValue
  ? T
  : { [K in keyof T]?: DeepPartial<T[K]> };

type FieldValues = Record<string, any>;

type InitialValues<TFieldValues> = TFieldValues;

type UseFormValues<TFieldValues extends FieldValues> = TFieldValues;
type FieldErrors<TFieldValues extends FieldValues> = TFieldValues;

type FieldNamesMarkedBoolean<TFieldValues extends FieldValues> = DeepMap<
  DeepPartial<TFieldValues>,
  boolean
>;

type UseFormProps<TFieldValues extends FieldValues = FieldValues> = {
  validations?: Validations;
  initialState: InitialValues<TFieldValues>;
  validateOnChange?: Boolean;
  onSubmit: (args: TFieldValues) => void;
};

export type UseFormReturn<TFieldValues extends FieldValues = FieldValues> = {
  values: UseFormValues<TFieldValues>;
  changeHandler: (
    name: keyof TFieldValues,
    value: string | number | boolean
  ) => void;
  blurHandler: (
    name: keyof TFieldValues,
    value?: string | number | boolean
  ) => void;
  isValid: boolean;
  errors: FieldErrors<TFieldValues>;
  touched: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>;
  submitHandler: (event: React.FormEvent) => void;
};

export type Validations = Array<
  (args: any) => boolean | { [key: string]: string }
>;

function validate(validations: Array<any>, values: { [key: string]: any }) {
  const errors = validations
    .map((validation) => validation(values))
    .filter((validation) => typeof validation === 'object');
  return {
    isValid: errors.length === 0,
    errors: errors.reduce((errors, error) => ({ ...errors, ...error }), {}),
  };
}

export function useForm<TFieldValues extends FieldValues = FieldValues>(
  props: UseFormProps<TFieldValues>
): UseFormReturn<TFieldValues> {
  const { initialState, validations = [], onSubmit = () => {} } = props;
  const { isValid: initialIsValid, errors: initialErrors } = validate(
    validations,
    initialState
  );
  const [values, setValues] = useState<TFieldValues>(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setValid] = useState(initialIsValid);
  const [touched, setTouched] = useState({});

  const changeHandler = (
    name: keyof TFieldValues,
    value: string | number | boolean
  ) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    if (props.validateOnChange) {
      const { isValid, errors } = validate(validations, newValues);
      setValid(isValid);
      setErrors(errors);
      setTouched({ ...touched, [name]: true });
    }
  };

  const blurHandler = (
    name: keyof TFieldValues,
    value?: string | number | boolean
  ) => {
    const newValues = { ...values, [name]: value };
    if (newValues[name] === '') {
      return;
    }
    const { isValid, errors } = validate(validations, newValues);
    setValid(isValid);
    setErrors(errors);
    setTouched({ ...touched, [name]: true });
  };

  const submitHandler = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      onSubmit(values);
    },
    [values, onSubmit]
  );
  return {
    values,
    changeHandler,
    blurHandler,
    isValid,
    errors,
    touched,
    submitHandler,
  };
}

export function isRequired(value: string | number) {
  return (
    value !== undefined &&
    value !== null &&
    value !== '' &&
    typeof value === 'string' &&
    value.trim().length !== 0
  );
}
