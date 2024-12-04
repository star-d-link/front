import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StudyList from "../components/StudyManagementList.jsx";
import StudyMember from "../components/StudyMember";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../css/SlideAction.css"; // CSS 파일을 별도로 작성

const StudyManagement = () => {
  const [currentStudyId, setCurrentStudyId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBack, setIsBack] = useState(false); // 뒤로가기 여부 상태

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

          {/* 화면 전환 애니메이션 */}
          <TransitionGroup className="transition-wrapper">
            {currentStudyId === null ? (
                <CSSTransition
                    key="study-list"
                    timeout={500}
                    classNames={isBack ? "slide-right" : "slide"}
                    unmountOnExit
                >
                  <StudyList
                      onSelectStudy={(studyId) => {
                        setIsBack(false); // 앞으로 가는 동작
                        setCurrentStudyId(studyId);
                      }}
                  />
                </CSSTransition>
            ) : (
                <CSSTransition
                    key="study-member"
                    timeout={500}
                    classNames={isBack ? "slide-right" : "slide"}
                    unmountOnExit
                >
                  <StudyMember
                      studyId={currentStudyId}
                      goBack={() => {
                        setIsBack(true); // 뒤로 가는 동작
                        setCurrentStudyId(null);
                      }}
                  />
                </CSSTransition>
            )}
          </TransitionGroup>

          {/* Footer */}
          <Footer />
        </div>
      </div>
  );
};

export default StudyManagement;
