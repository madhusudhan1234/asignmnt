import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/Index";
import ProductListing from "../../components/Dashboard/ProductListing/Index";
import Footer from "../../components/Footer/Index";
import Header from "../../components/Header/Index";
import SubCategoryService from "../../services/SubCategoryService";

export default function Index() {
  const { subcategoryId } = useParams();
  const [subcategory, setSubcaterogy] = useState({});

  useEffect(() => {
    fetchSubcategoryDetail();
  }, [subcategoryId]);

  const fetchSubcategoryDetail = async (cached = true) => {
    try {
      const res = await SubCategoryService.getDetail(subcategoryId, cached);
      setSubcaterogy(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <BreadCrumb
        items={[
          { id: 1, name: "Home" },
          { id: 2, name: subcategory?.category?.title },
          { id: 2, name: subcategory.title },
        ]}
      />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
          <div className="col-span-4">
            <div class="text-center">
              <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {subcategory.title}
              </h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">
                {subcategory.description}
              </p>
            </div>
            <ProductListing products={subcategory.products} linkType="public" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
