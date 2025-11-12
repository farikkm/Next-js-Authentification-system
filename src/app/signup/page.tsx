"use client";

import axios from "axios";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthButton, AuthInput, AuthPasswordInput } from "@/components";
import { HeroUIProvider, Spinner } from "@heroui/react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email && user.password && passwordConfirmation && user.username) {
      setSubmitBtnDisabled(false);
    } else {
      setSubmitBtnDisabled(true);
    }
  }, [user]);

  const onSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (!user.email && !user.password && !passwordConfirmation && !user.username) {
      toast.error("All inputs are required");
      return;
    }

    if (user.password !== passwordConfirmation) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("api/users/signup", user);
      toast.success(res.data.message);

      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message ? error.response.data.message : "This didn't work.");
      console.log("Signup failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeroUIProvider>
      <div className="mx-auto flex min-h-screen max-w-xs flex-col items-center justify-center">
        <h2 className="mb-6 text-2xl">Sign Up</h2>

        <form className="w-full" onSubmit={onSignUp}>
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

          <AuthPasswordInput
            id="password-confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            onEyeClick={() => setShowConfirmPassword((prev) => !prev)}
            label="Confirm Password"
            showPassword={showConfirmPassword}
          />

          <AuthInput
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
            label="Username"
          />

          <AuthButton
            disabled={submitBtnDisabled || loading}
            label={loading ? <Spinner className="h-1" color="white" variant="wave" /> : "Submit"}
          />

          <p className="mt-5 text-center text-sm dark:text-gray-200">
            <span>Already have an account?</span>
            <br />
            <Link className="underline" href={"/login"}>
              Go to Login Page
            </Link>
          </p>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </HeroUIProvider>
  );
};

export default Page;
