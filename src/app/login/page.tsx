"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSignUp = async () => {};

  return (
    <div className="mx-auto flex min-h-screen max-w-xs flex-col items-center justify-center">
      <h2 className="mb-6 border-b border-b-white text-2xl">Login</h2>

      <form className="w-full" onSubmit={onSignUp}>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            value={user.email}
            onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
            placeholder=" "
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
          />
          <label
            className="absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
            htmlFor="email"
          >
            Email
          </label>
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            autoComplete="new-password"
            value={user.password}
            onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
            placeholder=" "
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
          />
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            type="button"
            className="absolute inset-y-0 end-0 z-20 flex cursor-pointer items-center rounded-e-md px-3 text-gray-400 focus:text-blue-600 focus:outline-hidden dark:text-neutral-600 dark:focus:text-blue-500"
          >
            <svg
              className="size-3.5 shrink-0"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className={`${showPassword ? "hidden" : "block"}`}
                d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
              ></path>
              <path
                className={`${showPassword ? "hidden" : "block"}`}
                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
              ></path>
              <path
                className={`${showPassword ? "hidden" : "block"}`}
                d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
              ></path>
              <line
                className={`${showPassword ? "hidden" : "block"}`}
                x1="2"
                x2="22"
                y1="2"
                y2="22"
              ></line>
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <label
            className="absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
            htmlFor="email"
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          className="mx-auto block w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none sm:w-fit dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>

        <p className="mt-5 text-center text-sm dark:text-gray-200">
          <span>Don't have an account?</span>
          <br />
          <Link className="underline" href={"/signup"}>
            Go to SignUp Page
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Page;
