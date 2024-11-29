import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";

const Home = () => {
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
        <MainContent />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
