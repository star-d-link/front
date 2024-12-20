import { useEffect, useState } from "react";
import ApiClient from "../auth/ApiClient";
import StudyCard from "../components/StudyCard";
import Pagination from "../components/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";

const List = () => {
  const [studies, setStudies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const pageSize = 10;
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 화면 크기에 따라 모바일 여부 확인
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsSidebarOpen(false); // 데스크톱으로 전환 시 Sidebar 닫기
    };

    handleResize(); // 초기 렌더링 시 실행
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

        const response = await ApiClient.get("/study/list", {
          params: requestParams,
        });
        setStudies(response.data.data.content || []);
        setTotalPages(response.data.data.totalPages || 1);
      } catch (error) {
        console.error("스터디 데이터를 가져오는 중 오류 발생:", error);
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

  const handleCreateStudy = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 리다이렉트
      return;
    }
    navigate("/study-create"); // 인증이 되어 있다면 스터디 생성 페이지로 이동
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header isMobile={isMobile} toggleSidebar={setIsSidebarOpen} />
        <div className="bg-gray-100 min-h-screen p-4">
          <h1 className="text-2xl font-extrabold text-gray-800 mb-8">
            스터디 목록
          </h1>
          <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <label
                htmlFor="isOnlineFilter"
                className="font-medium text-gray-700"
              >
                온라인 여부:
              </label>
              <select
                id="isOnlineFilter"
                value={
                  new URLSearchParams(location.search).get("isOnline") || "all"
                }
                onChange={(e) =>
                  handleFilterChange(
                    "isOnline",
                    e.target.value === ""
                      ? "all"
                      : e.target.value === "true"
                      ? "true"
                      : "false"
                  )
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체</option>
                <option value="true">온라인</option>
                <option value="false">오프라인</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="isRecruitFilter"
                className="font-medium text-gray-700"
              >
                모집 여부:
              </label>
              <select
                id="isRecruitFilter"
                value={
                  new URLSearchParams(location.search).get("isRecruit") || "all"
                }
                onChange={(e) =>
                  handleFilterChange(
                    "isRecruit",
                    e.target.value === ""
                      ? "all"
                      : e.target.value === "true"
                      ? "true"
                      : "false"
                  )
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체</option>
                <option value="true">모집 중</option>
                <option value="false">모집 완료</option>
              </select>
            </div>
          </div>
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
              <div className="col-span-full text-center text-gray-600">
                스터디 목록이 없습니다.
              </div>
            )}
          </div>

          <button
            onClick={handleCreateStudy}
            className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          >
            스터디 생성
          </button>
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
      </div>
    </div>
  );
};

export default List;
