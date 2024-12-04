import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StudyList from "../components/StudyManagementList.jsx";
import StudyMember from "../components/StudyMember";

const StudyManagement = () => {
  const [currentStudyId, setCurrentStudyId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 화면 크기에 따라 모바일 여부 확인
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsSidebarOpen(false);
    };

    handleResize(); // 초기 렌더링 시 실행
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <Sidebar
            isMobile={isMobile}
            toggleSidebar={isSidebarOpen}
            setSidebarOpen={setIsSidebarOpen}
        />

        <div className="flex flex-col flex-1">
          {/* Header */}
          <Header isMobile={isMobile} toggleSidebar={setIsSidebarOpen} />

          {/* 메인 콘텐츠 */}
          <div className="p-6 bg-gray-100 min-h-screen">
            {currentStudyId === null ? (
                // 스터디 목록
                <StudyList onSelectStudy={(studyId) => setCurrentStudyId(studyId)} />
            ) : (
                // 멤버 관리
                <StudyMember
                    studyId={currentStudyId}
                    goBack={() => setCurrentStudyId(null)}
                />
            )}
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
  );
};

export default StudyManagement;