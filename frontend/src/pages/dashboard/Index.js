import { useEffect, useState } from "react";
import CategoryCard from "../../components/CategoryCard/Index";
import CategoryForm from "../../components/CategoryForm/Index";
import Header from "../../components/Dashboard/Header/Index";
import PageTitle from "../../components/Dashboard/PageTitle/Index";
import Sidebar from "../../components/Sidebar/Index";
import CategoryService from "../../services/CategoryService";
import SubCategoryService from "../../services/SubCategoryService";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (cached = true) => {
    try {
      const res = await CategoryService.get(cached);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
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

  return (
    <>
      <div className="min-h-full">
        <Header />
        <PageTitle title="Dashboard" />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
            <div className="col-span-1">
              {categories && categories.length > 1 && (
                <Sidebar categories={categories} />
              )}
            </div>
            <div className="col-span-3">
              <CategoryForm onSubmit={handleCategorySubmit} />
              <div className="mt-5 text-sm text-gray-600">
                {categories &&
                  categories.length &&
                  categories.map((category, index) => (
                    <CategoryCard
                      title={category.title}
                      index={index}
                      subcategories={category.subcategories}
                      handleCreateSubCategory={(title, description) =>
                        handleCreateSubCategory(category.id, title, description)
                      }
                    />
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
