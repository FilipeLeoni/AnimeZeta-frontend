import { toast } from "react-toastify";
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

      if (response) {
        toast.success("Anime added to list!", {
          position: "top-right",
          theme: "light",
        });
      }
    } catch (error: any) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.error, {
          position: "top-right",
          theme: "light",
        });
      } else {
        toast.error("An error occurred", {
          position: "top-right",
          theme: "light",
        });
      }
    }
  };

  return { addToMyList };
};

export default useAddToList;
