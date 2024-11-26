import { useEffect, useState } from "react";
import axios from "axios";
import StudyCard from "../components/StudyCard";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [studies, setStudies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const pageSize = 10;
  const navigate = useNavigate();

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

  const handleCardClick = (studyId) => {
    navigate(`/study/${studyId}`);
  };

  return (
      <div className="">
        <h1 className="text-2xl font-bold text-center">스터디 목록</h1>
        <div className="">
          {studies.length > 0 ? (
              studies.map((study) => (
                  <StudyCard key={study.studyId} study={study} onClick={() => handleCardClick(study.studyId)}/> // StudyCard 컴포넌트 사용
              ))
          ) : (
              <div>스터디 목록이 없습니다.</div>
          )}
        </div>

        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
        />
      </div>
  );
};

export default List;