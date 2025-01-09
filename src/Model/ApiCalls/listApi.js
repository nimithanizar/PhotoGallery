
import axios from "axios";

const API_BASE_URL = "https://finder-api.chavaramatrimony.com";

export const fetchGallery = async ({ page = 1, perPage = 5 }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/PhotoGallery/list`,
      {
        pagination: {
          currentPage: page,
          recordCount: perPage,
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    throw error;
  }
};
