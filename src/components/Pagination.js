import classnames from "classnames";
import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  function handleClick(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    onPageChange(pageNumber);
  }

  return (
    <nav className="flex justify-center">
      <ul className="flex items-center">
        <li className={classnames("mx-1", { "opacity-50": isFirstPage })}>
          <button
            className="px-3 py-1 rounded-lg border border-gray-400 hover:bg-gray-200 focus:outline-none"
            disabled={isFirstPage}
            onClick={() => handleClick(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className="mx-1">
            <button
              className={classnames(
                "px-3 py-1 rounded-lg border border-gray-400 hover:bg-gray-200 focus:outline-none",
                { "bg-gray-300": pageNumber === currentPage }
              )}
              onClick={() => handleClick(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li className={classnames("mx-1", { "opacity-50": isLastPage })}>
          <button
            className="px-3 py-1 rounded-lg border border-gray-400 hover:bg-gray-200 focus:outline-none"
            disabled={isLastPage}
            onClick={() => handleClick(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
