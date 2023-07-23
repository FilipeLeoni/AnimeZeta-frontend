import { useState } from "react";
import { useApi } from "./useApi";

const useAddToList = () => {
  const api = useApi();

  const addToMyList = async (
    jikanId: any,
    title: any,
    imageUrl: any,
    status: any
  ) => {
    try {
      const response = await api.AddAnimeToList(
        jikanId,
        title,
        imageUrl,
        status
      );

      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  return { addToMyList };
};

export default useAddToList;
