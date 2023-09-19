import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Dashboard/Header/Index";
import ImageListing from "../../../components/Dashboard/ImageListing/Index";
import PageTitle from "../../../components/Dashboard/PageTitle/Index";
import ImageModal from "../../../components/ImageModal/Index";
import AuthService from "../../../services/AuthService";
import ImageService from "../../../services/ImageService";
import ProductService from "../../../services/ProductService";

export default function Index() {
  const { productId } = useParams();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

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

  const fetchProductDetail = async (cached = true) => {
    try {
      const res = await ProductService.getDetail(productId, cached);
      setProduct(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageUpload = async (uploadedFiles) => {
    const formData = new FormData();

    formData.append("productId", productId);
    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("image", uploadedFiles[i]);
    }

    try {
      await ImageService.create(formData);

      fetchProductDetail(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isLoggedIn) {
    return navigate("/lol");
  }

  return (
    <>
      <ImageModal
        isOpen={isModalOpen}
        handleImageUpload={handleImageUpload}
        handleCloseModal={handleCloseModal}
      />
      <div className="min-h-full">
        <Header />
        <PageTitle title="Product" />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
            <div className="col-span-3">
              <div class="text-center">
                <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  {product.name}
                </h1>
                <p class="mt-6 text-lg leading-8 text-gray-600">
                  {product.price}
                </p>
                <p class="mt-6 text-lg leading-8 text-gray-600">
                  {product.description}
                </p>
              </div>
              <div className="flex justify-center items-center mt-10">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleOpenModal}
                >
                  Add Images
                </button>
              </div>
              <ImageListing images={product?.images} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
