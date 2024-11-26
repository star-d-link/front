import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(totalPages, currentPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // 항상 첫 페이지와 마지막 페이지를 표시하도록 추가
    if (startPage > 2) {
      pageNumbers.unshift("...");
    }
    if (startPage > 1) {
      pageNumbers.unshift(1);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }
    if (endPage < totalPages) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
      <div className="flex justify-center">
        <button
            className=""
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
        >
          이전
        </button>
        {getPageNumbers().map((page, index) => (
            <button
                key={index}
                className={`${
                    currentPage === page
                        ? "font-bold"
                        : ""
                }`}
                onClick={() => typeof page === "number" && onPageChange(page)}
                disabled={page === "..."}
            >
              {page}
            </button>
        ))}
        <button
            className=""
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
