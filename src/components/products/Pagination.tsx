import React, { useState , Fragment } from "react";
import { useSelector } from "react-redux";
import { PaginationProps } from "../../interfaces/props/pagination/Pagination";
import { RootState } from "../../interfaces/RootStateI";

const Pagination: React.FC<PaginationProps> = (props) => {
  const totalPages = useSelector(
    (state: RootState) => state.displayProduct.totalPages
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    props.handlePageClick(pageNumber);
  };

  const renderPageNumbers = (): JSX.Element[] => {
    const maxButtons = 3;
    const startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
    const endPage = Math.min(startPage + maxButtons - 1, totalPages);

    const pageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => {
        const pageNumber = startPage + index;
        return (
          <li
            key={pageNumber}
            className={`page-item ${
              currentPage === pageNumber ? "active" : ""
            }`}
            onClick={() => handlePageClick(pageNumber)}
          >
            <span className="page-link">{pageNumber}</span>
          </li>
        );
      }
    );

    return pageNumbers;
  };

  return (
    <Fragment>
      <ul className="pagination justify-content-center">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          <span className="page-link">Previous</span>
        </li>
        {renderPageNumbers()}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          <span className="page-link">Next</span>
        </li>
      </ul>
    </Fragment>
  );
};

export default Pagination;
