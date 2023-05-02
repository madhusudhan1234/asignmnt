import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import ImageModal from "../../components/ImageModal/Index";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Images", href: "#", current: false },
];
const userNavigation = [{ name: "Sign out", href: "#" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CreateSubcategory = ({ handleCreateSubcategory }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateSubcategory(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-gray-100 rounded-md shadow-md p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Create Subcategory</h3>
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 rounded-md shadow-md border border-gray-400 focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 rounded-md shadow-md border border-gray-400 focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create
        </button>
      </form>
    </div>
  );
};

const CategoryForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title);
    setTitle("");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform transition hover:-translate-y-1 hover:shadow-lg">
      <form className="flex flex-col md:flex-row" onSubmit={handleSubmit}>
        <div className="flex-grow mb-4 md:mb-0">
          <label htmlFor="title" className="sr-only">
            Category Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Category Title"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="ml-0 md:ml-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

const CategoryCard = ({ title, subcategories, handleOpenModal }) => {
  const handleDeleteSubcategory = (subcategoryIndex) => {
    // handle delete subcategory logic here
  };

  const handleDeleteImage = (subcategoryIndex, imageIndex) => {
    // handle delete image logic here
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform transition hover:-translate-y-1 hover:shadow-lg">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2">
        {subcategories.map((subcategory, subcategoryIndex) => (
          <div
            key={subcategoryIndex}
            className="bg-gray-100 rounded-md shadow-md p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">{subcategory.title}</h3>
              <button
                className="text-gray-500 hover:text-red-500"
                onClick={() => handleDeleteSubcategory(subcategoryIndex)}
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-600">{subcategory.description}</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {subcategory.images.map((image, imageIndex) => (
                <div key={imageIndex} className="relative">
                  <button
                    className="absolute top-0 right-0 p-1 rounded-full bg-white shadow-md hover:bg-red-500 hover:text-white focus:outline-none"
                    onClick={() =>
                      handleDeleteImage(subcategoryIndex, imageIndex)
                    }
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                  <img
                    className="w-full h-48 object-cover rounded-md"
                    src={image.url}
                    alt={subcategory.title}
                  />
                </div>
              ))}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleOpenModal}
              >
                Add Image
              </button>
            </div>
          </div>
        ))}
        <CreateSubcategory />
      </div>
    </div>
  );
};

export default function Example() {
  const categories = [
    {
      title: "Animals",
      subcategories: [
        {
          title: "Cats",
          description: "Cute and cuddly cats",
          images: [
            { url: "https://picsum.photos/id/237/200/300" },
            { url: "https://picsum.photos/id/238/200/300" },
            { url: "https://picsum.photos/id/239/200/300" },
          ],
        },
        {
          title: "Dogs",
          description: "Loyal and friendly dogs",
          images: [
            { url: "https://picsum.photos/id/240/200/300" },
            { url: "https://picsum.photos/id/241/200/300" },
          ],
        },
        {
          title: "Birds",
          description: "Colorful and beautiful birds",
          images: [
            { url: "https://picsum.photos/id/242/200/300" },
            { url: "https://picsum.photos/id/243/200/300" },
            { url: "https://picsum.photos/id/244/200/300" },
            { url: "https://picsum.photos/id/245/200/300" },
            { url: "https://picsum.photos/id/243/200/300" },
            { url: "https://picsum.photos/id/244/200/300" },
            { url: "https://picsum.photos/id/245/200/300" },
          ],
        },
      ],
    },
    {
      title: "Food",
      subcategories: [
        {
          title: "Pizza",
          description: "Delicious and savory pizza",
          images: [
            { url: "https://picsum.photos/id/246/200/300" },
            { url: "https://picsum.photos/id/247/200/300" },
          ],
        },
        {
          title: "Burgers",
          description: "Juicy and tasty burgers",
          images: [
            { url: "https://picsum.photos/id/248/200/300" },
            { url: "https://picsum.photos/id/249/200/300" },
            { url: "https://picsum.photos/id/250/200/300" },
          ],
        },
        {
          title: "Sushi",
          description: "Fresh and flavorful sushi",
          images: [
            { url: "https://picsum.photos/id/251/200/300" },
            { url: "https://picsum.photos/id/252/200/300" },
            { url: "https://picsum.photos/id/253/200/300" },
            { url: "https://picsum.photos/id/254/200/300" },
          ],
        },
      ],
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ImageModal isOpen={isModalOpen} handleCloseModal={handleCloseModal} />
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
            <CategoryForm />
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                subcategories={category.subcategories}
                handleOpenModal={handleOpenModal}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
