/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputPros {
  label?: string;
  id?: any;
  name: string;
  placeholder?: string;
  type: string;
  onChange?: any;
  validations?: any;
  disabled?: boolean;
  labelStyles?: string;
  error?: any;
  defaultValue?: any;
  required?: any;
}

export default function Input({
  label,
  id,
  name,
  placeholder,
  type,
  onChange,
  validations,
  disabled,
  labelStyles,
  error,
  defaultValue,
  required,
  ...props
}: InputPros) {
  return (
    <div className="w-full">
      <label
        className={`block text-sm font-medium leading-6 text-gray-900  ${labelStyles}`}
        htmlFor="email"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          className={[
            '"block px-2 w-full border border-gray-400 rounded-[10px] py-1.5 text-gray-900 shadow-sm ring-0 ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 "',
            error
              ? 'focus:ring-2  focus:ring-red-500 border border-red-500'
              : 'focus:ring-2 focus:ring-inset focus:ring-blue-500 ',
          ]}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          type={type}
          {...props}
          {...validations}
        />
      </div>
      <p className="text-red-500 max-w-[446px]">{error && error}</p>
    </div>
  );
}
