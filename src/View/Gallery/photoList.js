import { usePhotoList } from "../../Model/QueryCalls/useList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function PhotoList() {
  const [page, setPage] = useState(1);
  const perPage = 5;
  const { data, isLoading, error } = usePhotoList(page, perPage);
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

  const totalItems = data?.totalCount || 0;
  const totalPages = Math.ceil(totalItems / perPage);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <div className="bg-blue-50 p-6 mb-8">
        <h1 className="text-3xl font-bold text-left text-gray-800 mb-4">
          Photo Gallery
        </h1>
        <p className="text-left font-medium text-gray-600">
          The Chavara Matrimony photo gallery features vibrant images from our
          events and branch inaugurations, including highlights from cultural
          functions, new branch openings, and milestone celebrations. It
          presents a glimpse into the organization's active community engagement
          and memorable occasions.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center p-8">
        {data?.items?.map((item) => {
          return (
            <div
              key={item.id}
              className="border border-gray-300 rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleCardClick(item.id)}
            >
              {/* Image and Text Container */}
              <div className="flex flex-col items-center p-4 pl-6 pr-6">
                {/* Image */}
                <div className="w-full h-48 flex justify-center items-center">
                  {item.coverImageUrl ? (
                    <img
                      src={item.coverImageUrl}
                      alt={item.title || "Image not available"}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}
                </div>

                {/* Title Text */}
                <div className="mt-4 text-center">
                  <h2 className="text-lg font-semibold mb-2 text-gray-800">
                    {item.title}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span className="self-center text-lg">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PhotoList;
