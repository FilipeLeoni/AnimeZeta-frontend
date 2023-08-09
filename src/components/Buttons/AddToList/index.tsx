import React from "react";
import { PlusCircle } from "@phosphor-icons/react";
import useAddToList from "@/hooks/useAddToList";

export default function AddToList({ animeData }: any) {
  const { addToMyList } = useAddToList();

  const handleAddToList = () => {
    const { title } = animeData;
    const jikanId = animeData.mal_id;
    const imageUrl = animeData.images.webp.image_url;
    const status = "Completed";

    addToMyList(jikanId.toString(), title, imageUrl, status);
  };

  return (
    <div
      className="flex items-center cursor-pointer hover:text-primary gap-1 transition-colors text-sm md:text-base"
      onClick={handleAddToList}
    >
      <PlusCircle size={32} weight="fill" />
      <p>Add to list</p>
    </div>
  );
}
