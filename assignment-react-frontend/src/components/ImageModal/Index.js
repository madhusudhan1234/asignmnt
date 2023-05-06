import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Modal from "../Modal/Index";

const ImageModal = ({ isOpen, handleImageUpload, handleCloseModal }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleModalClose = () => {
    setSelectedFiles(null);
    handleCloseModal();
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleImageSubmit = () => {
    handleImageUpload(selectedFiles);
    handleModalClose();
  };

  const previewImages = () => {
    if (!selectedFiles) {
      return null;
    }

    const handleRemoveFile = (index) => {
      setSelectedFiles((prevSelectedFiles) => {
        const updatedFiles = [...prevSelectedFiles];
        updatedFiles.splice(index, 1);
        return updatedFiles;
      });
    };

    return (
      <div className="mt-4">
        {selectedFiles &&
          Array.from(selectedFiles).map((file, index) => (
            <div
              key={index}
              className="relative w-full h-48 rounded-md overflow-hidden mb-4"
            >
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
              />
              <button
                className="absolute top-0 right-0 p-2 rounded-full bg-white shadow-md hover:bg-red-500 hover:text-white focus:outline-none"
                onClick={() => handleRemoveFile(index)}
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Upload Images</h2>
          <div className="relative border-2 border-dashed border-gray-400 rounded-lg p-8 flex flex-col items-center justify-center mb-4">
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="absolute h-full w-full opacity-0 cursor-pointer"
            />
            <PlusIcon className="h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Drag and drop your images here, or click to select files.
            </p>
          </div>
          {previewImages()}
          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={handleImageSubmit}
            >
              Upload
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleModalClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
