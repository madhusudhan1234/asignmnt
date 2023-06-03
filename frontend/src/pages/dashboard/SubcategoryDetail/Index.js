import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Dashboard/Header/Index";
import PageTitle from "../../../components/Dashboard/PageTitle/Index";
import ProductForm from "../../../components/Dashboard/ProductForm/Index";
import ProductListing from "../../../components/Dashboard/ProductListing/Index";
import Sidebar from "../../../components/Sidebar/Index";
import AuthService from "../../../services/AuthService";
import CategoryService from "../../../services/CategoryService";
import ProductService from "../../../services/ProductService";
import SubCategoryService from "../../../services/SubCategoryService";

export default function Index() {
  const { subcategoryId } = useParams();
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcaterogy] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    fetchSubcategoryDetail();
    fetchCategories();
  }, [subcategoryId]);

  const fetchMe = async () => {
    try {
      await AuthService.get();
    } catch (error) {
      if (error.status === 401) {
        setIsLoggedIn(false);
      }
      console.error(error);
    }
  };

  const fetchSubcategoryDetail = async (cached = true) => {
    try {
      const res = await SubCategoryService.getDetail(subcategoryId, cached);
      setSubcaterogy(res.data);
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

  const createProduct = async (payload, cb) => {
    try {
      payload.subcategoryId = subcategoryId;
      await ProductService.create(payload);
      cb();
      fetchSubcategoryDetail(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isLoggedIn) {
    return navigate("/lol");
  }

  return (
    <>
      <div className="min-h-full">
        <Header />
        <PageTitle title="SubCategory" />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
            <div className="col-span-1">
              {categories && categories.length > 1 && (
                <Sidebar categories={categories} />
              )}
            </div>
            <div className="col-span-3">
              <div class="text-center">
                <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  {subcategory.title}
                </h1>
                <p class="mt-6 text-lg leading-8 text-gray-600">
                  {subcategory.description}
                </p>
              </div>
              <ProductForm handleCreateProduct={createProduct} />
              <ProductListing
                products={subcategory.products}
                linkType="private"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
