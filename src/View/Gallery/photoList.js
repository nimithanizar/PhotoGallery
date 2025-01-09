import { usePhotoList } from "../../Model/QueryCalls/useList";
import { useNavigate } from "react-router-dom";

function PhotoList() {
  const { data, isLoading, error } = usePhotoList();
  const navigate = useNavigate();

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

  const handleCardClick = (id) => {
    navigate(`/photo-gallery/details/${id}`);
  };

  return (
    <div className="p-4">
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-bold text-left text-gray-800 mb-4">
          Photo Gallery
        </h1>
        <p className="text-left font-medium text-gray-600">
          The Chavara Matrimony photo gallery features vibrant images from our
          events and branch inaugurations, including highlights from cultural
          functions, new branch openings, and milestone celebrations. It
          presents a glimpse into the organization's active community
          engagement and memorable occasions.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.items?.map((item) => {
          console.log('Cover Image URL:', item.coverImageUrl);
          
          return (
            <div
              key={item.id}
              className="border border-gray-300 rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleCardClick(item.id)}
            >
              {item.coverImageUrl ? (
                <img
                  src={item.coverImageUrl}
                  alt={item.title || "Image not available"}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', e.target.src);
                    e.target.src = "https://via.placeholder.com/300x200";
                  }}
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  {item.title}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PhotoList;
