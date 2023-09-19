import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreadCrumb from "../../components/BreadCrumb/Index";
import Footer from "../../components/Footer/Index";
import Header from "../../components/Header/Index";
import CollectionService from "../../services/CollectionService";

export default function Index() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async (cached = true) => {
    try {
      const res = await CollectionService.get(cached);
      setCollections(res.data);
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
            <div
              className="bg-white p-4 rounded-t-md shadow-lg relative"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {collections?.map((collection) => (
                  <div className="text-center" key={collection.id}>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      <Link to={`/category/${collection.id}`}>
                        {collection.title}
                      </Link>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                      {collection.description}
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
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
