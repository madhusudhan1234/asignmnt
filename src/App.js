import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import ImageService from "./services/ImageService";

function App() {
  const [title, setTitle] = useState("");
  const [searchText, setSearchText] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState({});

  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    pageSize: 4,
  });

  useEffect(() => {
    fetchImages({
      page: paginationInfo.page,
      pageSize: paginationInfo.pageSize,
    });
  }, [paginationInfo]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);

    fetchImages({
      page: searchText ? 1 : paginationInfo.page,
      pageSize: paginationInfo.pageSize,
      search: searchText ? `%${value.toLowerCase()}%` : null,
    });
  };

  const fetchImages = async (params) => {
    try {
      const res = await ImageService.get(params);

      setImages(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setPreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const res = await ImageService.create(formData);

      await fetchImages({
        page: paginationInfo.page,
        pageSize: paginationInfo.pageSize,
        new: res.data.id,
      });

      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Image Catalog
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Add new Image with details
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about Image.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>
                {preview && (
                  <img
                    src={preview}
                    alt="Image preview"
                    className="mt-4 rounded-lg"
                  />
                )}
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              List of Images
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
                value={searchText}
                onChange={handleSearch}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.314 14.686a8 8 0 111.414-1.414l4.292 4.292a1 1 0 01-1.414 1.414l-4.292-4.292zm-5.5 0a3.5 3.5 0 11-6.245-2.255A3.5 3.5 0 019.814 7.88a3.501 3.501 0 015.246 0 3.5 3.5 0 01-2.246 6.546z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {images && images.data && images.data.length < 1 && (
              <p className="text-lg text-gray-800 leading-6 mb-4 border-l-4 border-blue-500 pl-2">
                No Images Found! Please add some
              </p>
            )}
            {images?.data?.map((image) => (
              <div key={image.id} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">{image.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {images?.paginationInfo && images?.paginationInfo.totalItems > 1 && (
            <Pagination
              currentPage={images.paginationInfo.currentPage}
              totalPages={images.paginationInfo.pages}
              onPageChange={(pageNumber) =>
                setPaginationInfo({
                  page: pageNumber,
                  pageSize: paginationInfo.pageSize,
                })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
