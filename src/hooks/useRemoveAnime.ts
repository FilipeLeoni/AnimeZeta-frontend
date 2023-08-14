import { toast } from "react-toastify";
import { useApi } from "./useApi";

const useRemoveAnime = () => {
  const api = useApi();

  const RemoveAnimeFromList = async (id: string) => {
    try {
      const response = await api.RemoveAnime(id);

      if (response) {
        toast.success("Anime Removed from list successfully", {
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

  return { RemoveAnimeFromList };
};

export default useRemoveAnime;
