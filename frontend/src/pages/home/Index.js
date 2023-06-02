import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        <div className="mx-auto flex max-w-7xl items-center justify-between sm:p-6 p-2">
          <div className="bg-gray-100">
            {categories.length &&
              categories.map((category) => (
                <div
                  className="bg-gray-100 px-4 pb-8 sm:px-8"
                  key={category.id}
                >
                  <div
                    className="bg-white p-4 rounded-t-md shadow-lg relative"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                  >
                    <h2 className="text-4xl font-bold mb-4">
                      {category.title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {category?.subcategories?.map((subcategory) => (
                        <div className="text-center" key={subcategory.id}>
                          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            <Link to={`/category/${subcategory.id}`}>
                              {subcategory.title}
                            </Link>
                          </h1>
                          <p className="mt-6 text-lg leading-8 text-gray-600">
                            {subcategory.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div
                      className="absolute inset-0 bg-white opacity-30 rounded-md"
                      style={{ pointerEvents: "none" }}
                    ></div>{" "}
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
