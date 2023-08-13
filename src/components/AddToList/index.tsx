"use client";

import { PlusCircle } from "@phosphor-icons/react";
import React, { useId, useState } from "react";
import SelectCustom from "../Select";
import MyListOptions from "@/utils/HeaderOptions/MyListOptions";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import useAddToList from "@/hooks/useAddToList";
import { ListForm } from "../ListForm";
import { toast } from "react-toastify";

declare global {
  interface Window {
    my_modal_1: HTMLDialogElement;
  }
}

export const AddToList = ({ animeData }: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { control, handleSubmit, register, reset } = useForm();
  const [episodeProgress, setEpisodeProgress] = useState<number | undefined>();
  const { addToMyList } = useAddToList();

  const onSubmit = async (data: any) => {
    const { status, episodes } = data;
    const jikanId = animeData?.mal_id;
    const episodesAsNumber = parseInt(episodes);

    try {
      await addToMyList(
        jikanId.toString(),
        animeData?.title,
        animeData?.images.webp.large_image_url,
        status.value,
        episodesAsNumber
      );
    } finally {
      setIsOpenModal(false);
    }
  };

  const handleClick = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    setIsOpenModal(false);

    setEpisodeProgress(0);
    reset({ status: "" });
  };

  return (
    <>
      <button
        className="flex items-center cursor-pointer hover:text-primary gap-1 transition-colors text-sm md:text-base"
        onClick={handleClick}
      >
        <PlusCircle size={32} weight="fill" />
        <p>Add to list</p>
      </button>
      {isOpenModal && (
        <dialog open data-theme="light" className="modal bg-black/30">
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="dialog"
            className="modal-box overflow-hidden w-full max-w-4xl flex flex-col h-full max-h-[400px] bg-gradient-to-b px-16 from-background to-[#e3e8f4]"
          >
            <div className="w-full h-1/3 bg-gray overflow-hidden -z-20 absolute left-0 top-0">
              <div
                className="w-full bg-black h-full overflow-hidden opacity-90"
                style={{
                  backgroundImage: `url(${animeData?.images.webp.image_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  backgroundRepeat: "no-repeat",
                  filter: "brightness(50%) blur(4px)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>
            <div className="flex flex-wrap">
              <div className="flex items-center gap-8 pt-5">
                <Image
                  src={animeData?.images.webp.image_url}
                  width={144}
                  height={192}
                  className="rounded-xl drop-shadow-lg"
                  alt={animeData?.title}
                />
                <div className="">
                  <h3 className="font-semibold text-2xl text-white mb-7">
                    {animeData?.title}
                  </h3>
                  <ListForm
                    episodeProgress={episodeProgress}
                    setEpisodeProgress={setEpisodeProgress}
                    control={control}
                    register={register}
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-auto justify-end gap-6">
              <div className="modal-action mt-auto">
                <button
                  type="button"
                  className="btn bg-gray-300 text-gray-600"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
              <button
                className="btn bg-primary text-gray-600 hover:bg-gray-300"
                type="submit"
              >
                Add to list
              </button>
            </div>
          </form>
        </dialog>
      )}
    </>
  );
};
