import useAddToList from "@/hooks/useAddToList";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ListForm } from "../ListForm";
import { useApi } from "@/hooks/useApi";
import useUpdateAnime from "@/hooks/useUpdateAnime";
import useRemoveAnime from "@/hooks/useRemoveAnime";

declare global {
  interface Window {
    my_modal_2: HTMLDialogElement;
  }
}

export const UpdateAnime = ({ animeData }: any) => {
  const { control, handleSubmit, register, setValue } = useForm();
  const [episodeProgress, setEpisodeProgress] = useState(0);

  const { RemoveAnimeFromList } = useRemoveAnime();
  const { updateAnime } = useUpdateAnime();

  useEffect(() => {
    setValue("status", { value: animeData?.status, label: animeData?.status });
    setEpisodeProgress(animeData?.episodes);
    setValue("episodes", episodeProgress);
  }, [animeData, setValue]);

  const onSubmit = async (data: any) => {
    const { status, episodes } = data;
    try {
      await updateAnime(animeData?.id, status.value, episodes);
    } catch (error) {
      console.log(error);
    } finally {
      window.my_modal_2.close();
    }
  };

  const handleRemove = async () => {
    try {
      await RemoveAnimeFromList(animeData.id);
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
        className="modal-box overflow-hidden w-full max-w-4xl flex flex-col h-full max-h-[400px] bg-gradient-to-b px-16 from-background to-[#e3e8f4]"
      >
        <div className="w-full h-1/3 bg-gray overflow-hidden -z-20 absolute left-0 top-0">
          <div
            className="w-full bg-black h-full overflow-hidden opacity-90"
            style={{
              backgroundImage: `url(${animeData?.imageUrl})`,
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
              src={animeData?.imageUrl}
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
