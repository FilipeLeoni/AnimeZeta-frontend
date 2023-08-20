"use client";

import { useSession } from "next-auth/react";
import React from "react";

export default function Example() {
  // const session = await getServerSession(authOptions);

  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return <p className="pt-20">Not</p>;
  }

  console.log(session, status);

  return (
    <div>
      <div className="pt-20">
        <h2 className="text-4xl text-black">Example</h2>
        <p>{session?.user?.name}</p>
      </div>
    </div>
  );
}
