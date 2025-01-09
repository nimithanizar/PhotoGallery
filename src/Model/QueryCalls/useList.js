import { useQuery } from "@tanstack/react-query";
import { fetchGallery } from "../ApiCalls/listApi";

export const usePhotoList = () => {
  return useQuery({
    queryKey: ["listphoto"],
    queryFn: fetchGallery,
  });
};
