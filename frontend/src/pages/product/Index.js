import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/Index";
import Footer from "../../components/Footer/Index";
import Header from "../../components/Header/Index";
import SubCategoryService from "../../services/SubCategoryService";

export default function Index() {
  const [subcategory, setSubCategory] = useState({});
  const { subcategoryId } = useParams();
  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const res = await SubCategoryService.getDetail(subcategoryId);
      setSubCategory(res.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Header />
      {subcategory && (
        <BreadCrumb
          items={[
            { id: 1, name: "Home" },
            { id: 2, name: subcategory.categorytitle },
            { id: 3, name: subcategory.subcategorytitle },
          ]}
        />
      )}

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-4">
            {subcategory.subcategorytitle}
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {subcategory &&
              subcategory.images?.map((image) => (
                <div className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={image.url}
                      alt={image.url}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  {/* <h3 className="mt-4 text-sm text-gray-700">Fuck</h3> */}
                  <Link
                    to={image.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-xs inline-block bg-gray-900 text-white px-2 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200 mt-2"
                  >
                    Download
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
