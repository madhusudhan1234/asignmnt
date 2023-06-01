import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/Index";
import Footer from "../../components/Footer/Index";
import Header from "../../components/Header/Index";
import ProductService from "../../services/ProductService";

export default function Index() {
  const [product, setProduct] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const { productId } = useParams();

  const handleClick = () => {
    const currentPageLink = window.location.href;

    navigator.clipboard
      .writeText(currentPageLink)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Failed to copy link: ", error);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const res = await ProductService.getDetail(productId);
      setProduct(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Header />
      {product && (
        <BreadCrumb
          items={[
            { id: 1, name: "Home" },
            { id: 2, name: product?.subCategory?.title },
            { id: 3, name: product.name },
          ]}
        />
      )}

      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        {product &&
          product?.images?.map((image) => (
            <div className="aspect-h-4 aspect-w-3 sm:aspect-h-3 sm:aspect-w-2 lg:aspect-h-4 lg:aspect-w-3 overflow-hidden rounded-lg pb-5 relative">
              <img
                src={image.image}
                alt={image.name}
                className="h-full w-full object-cover object-center"
              />
              <a
                href={image.image}
                download
                className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded text-xs"
              >
                Download
              </a>
            </div>
          ))}
      </div>
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product.name}
          </h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-gray-900">
            {product.price}
          </p>
          <div className="mt-10">
            <button
              type="button"
              onClick={handleClick}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Copy Link
            </button>
            {isCopied && <p className="text-green-500 mt-2">Copied!</p>}
          </div>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <p className="text-base text-gray-900">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
