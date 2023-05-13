import { useEffect, useState } from "react";
import CategoryCard from "../../components/CategoryCard/Index";
import CategoryForm from "../../components/CategoryForm/Index";
import Header from "../../components/Dashboard/Header/Index";
import ImageModal from "../../components/ImageModal/Index";
import CategoryService from "../../services/CategoryService";
import ImageService from "../../services/ImageService";
import SubCategoryService from "../../services/SubCategoryService";
import SubscriberService from "../../services/SubscriberService";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState({});
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await SubscriberService.get();
      setSubscribers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async (cached = true) => {
    try {
      const res = await CategoryService.get(cached);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (subcategory) => {
    setIsModalOpen(true);
    setSelectedSubcategory(subcategory);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCategorySubmit = async (title) => {
    try {
      await CategoryService.create(title);
      fetchCategories(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateSubCategory = async (categoryId, title, description) => {
    try {
      await SubCategoryService.create({
        categoryId,
        title,
        description,
      });

      fetchCategories(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (uploadedFiles) => {
    const formData = new FormData();

    formData.append("subcategoryId", selectedSubcategory.id);
    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("image", uploadedFiles[i]);
    }
    console.log(uploadedFiles);

    try {
      await ImageService.create(formData);

      fetchCategories(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ImageModal
        isOpen={isModalOpen}
        handleImageUpload={handleImageUpload}
        handleCloseModal={handleCloseModal}
      />
      <div className="min-h-full">
        <Header />
        <header className="bg-white shadow">
          <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
            <div className="col-span-3">
              <CategoryForm onSubmit={handleCategorySubmit} />
              {categories &&
                categories.length &&
                categories.map((category, index) => (
                  <CategoryCard
                    key={index}
                    title={category.categoryTitle}
                    subcategories={category.subcategories}
                    handleOpenModal={handleOpenModal}
                    handleCreateSubCategory={(title, description) =>
                      handleCreateSubCategory(
                        category.categoryId,
                        title,
                        description
                      )
                    }
                  />
                ))}
            </div>
            <div className="col-span-1">
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <h3 className="pl-3 pt-2 text-2xl font-bold mb-4">
                  Subscribers
                </h3>
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Name
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Phone
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Message
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {subscribers?.length &&
                      subscribers.map((subscriber) => (
                        <tr>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            <div className="flex flex-col items-start justify-center">
                              <span className="mb-1 text-sm">
                                {subscriber.name}
                              </span>
                              <span className="text-indigo-600">
                                {subscriber.email}
                              </span>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {subscriber.phone ? (
                              <div className="flex flex-col items-start justify-center">
                                <span className="mb-1 text-sm">
                                  {subscriber.country}
                                </span>
                                <span className="text-indigo-600">
                                  {subscriber.phone}
                                </span>
                              </div>
                            ) : (
                              <span>-</span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {subscriber.message ? (
                              <span className="text-sm">
                                {subscriber.message}
                              </span>
                            ) : (
                              <span>-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
