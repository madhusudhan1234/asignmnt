import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard/Index";
import Header from "../../components/Dashboard/Header/Index";
import PageTitle from "../../components/Dashboard/PageTitle/Index";
import AuthService from "../../services/AuthService";
import CollectionService from "../../services/CollectionService";

export default function Dashboard() {
  const [collections, setCollections] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    fetchCollections();
  }, []);

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

  const fetchCollections = async (cached = true) => {
    try {
      const res = await CollectionService.get(cached);
      setCollections(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateCollection = async (title, description) => {
    try {
      await CollectionService.create({
        title,
        description,
      });

      fetchCollections(false);
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
        <PageTitle title="Dashboard" />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
            {/* <div className="col-span-1">
              {categories && categories.length > 1 && (
                <Sidebar categories={categories} />
              )}
            </div> */}
            <div className="col-span-3">
              <div className="mt-5 text-sm text-gray-600">
                <CategoryCard
                  collections={collections}
                  handleCreateCollection={(title, description) =>
                    handleCreateCollection(title, description)
                  }
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
