"use client";

import { use } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return <div>User Profile Page: {id}</div>;
};

export default Page;
