"use client";

import React, { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import SecondaryButton from "../Buttons/SecondaryButton";

declare global {
  interface Window {
    my_modal_3: HTMLDialogElement;
  }
}

const WatchTrailer = ({ Link }: { Link: string | null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={openModal}>
        <SecondaryButton icon={FaPlay}>Watch Trailer</SecondaryButton>
      </div>
      {isModalOpen && (
        <dialog
          open
          id="my_modal_3"
          className="modal bg-black/50"
          onClick={closeModal}
        >
          <form
            method="dialog"
            className="modal-box w-full max-w-5xl h-full p-0 max-h-[624px]"
          >
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle absolute right-2 top-2 bg-white"
            >
              ✕
            </button>
            {Link === null ? (
              <div className="flex justify-center items-center w-full h-full">
                <h2 className="text-lg font-medium text-gray-600">
                  Trailer not available
                </h2>
              </div>
            ) : (
              <iframe
                width="100%"
                height="100%"
                src={Link}
                title="YouTube Video"
                className="rounded-lg"
                allowFullScreen
              />
            )}
          </form>
        </dialog>
      )}
    </>
  );
};

export default WatchTrailer;
