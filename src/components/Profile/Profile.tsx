import Image from "next/image";
import React, { useState } from "react";
import { EditProfile } from "./EditProfile";

interface ProfileProps {
  ProfileImg: string;
  username: string;
  email?: string;
  enterDate?: string;
  animesCompleted?: number;
  totalAnimes: number;
  EpisodesWatched: number;
}

interface ProfileCardProps {
  data: ProfileProps;
}

export function ProfileCard({ data }: ProfileCardProps) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="bg-white flex w-full items-center flex-col text-center rounded-lg p-10 max-w-2xl h-full ">
      <div>
        <div className="avatar">
          <div className="w-32 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2 mb-2">
            <Image
              src={data?.ProfileImg}
              alt="Profile Picture"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>

      {isEdit ? (
        <div className="mt-10 w-full max-w-sm flex flex-col items-center">
          <EditProfile />
          <div className="flex mt-10 space-x-4 justify-center">
            <button
              className="btn w-full flex-grow"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
            <button className="btn bg-primary w-full flex-grow">Save</button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-700">
              {data?.username.toUpperCase()}
            </h1>
            <h2 className="text-gray-500">{data?.email}</h2>
            <p>Joined on {data?.enterDate}</p>
          </div>
          <div className="gap-12 rounded-xl px-8 border border-gray-200/90 py-6 flex bg-gray-100 font-medium my-10">
            <p className="">
              <span className="text-yellow-600">{data?.animesCompleted}</span>
              <br />
              Animes Completed
            </p>
            <p>
              <span className="text-yellow-600">{data?.totalAnimes}</span>{" "}
              <br />
              Total Animes
            </p>
            <p>
              <span className="text-yellow-600">{data?.EpisodesWatched}</span>
              <br />
              Episodes Watched
            </p>
          </div>
          <div>
            <button
              className="btn px-16 bg-primary w-full"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
