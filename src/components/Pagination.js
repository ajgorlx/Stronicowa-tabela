import React from "react";

const Pagination = ({ tagsPerPage, totalTags, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTags / tagsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={() => paginate(currentPage - 1)}
          >
            <span aria-hidden="true">
              &laquo;
            </span>
            <span class="visually-hidden">Previous</span>
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className={`page-link ${
              currentPage === Math.ceil(totalTags / tagsPerPage)
                ? "disabled"
                : ""
            }`}
            href="#"
            aria-label="Next"
            onClick={() => paginate(currentPage + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="visually-hidden">Next</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
