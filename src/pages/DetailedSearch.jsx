import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import StudyCard from "../components/StudyCard";
import Pagination from "../components/Pagination.jsx";

const DetailedSearch = () => {
  const [studies, setStudies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  ;

  useEffect(() => {
    const fetchStudies = async () => {
      const params = new URLSearchParams(location.search);
      const hashtag = params.get("hashtag");

      if (!hashtag) {
        setError("해시태그가 제공되지 않았습니다.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/study/detailed-search", {
          params: {
            hashtag,
            page: 0,
            size: 10,
            sort: "studyId,DESC",
          },
        });
        setTotalPages(response.data.data.totalPages || 1);
        setStudies(response.data.data.content || []);
      } catch {
        setError("검색 결과를 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchStudies();
  }, [location.search]);

  if (error) {
    return <div>{error}</div>;
  }

  const handleCardClick = (studyId) => {
    navigate(`/study/${studyId}`);
  };


  return (
      <div className="bg-gray-100 min-h-screen p-4">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">스터디 목록</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.length > 0 ? (
              studies.map((study) => (
                  <StudyCard
                      key={study.studyId}
                      study={study}
                      onClick={() => handleCardClick(study.studyId)}
                      className="cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  />
              ))
          ) : (
              <div className="col-span-full text-center text-gray-600">스터디 목록이
                없습니다.</div>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                const params = new URLSearchParams(location.search);
                params.set("page", page);
                setCurrentPage(page);
                navigate(`/list?${params.toString()}`);
              }}
          />
        </div>
      </div>
  );
};

export default DetailedSearch;
