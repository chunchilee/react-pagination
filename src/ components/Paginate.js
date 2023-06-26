import React from "react";

const Paginate = ({
  postsPerPage,
  totalPosts,
  paginate,
  previousPage,
  nextPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPagination = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        className="page-number"
        onClick={() => {
          paginate(number);
        }}
      >
        {number}
      </li>
    );
  });

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li onClick={previousPage} className="page-number">Prev</li>
        {renderPagination}
      <li onClick={nextPage} className="page-number">Next</li>
      </ul>
    </div>
  );
};

export default Paginate;
