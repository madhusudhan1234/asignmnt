import { useEffect, useState } from "react";
import Header from "../../../components/Dashboard/Header/Index";
import PageTitle from "../../../components/Dashboard/PageTitle/Index";
import Sidebar from "../../../components/Sidebar/Index";
import CategoryService from "../../../services/CategoryService";
import SubscriberService from "../../../services/SubscriberService";

export default function Index() {
  const [subscribers, setSubscribers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchSubscribers();
    fetchCategories();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await SubscriberService.get();
      setSubscribers(res.data);
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

  return (
    <>
      <div className="min-h-full">
        <Header />
        <PageTitle title="Subscribers" />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
            <div className="col-span-1">
              {categories && categories.length > 1 && (
                <Sidebar categories={categories} />
              )}
            </div>
            <div className="col-span-3">
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Name
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Phone
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Message
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {subscribers?.length < 1 && (
                      <tr>
                        <td
                          className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center"
                          colspan={3}
                        >
                          No Subscribers Found.
                        </td>
                      </tr>
                    )}
                    {subscribers?.length &&
                      subscribers.map((subscriber) => (
                        <tr>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            <div className="flex flex-col items-start justify-center">
                              <span className="mb-1 text-sm">
                                {subscriber.name}
                              </span>
                              <span className="text-indigo-600">
                                {subscriber.email}
                              </span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {subscriber.phone ? (
                              <div className="flex flex-col items-start justify-center">
                                <span className="mb-1 text-sm">
                                  {subscriber.country}
                                </span>
                                <span className="text-indigo-600">
                                  {subscriber.phone}
                                </span>
                              </div>
                            ) : (
                              <span>-</span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {subscriber.message ? (
                              <span className="text-sm">
                                {subscriber.message}
                              </span>
                            ) : (
                              <span>-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
