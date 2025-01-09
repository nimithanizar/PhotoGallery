import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PhotoDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://finder-api.chavaramatrimony.com/PhotoGallery/details/${id}`
        );
        setData(response.data);
      } catch (err) {
        console.error("API Error:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fallbackImage = "https://via.placeholder.com/500x400"; 

  if (isLoading) {
    return (
      <div className="text-center text-xl font-semibold mt-10">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl font-semibold text-red-500 mt-10">
        Error fetching data: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        <div className="flex-1">
          <img
            src={data.coverImageUrl || fallbackImage}
            alt={data.title || "Detail Image"}
            className="w-full h-screen object-cover rounded-lg shadow-lg"
            onError={(e) => e.target.src = fallbackImage} 
          />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
          <div className="border-t-4 border-gray-400 mb-4"></div>
          <p className="text-gray-700 font-medium mb-4">{data.subject}</p>
          <div className="overflow-y-auto max-h-screen scrollbar-hidden">
            <div className="grid grid-cols-3 gap-4">
              {data.galleryPhotos?.map((img, idx) => (
                <div key={idx} className="overflow-hidden rounded-lg shadow-md">
                  <img
                    src={img.imageUrl || fallbackImage}
                    alt={`Gallery ${idx}`}
                    className="w-full h-auto object-cover"
                    onError={(e) => e.target.src = fallbackImage} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetails;
