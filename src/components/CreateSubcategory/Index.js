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
        <div className="flex flex-col">
          <div className="mb-2">
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full h-8 p-1 text-xs rounded-md shadow-sm border border-gray-400 focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div className="mb-1">
            <textarea
              id="description"
              name="description"
              rows="1"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full h-11 p-1 text-xs rounded-md shadow-sm border border-gray-400 focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
            ></textarea>
          </div>
          <div className="flex-grow"></div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-2 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateSubcategory;
