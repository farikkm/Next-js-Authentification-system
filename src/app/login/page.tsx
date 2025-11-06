"use client";

import axios from "axios";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeroUIProvider, Spinner } from "@heroui/react";
import { AuthButton, AuthInput, AuthPasswordInput } from "@/components";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

  useEffect(() => {
    if (user.email && user.password) {
      setSubmitBtnDisabled(false);
    } else {
      setSubmitBtnDisabled(true);
    }
  }, [user]);

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!user.email && !user.password) {
      toast.error("All inputs are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("api/users/login", user);
      toast.success(res.data.message);

      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error: any) {
      toast.error(error.response.data.message ? error.response.data.message : "This didn't work.");
      console.log("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeroUIProvider>
      <div className="mx-auto flex min-h-screen max-w-xs flex-col items-center justify-center">
        <h2 className="mb-6 text-2xl">Login</h2>

        <form className="w-full" onSubmit={onLogin}>
          <AuthInput
            type="email"
            id="email"
            autoComplete="email"
            value={user.email}
            onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
            label="Email"
          />

          <AuthPasswordInput
            id="password"
            value={user.password}
            onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
            onEyeClick={() => setShowPassword((prev) => !prev)}
            label="Password"
            showPassword={showPassword}
          />

          <AuthButton
            disabled={submitBtnDisabled || loading}
            label={loading ? <Spinner className="h-1" color="white" variant="wave" /> : "Submit"}
          />

          <p className="mt-5 text-center text-sm dark:text-gray-200">
            <span>Don't have an account?</span>
            <br />
            <Link className="underline" href={"/signup"}>
              Go to SignUp Page
            </Link>
          </p>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </HeroUIProvider>
  );
};

export default Page;
