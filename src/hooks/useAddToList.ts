import { toast } from "react-toastify";
import { useApi } from "./useApi";

const useAddToList = () => {
  const api = useApi();

  const addToMyList = async (
    jikanId: string,
    title: string,
    imageUrl: string,
    status: string,
    episodes: number
  ) => {
    try {
      await toast.promise(
        api.AddAnimeToList(jikanId, title, imageUrl, status, episodes),
        {
          pending: "Adding to list...",
          success: "Added to list successfully",
          error: {
            render({ data }: any) {
              if (data.response) {
                return data.response.data.message;
              } else {
                return "An error occurred";
              }
            },
          },
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  return { addToMyList };
};

export default useAddToList;
