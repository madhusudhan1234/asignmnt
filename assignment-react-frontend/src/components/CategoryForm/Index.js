import { useState } from "react";

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

export default CategoryForm;
