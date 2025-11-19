"use client";

import { UserDataType } from "@/shared";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserDataType | null>(null);

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

  const getUserData = async () => {
    try {
      setLoading(true);

      const res = await axios.get("api/users/user");
      setUserData(res.data.data);
    } catch (error: any) {
      toast.error(error.response.data.message ? error.response.data.message : "This didn't work.");
      console.log("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    console.log(userData);
  }, [userData]);

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
        {userData && (
          <button
            onClick={() => router.push(`/profile/${userData._id}`)}
            className="mt-3 cursor-pointer rounded-2xl bg-blue-400 px-4 py-2 hover:bg-blue-500 disabled:opacity-70"
          >
            Go to Profile Page
          </button>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Page;
