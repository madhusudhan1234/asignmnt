import { Fragment, useEffect, useState } from "react";
import CreadCrumb from "../../components/BreadCrumb/Index";
import Footer from "../../components/Footer/Index";
import Header from "../../components/Header/Index";
import CategoryService from "../../services/CategoryService";

export default function Index() {
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

  return (
    <Fragment>
      <Header />
      <CreadCrumb items={[{ id: 1, name: "Home" }]} />
      <div className="bg-gray-100">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Catalogs</h2>

          <div className="bg-gray-100 px-4 pt-4 pb-8 sm:px-8">
            {categories.map((category) => (
              <div className="bg-gray-100 px-4 pt-4 pb-8 sm:px-8">
                <div
                  key={category.categoryId}
                  className="bg-white p-4 rounded-t-md shadow-lg mb-4 relative"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                >
                  <h2 className="text-xl font-bold mb-4">
                    {category.categoryTitle}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category?.subcategories?.map((subcategory) => (
                      <a
                        key={subcategory.id}
                        href={subcategory.link}
                        className="bg-white rounded-md shadow-md hover:shadow-lg transition duration-300 block overflow-hidden"
                      >
                        <div
                          className="h-0 pb-60 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${subcategory.images[0]["url"]})`,
                          }}
                        ></div>
                        <h3 className="text-md font-bold mt-4 px-4 pb-2">
                          {subcategory.title}
                        </h3>
                      </a>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-white opacity-30 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
