"use client";

import { use } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return <div className="flex h-screen flex-col items-center justify-center">User ID: {id}</div>;
};

export default Page;
