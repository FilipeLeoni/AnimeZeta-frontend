import { toast } from "react-toastify";
import { useApi } from "./useApi";

const useUpdateAnime = () => {
  const api = useApi();

  const updateAnime = async (
    id: string,
    status: string,
    episodes: number
  ): Promise<void> => {
    try {
      const response = await api.UpdateAnime(id, status, episodes);

      if (response) {
        toast.success("Anime updated successfully", {
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

  return { updateAnime };
};

export default useUpdateAnime;
