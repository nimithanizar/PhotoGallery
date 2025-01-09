
import { useQuery } from "@tanstack/react-query";
import { fetchGallery } from "../ApiCalls/listApi";

export const usePhotoList = (page = 1, perPage = 5) => {
  return useQuery({
    queryKey: ["listphoto", page, perPage],
    queryFn: () => fetchGallery({ page, perPage }),
    keepPreviousData: true, 
  });
};
