import { XMarkIcon } from "@heroicons/react/24/outline";
import CreateSubcategory from "../CreateSubcategory/Index";

const CategoryCard = ({
  index,
  title,
  subcategories,
  handleOpenModal,
  handleCreateSubCategory,
}) => {
  const handleDeleteSubcategory = (subcategoryIndex) => {
    // handle delete subcategory logic here
  };

  const handleDeleteImage = (subcategoryIndex, imageIndex) => {
    // handle delete image logic here
  };

  const handleButtonClick = (e, subcategory) => {
    e.preventDefault();

    handleOpenModal(subcategory);
  };

  return (
    <div className="bg-white rounded-lg border-b-2 p-6 transform transition hover:-translate-y-1 hover:shadow-lg">
      <h2 className="text-lg font-bold mb-4">
        {index + 1}. {title}
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2">
        {subcategories.map((subcategory, subcategoryIndex) => (
          <div
            key={subcategory.id}
            className="bg-gray-100 rounded-md shadow-md p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-small">
                {subcategoryIndex + 1}. {subcategory.title}
              </h4>
              <button
                className="text-gray-500 hover:text-red-500"
                onClick={() => handleDeleteSubcategory(subcategoryIndex)}
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-600">{subcategory.description}</p>
            {/* <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {subcategory?.images?.map((image, imageIndex) => (
                <div key={imageIndex} className="relative">
                  <button
                    className="absolute top-0 right-0 p-1 rounded-full bg-white shadow-md hover:bg-red-500 hover:text-white focus:outline-none"
                    onClick={() =>
                      handleDeleteImage(subcategoryIndex, imageIndex)
                    }
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                  <img
                    className="w-full h-48 object-cover rounded-md"
                    src={image.url}
                    alt={subcategory.title}
                  />
                </div>
              ))}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => handleButtonClick(e, subcategory)}
              >
                Add Image
              </button>
            </div> */}
          </div>
        ))}
        <CreateSubcategory handleCreateSubcategory={handleCreateSubCategory} />
      </div>
    </div>
  );
};

export default CategoryCard;
