import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import CreateSubcategory from "../CreateSubcategory/Index";

const CategoryCard = ({
  collections,
  handleOpenModal,
  handleCreateCollection,
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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2">
        {collections.map((collection, index) => (
          <div
            key={collection.id}
            className="bg-gray-100 rounded-md shadow-md p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-small">
                {index + 1}.{" "}
                <Link to={`/u/collections/${collection.id}`}>
                  {collection.title}
                </Link>
              </h4>
              <button
                className="text-gray-500 hover:text-red-500"
                onClick={() => handleDeleteSubcategory(index)}
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-600">{collection.description}</p>
          </div>
        ))}
        <CreateSubcategory handleCreateSubcategory={handleCreateCollection} />
      </div>
    </div>
  );
};

export default CategoryCard;
