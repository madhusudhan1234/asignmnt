import { Fragment } from "react";
import Footer from "../../components/Footer/Index";
import Header from "../../components/Header/Index";

const categories = [
  {
    title: "Category 1",
    subcategories: [
      {
        title: "Subcategory 1.1",
        imageSrc: "https://via.placeholder.com/150",
        link: "/category1/subcategory3",
      },
      {
        title: "Subcategory 1.2",
        imageSrc: "https://via.placeholder.com/150",
      },
      {
        title: "Subcategory 1.3",
        imageSrc: "https://via.placeholder.com/150",
      },
      {
        title: "Subcategory 1.4",
        imageSrc: "https://via.placeholder.com/150",
      },
      {
        title: "Subcategory 1.5",
        imageSrc: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    title: "Category 2",
    subcategories: [
      {
        title: "Subcategory 2.1",
        imageSrc: "https://via.placeholder.com/150",
      },
      {
        title: "Subcategory 2.2",
        imageSrc: "https://via.placeholder.com/150",
      },
      {
        title: "Subcategory 2.3",
        imageSrc: "https://via.placeholder.com/150",
      },
      {
        title: "Subcategory 2.4",
        imageSrc: "https://via.placeholder.com/150",
      },
      {
        title: "Subcategory 2.5",
        imageSrc: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    title: "Category 3",
    subcategories: [
      {
        title: "Subcategory 3.1",
        imageSrc: "https://via.placeholder.com/150",
      },
      {
        title: "Subcategory 3.2",
        imageSrc: "https://via.placeholder.com/150",
      },
      {
        title: "Subcategory 3.3",
        imageSrc: "https://via.placeholder.com/150",
      },
      {
        title: "Subcategory 3.4",
        imageSrc: "https://via.placeholder.com/150",
      },
      {
        title: "Subcategory 3.5",
        imageSrc: "https://via.placeholder.com/150",
      },
    ],
  },
];

export default function Index() {
  return (
    <Fragment>
      <Header />
      <div className="bg-gray-100">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Catalogs</h2>

          <div className="bg-gray-100 px-4 pt-4 pb-8 sm:px-8">
            {categories.map((category) => (
              <div className="bg-gray-100 px-4 pt-4 pb-8 sm:px-8">
                <div
                  key={category.title}
                  className="bg-white p-4 rounded-t-md shadow-lg mb-4 relative"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                >
                  <h2 className="text-xl font-bold mb-4">{category.title}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category.subcategories.map((subcategory) => (
                      <a
                        key={subcategory.title}
                        href={subcategory.link}
                        className="bg-white rounded-md shadow-md hover:shadow-lg transition duration-300 block overflow-hidden"
                      >
                        <div
                          className="h-0 pb-60 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${subcategory.imageSrc})`,
                          }}
                        ></div>
                        <h3 className="text-md font-bold mt-4 px-4 pb-2">
                          {subcategory.title}
                        </h3>
                      </a>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-white opacity-50 rounded-md"></div>
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
