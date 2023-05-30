import React, { useState } from "react";

const InlineForm = ({ handleCreateProduct }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleCreateProduct(formValues, () => {
      setFormValues({ name: "", price: "", description: "" });
    });
  };

  return (
    <div className="mx-auto mt-10">
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Create a Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-1/2 px-3 mb-4">
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md text-sm"
                placeholder="Name"
                required
              />
            </div>

            <div className="w-1/2 px-3 mb-4">
              <input
                type="text"
                id="price"
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md text-sm"
                placeholder="Price"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md text-sm"
              placeholder="Description"
              required
            />
          </div>

          <div className="flex justify-end px-3 mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InlineForm;
