"use client";

import React, { useEffect, useRef } from "react";
import { BsPlusCircleFill } from "react-icons/bs";

import Image from "next/image";
import { useForm } from "react-hook-form";
import useAddToList from "@/hooks/useAddToList";
import { ListForm } from "../ListForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const AddToList = ({ animeData, children }: any) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      status: { value: "All", label: "All" },
      episodeProgress: 0,
      rating: 0,
    },
  });

  const { status: userStatus } = useSession();
  const { isAuthenticated } = useAuth();
  const { addToMyList } = useAddToList();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const { status, episodeProgress, rating } = data;
    const jikanId = animeData?.mal_id;

    try {
      await addToMyList(
        jikanId.toString(),
        animeData?.title,
        animeData?.images.webp.large_image_url,
        status.value,
        parseInt(episodeProgress),
        animeData?.episodes,
        rating
      );
    } finally {
      dialogRef.current.close();
    }
  };

  const dialogRef: any = useRef();

  const handleClick = () => {
    if (userStatus !== "authenticated") {
      router.push("/auth/login");
    } else {
      dialogRef.current.showModal();
    }
  };

  const handleCancel = () => {
    dialogRef.current.close();
  };

  return (
    <>
      {userStatus === "authenticated" ? (
        <button
          className=" flex items-center cursor-pointer hover:text-primary gap-2 transition-colors text-base"
          onClick={handleClick}
        >
          <BsPlusCircleFill size={22} />
          <p>Add to list</p>
        </button>
      ) : (
        <button
          className="flex items-center cursor-pointer hover:text-primary gap-2 transition-colors text-sm md:text-base"
          onClick={() => router.push("/auth/login")}
        >
          <BsPlusCircleFill size={22} />
          <p>Login To Add to list</p>
        </button>
      )}

      <dialog
        id="my_modal_1"
        ref={dialogRef}
        data-theme="light"
        className="modal bg-black/30"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="dialog"
          className="modal-box overflow-hidden w-full flex flex-col h-auto max-h-full bg-gradient-to-b px-8 from-background to-[#e3e8f4]"
        >
          <div className="flex flex-wrap">
            <div className="flex gap-8 justify-center pt-5">
              <div className="w-36 h-48 lg:flex overflow-hidden rounded-lg drop-shadow-lg hidden">
                <Image
                  src={animeData?.images.webp.image_url}
                  fill
                  sizes="100%"
                  alt={animeData?.title}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="mt-2 w-full flex flex-col items-center lg:items-start">
                <h3 className="font-semibold text-2xl text-gray-700 mb-7">
                  {animeData?.title}
                </h3>
                <ListForm control={control} episodes={animeData?.episodes} />
              </div>
            </div>
          </div>
          <div className="flex mt-auto justify-center lg:justify-end gap-6 pt-20 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              className="btn bg-gray-300 text-gray-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="btn bg-primary text-gray-600 hover:bg-gray-300 "
              type="submit"
            >
              Add to list
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};
