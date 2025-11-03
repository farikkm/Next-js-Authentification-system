import clsx from "clsx";
import { ReactNode } from "react";

interface IAuthButton {
  disabled: boolean;
  type?: "button" | "submit" | "reset";
  label?: string | ReactNode;
}

const AuthButton = ({ disabled, type = "submit", label = "Submit" }: IAuthButton) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={clsx(
        "mx-auto block w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white disabled:opacity-80 sm:w-fit dark:bg-blue-600",
        {
          "hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:bg-blue-700 dark:focus:ring-blue-800":
            !disabled,
        }
      )}
    >
      {label}
    </button>
  );
};

export default AuthButton;
