"use client";

import { ProfileCard } from "@/components/Profile/Profile";
import { useAuth } from "@/context/AuthContext";

import React from "react";

export default function Profile() {
  const auth = useAuth();
  const data = {
    ProfileImg:
      "https://cdn.myanimelist.net//images//characters//14//219161.jpg",
    username: "test",
    email: "test@example.com",
    enterDate: "2021-08-01",
    animesCompleted: 19,
    totalAnimes: 20,
    EpisodesWatched: 100,
  };

  return (
    <div className="grid grid-cols-1 h-full w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0 pt-36 pb-20">
      <div className="col-span-12 flex justify-center w-full">
        <ProfileCard data={data} />
      </div>
    </div>
  );
}
