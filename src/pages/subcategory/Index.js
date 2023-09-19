import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/Index";
import ProductListing from "../../components/Dashboard/ProductListing/Index";
import Footer from "../../components/Footer/Index";
import Header from "../../components/Header/Index";
import CollectionService from "../../services/CollectionService";

export default function Index() {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState({});

  useEffect(() => {
    fetchCollectionDetail();
  }, [collectionId]);

  const fetchCollectionDetail = async (cached = true) => {
    try {
      const res = await CollectionService.getDetail(collectionId, cached);
      setCollection(res.data);
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
          { id: 2, name: collection.title },
        ]}
      />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
          <div className="col-span-4">
            <div class="text-center">
              <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {collection.title}
              </h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">
                {collection.description}
              </p>
            </div>
            <ProductListing products={collection.products} linkType="public" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
