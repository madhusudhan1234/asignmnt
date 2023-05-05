import { useEffect, useState } from "react";
import CategoryCard from "../../components/CategoryCard/Index";
import CategoryForm from "../../components/CategoryForm/Index";
import Header from "../../components/Dashboard/Header/Index";
import ImageModal from "../../components/ImageModal/Index";
import CategoryService from "../../services/CategoryService";
import SubCategoryService from "../../services/SubCategoryService";

export default function Dashboard() {
  const [apicategories, setApiCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await CategoryService.get();

      setApiCategories(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const categories = [
    {
      id: "5f5de699-1ae6-4c8d-94b0-22b5ef032462",
      title: "Animals",
      subcategories: [
        {
          title: "Cats",
          description: "Cute and cuddly cats",
          images: [
            { url: "https://picsum.photos/id/237/200/300" },
            { url: "https://picsum.photos/id/238/200/300" },
            { url: "https://picsum.photos/id/239/200/300" },
          ],
        },
        {
          title: "Dogs",
          description: "Loyal and friendly dogs",
          images: [
            { url: "https://picsum.photos/id/240/200/300" },
            { url: "https://picsum.photos/id/241/200/300" },
          ],
        },
        {
          title: "Birds",
          description: "Colorful and beautiful birds",
          images: [
            { url: "https://picsum.photos/id/242/200/300" },
            { url: "https://picsum.photos/id/243/200/300" },
            { url: "https://picsum.photos/id/244/200/300" },
            { url: "https://picsum.photos/id/245/200/300" },
            { url: "https://picsum.photos/id/243/200/300" },
            { url: "https://picsum.photos/id/244/200/300" },
            { url: "https://picsum.photos/id/245/200/300" },
          ],
        },
      ],
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCategorySubmit = async (title) => {
    try {
      await CategoryService.create(title);
      fetchCategories();
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

      // fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ImageModal isOpen={isModalOpen} handleCloseModal={handleCloseModal} />
      <div className="min-h-full">
        <Header />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
            <CategoryForm onSubmit={handleCategorySubmit} />
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                subcategories={category.subcategories}
                handleOpenModal={handleOpenModal}
                handleCreateSubCategory={(title, description) =>
                  handleCreateSubCategory(category.id, title, description)
                }
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
