import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

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

export default CreateSubcategory;
