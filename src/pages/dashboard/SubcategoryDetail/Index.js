import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Dashboard/Header/Index";
import PageTitle from "../../../components/Dashboard/PageTitle/Index";
import ProductForm from "../../../components/Dashboard/ProductForm/Index";
import ProductListing from "../../../components/Dashboard/ProductListing/Index";
import AuthService from "../../../services/AuthService";
import CollectionService from "../../../services/CollectionService";
import ProductService from "../../../services/ProductService";

export default function Index() {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    fetchCollectionDetail();
  }, [collectionId]);

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

  const fetchCollectionDetail = async (cached = true) => {
    try {
      const res = await CollectionService.getDetail(collectionId, cached);
      setCollection(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createProduct = async (payload, cb) => {
    try {
      payload.collectionId = collectionId;
      await ProductService.create(payload);
      cb();
      fetchCollectionDetail(false);
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
        <PageTitle title="Collection" />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
            <div className="col-span-3">
              <div class="text-center">
                <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  {collection.title}
                </h1>
                <p class="mt-6 text-lg leading-8 text-gray-600">
                  {collection.description}
                </p>
              </div>
              <ProductForm handleCreateProduct={createProduct} />
              <ProductListing
                products={collection.products}
                linkType="private"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
