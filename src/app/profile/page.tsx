"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);

      const res = await axios.get("api/users/logout");
      toast.success(res.data.message);

      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message ? error.response.data.message : "This didn't work.");
      console.log("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        Profile Page
        <button
          onClick={logout}
          disabled={loading}
          className="mt-3 cursor-pointer rounded-2xl bg-red-400 px-4 py-2 hover:bg-red-500 disabled:opacity-70"
        >
          Logout
        </button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Page;
