import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import clsx from "clsx";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";

export const SelectAvatar = ({
  children,
  currentAvatar,
}: {
  children: ReactNode;
  currentAvatar: string;
}) => {
  const { data: session, update } = useSession();
  const [selectedAvatar, setSelectedAvatar] = useState<any>(0);
  const avatarUrl = `${process.env.API_URL}images/predefined/avatar${selectedAvatar}.jpg`;

  const queryClient = useQueryClient();
  const api = useApi();

  const updateAvatarMutation = useMutation(
    async (selectedAvatar) => {
      const avatarUrl = `images/predefined/avatar${selectedAvatar}.jpg`;
      const res = await api.updateUser({ avatarUrl });
      return res;
    },
    {
      onSuccess: async () => {
        const avatarUrl = `images/predefined/avatar${selectedAvatar}.jpg`;
        queryClient.invalidateQueries("user");
        if (session) {
          await update({
            ...session,
            user: {
              ...session?.user,
              avatarUrl: avatarUrl,
            },
          });
        }
      },
    }
  );

  async function UpdateAvatar() {
    try {
      await updateAvatarMutation.mutateAsync(selectedAvatar);
      queryClient.invalidateQueries("user");
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error);
    } finally {
      window.my_modal_3.close();
    }
  }

  return (
    <>
      <button
        onClick={() => window.my_modal_3.showModal()}
        className="group relative"
      >
        {children}
      </button>
      <dialog id="my_modal_3" className="modal">
        <form
          method="dialog"
          className="modal-box justify-center items-center p-0 bg-gradient-to-b from-background to-[#e3e8f4] max-w-xl w-full"
        >
          <div className="flex justify-start text-start gap-6 p-10 pr-16 bg-white">
            <div className="avatar">
              <div className="w-28 h-28 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2 mb-2 flex">
                <Image
                  src={selectedAvatar === 0 ? currentAvatar : avatarUrl}
                  alt="Profile Picture"
                  width={200}
                  height={200}
                  className="w-20 h-20 m-2 cursor-pointer scale-125"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-medium text-gray-700">
                Avatar Selection
              </h1>
              <p className="text-sm text-gray-500">
                Choose your avatar! You can change it at any time.
              </p>
              <div className="flex gap-6 w-full justify-center mt-6">
                <button className="btn">Cancel</button>
                <button
                  type="button"
                  className="btn bg-primary"
                  onClick={UpdateAvatar}
                  disabled={selectedAvatar === 0}
                >
                  UPDATE AVATAR
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-10">
            <h2 className="text-xl font-medium">AnimeZeta Originals</h2>
            <div className="flex gap-6 mt-10 flex-wrap justify-center">
              {Array.from({ length: 8 }, (_, index) => (
                <div
                  className="avatar"
                  key={index}
                  onClick={() => setSelectedAvatar(index + 1)}
                >
                  <div
                    className={clsx(
                      "w-24 rounded-full ring hover:ring-primary ring-offset-base-100 ring-offset-2",
                      selectedAvatar === index + 1
                        ? "ring-primary"
                        : "ring-neutral-300"
                    )}
                  >
                    <Image
                      src={`${process.env.API_URL}/images/predefined/avatar${
                        index + 1
                      }.jpg`}
                      alt={`Predefined Image ${index + 1}`}
                      width={300}
                      height={300}
                      style={{ objectFit: "cover" }}
                      className="w-20 h-20 m-2 cursor-pointer scale-125"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
};
