import { useEffect, useState } from "react";
import axios from "axios";
import StudyCard from "../components/StudyCard";
import Pagination from "../components/Pagination";
import { useNavigate, useLocation } from "react-router-dom";

const List = () => {
  const [studies, setStudies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const pageSize = 10;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const page = params.get("page") || 1;
        const isOnline = params.get("isOnline");
        const isRecruit = params.get("isRecruit");

        const requestParams = {
          page: page - 1,
          size: pageSize,
          sort: "studyId,DESC",
        };
        if (isOnline !== null) {
          requestParams.isOnline = isOnline;
        }
        if (isRecruit !== null) {
          requestParams.isRecruit = isRecruit;
        }

        const response = await axios.get("http://localhost:8080/study/list", { params: requestParams });
        setStudies(response.data.data.content || []);
        setTotalPages(response.data.data.totalPages || 1);
      } catch {
        setError("스터디 목록을 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchStudies().catch((e) => {
      console.error("스터디 데이터를 가져오는 중 오류 발생:", e);
    });
  }, [location.search]);


  if (error) {
    return <div>{error}</div>;
  }

  const handleCardClick = (studyId) => {
    navigate(`/study/${studyId}`);
  };

  const handleFilterChange = (filterType, value) => {
    const params = new URLSearchParams(location.search);
    if (filterType === "isOnline") {
      if (value === "all") {
        params.delete("isOnline");
      } else {
        params.set("isOnline", value);
      }
    } else if (filterType === "isRecruit") {
      if (value === "all") {
        params.delete("isRecruit");
      } else {
        params.set("isRecruit", value);
      }
    }
    params.set("page", 0);
    navigate(`/list?${params.toString()}`);
  };

  return (

      <div className="">
        <h1 className="text-2xl font-bold text-center">스터디 목록</h1>
        <div className="flex justify-center gap-4 mb-4">
          <div>
            <label htmlFor="isOnlineFilter">온라인 여부: </label>
            <select
                id="isOnlineFilter"
                value={new URLSearchParams(location.search).get("isOnline") || "all"}
                onChange={(e) => handleFilterChange("isOnline", e.target.value === "" ? "all" : e.target.value === "true" ? "true" : "false")}
            >
              <option value="all">전체</option>
              <option value="true">온라인</option>
              <option value="false">오프라인</option>
            </select>
          </div>
          <div>
            <label htmlFor="isRecruitFilter">모집 여부: </label>
            <select
                id="isRecruitFilter"
                value={new URLSearchParams(location.search).get("isRecruit")
                    || "all"}
                onChange={(e) => handleFilterChange("isRecruit",
                    e.target.value === "" ? "all" : e.target.value === "true"
                        ? "true" : "false")}
            >
              <option value="all">전체</option>
              <option value="true">모집 중</option>
              <option value="false">모집 완료</option>
            </select>
          </div>
        </div>
        <div className="">
          {studies.length > 0 ? (
              studies.map((study) => (
                  <StudyCard key={study.studyId} study={study}
                             onClick={() => handleCardClick(study.studyId)}/> // StudyCard 컴포넌트 사용
              ))
          ) : (
              <div>스터디 목록이 없습니다.</div>
          )}
        </div>

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
  );
};

export default List;