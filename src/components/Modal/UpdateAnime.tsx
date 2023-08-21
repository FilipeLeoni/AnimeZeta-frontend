import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ListForm } from "../ListForm";
import useUpdateAnime from "@/hooks/useUpdateAnime";
import useRemoveAnime from "@/hooks/useRemoveAnime";
import { useMutation, useQueryClient } from "react-query";
import Link from "next/link";
import { ListAnime } from "@/@types/AnimeList";

declare global {
  interface Window {
    my_modal_2: HTMLDialogElement;
  }
}

export const UpdateAnime = ({ animeData }: { animeData: ListAnime }) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      status: { value: animeData?.status, label: animeData?.status },
      episodeProgress: animeData?.episodes,
      rating: animeData?.rating,
    },
  });

  const { RemoveAnimeFromList } = useRemoveAnime();
  const { updateAnime } = useUpdateAnime();

  const queryClient = useQueryClient();

  const removeAnimeMutation = useMutation(RemoveAnimeFromList, {
    onSuccess: () => {
      queryClient.invalidateQueries("animeList");
    },
  });

  const updateAnimeMutation = useMutation(
    (params: {
      id: string;
      status: string;
      episodeProgress: number;
      rating: number;
    }) =>
      updateAnime(
        params.id,
        params.status,
        params.episodeProgress,
        params.rating
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("animeList");
      },
    }
  );

  useEffect(() => {
    setValue("status", { value: animeData?.status, label: animeData?.status });
    setValue("episodeProgress", animeData?.episodeProgress);
    setValue("rating", animeData?.rating);
  }, [animeData, setValue]);

  const onSubmit = async (data: any) => {
    const { status, episodeProgress, rating } = data;
    try {
      await updateAnimeMutation.mutateAsync({
        id: animeData?.id,
        status: status.value,
        episodeProgress,
        rating,
      });
    } catch (error) {
      console.log(error);
    } finally {
      window.my_modal_2.close();
    }
  };

  const handleRemove = async () => {
    try {
      await removeAnimeMutation.mutateAsync(animeData.id);
    } catch (error) {
      console.log(error);
    } finally {
      window.my_modal_2.close();
    }
  };

  return (
    <dialog id="my_modal_2" data-theme="light" className="modal">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="dialog"
        className="modal-box overflow-hidden w-full flex flex-col h-full max-h-[520px] bg-gradient-to-b px-8 from-background to-[#e3e8f4] "
      >
        <div className="flex flex-wrap">
          <div className="flex gap-8 pt-5">
            <div className="text-center hidden sm:inline">
              <div className="w-40 h-56 overflow-hidden rounded-lg drop-shadow-lg flex">
                <Image
                  src={animeData?.imageUrl}
                  fill
                  sizes="100%"
                  style={{ objectFit: "cover" }}
                  alt={animeData?.title}
                />
              </div>
              <Link href={`/anime/${animeData?.jikanId}`}>
                <p className="mt-2 font-medium text-gray-600 hover:underline">
                  See details
                </p>
              </Link>
            </div>
            <div className="mt-2">
              <h3 className="font-semibold text-2xl text-gray-700 mb-7">
                {animeData?.title}
              </h3>
              <ListForm control={control} episodes={animeData?.episodes} />
              <Link href={`/anime/${animeData?.jikanId}`} className="sm:hidden">
                <p className="ml-3 mt-3 font-medium text-gray-600 hover:underline">
                  See details
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex mt-auto justify-between gap-6">
          <button
            className="btn bg-gray-300 text-red-600 hover:bg-gray-200"
            type="button"
            onClick={handleRemove}
          >
            Remove
          </button>
          <div className="flex mt-auto justify-end gap-6">
            <div className="modal-action mt-auto">
              <button
                type="button"
                className="btn bg-gray-300 text-gray-600"
                onClick={() => window.my_modal_2.close()}
              >
                Cancel
              </button>
            </div>
            <button
              className="btn bg-primary text-gray-600 hover:bg-gray-300"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
};
