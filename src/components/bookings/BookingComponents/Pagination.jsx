import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxPagesToShow = 10; // Maximum number of page links to display
  const pages = [];

  // Calculate the range of pages to display
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Adjust startPage if endPage is at the totalPages limit
  if (endPage === totalPages) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Generate page numbers
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination pagination-sm justify-content-center mt-4">
        {/* First Page Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to="#"
            onClick={() => onPageChange(1)}
            aria-label="First"
          >
            <span aria-hidden="true">««</span>
          </Link>
        </li>

        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to="#"
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            aria-label="Previous"
          >
            <span aria-hidden="true">« Prev</span>
          </Link>
        </li>

        {/* Page Numbers */}
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
          >
            <Link
              className="page-link"
              to="#"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Link>
          </li>
        ))}

        {/* Next Button */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to="#"
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            aria-label="Next"
          >
            <span aria-hidden="true">Next »</span>
          </Link>
        </li>

        {/* Last Page Button */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to="#"
            onClick={() => onPageChange(totalPages)}
            aria-label="Last"
          >
            <span aria-hidden="true">»»</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;