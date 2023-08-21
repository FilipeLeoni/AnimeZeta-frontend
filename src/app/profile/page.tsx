"use client";

import { ProfileCard } from "@/components/Profile/Profile";
import { useApi } from "@/hooks/useApi";
import Cookies from "js-cookie";

import React, { Suspense } from "react";
import { useQuery } from "react-query";

export default function Profile() {
  const api = useApi();

  const { data: user } = useQuery("user", async () => {
    const accessToken: any = Cookies.get("accessToken");
    const res = await api.getUser(accessToken);
    return res;
  });

  return (
    <div className="grid grid-cols-1 h-full w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0 pt-36 pb-20">
      <div className="col-span-12 flex justify-center w-full">
        <ProfileCard data={user?.user} />
      </div>
    </div>
  );
}
