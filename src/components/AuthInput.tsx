import { ChangeEvent } from "react";

interface IAuthInput {
  type: "text" | "password" | "email";
  id: string;
  autoComplete?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string
}

const AuthInput = ({ type, id, autoComplete = "off", value, onChange, label }: IAuthInput) => {
  return (
    <div className="group relative z-0 mb-5 w-full">
      <input
        type={type}
        name={id}
        id={id}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
      />
      <label
        className="absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default AuthInput;
