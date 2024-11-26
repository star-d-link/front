import { useEffect, useState } from "react";
import axios from "axios";
import StudyCard from "../components/StudyCard";

const List = () => {
  const [studies, setStudies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const pageSize = 10;


  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const params = {
          page: currentPage - 1,
          size: pageSize,
          sort: "createDate,DESC",
        };

        const response = await axios.get("http://localhost:8080/study/list", { params });
        setStudies(response.data.data.content || []);
        setTotalPages(response.data.data.totalPages || 1);
      } catch {
        setError("스터디 목록을 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchStudies().catch((e) => {
      console.error("스터디 데이터를 가져오는 중 오류 발생:", e);
    });
  }, [currentPage]);


  if (error) {
    return <div>{error}</div>;
  }

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
      <div className="">
        <h1 className="text-2xl font-bold text-center">스터디 목록</h1>
        <div className="">
          {studies.length > 0 ? (
              studies.map((study) => (
                  <StudyCard key={study.studyId} study={study}/> // StudyCard 컴포넌트 사용
              ))
          ) : (
              <div>스터디 목록이 없습니다.</div>
          )}
        </div>

        <div className="flex justify-center">
          <button
              className=""
              onClick={() => handlePageChange(currentPage - 1)}
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
                  onClick={() => typeof page === "number" && handlePageChange(page)}
                  disabled={page === "..."}
              >
                {page}
              </button>
          ))}
          <button
              className=""
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      </div>
  );
};

export default List;