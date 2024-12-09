import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StudyList from "../components/StudyManagementList.jsx";
import StudyMember from "../components/StudyMember";
import { motion, AnimatePresence } from "framer-motion";


const StudyManagement = () => {
  const [currentStudyId, setCurrentStudyId] = useState(null); // 선택된 Study ID
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 슬라이드 애니메이션 정의
  const memberVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.5 } },
  };

  return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="flex flex-col flex-1">
          <Header isMobile={isMobile} toggleSidebar={setIsSidebarOpen} />

          <div className="relative flex-1 bg-gray-100 p-6">
            <StudyList onSelectStudy={(studyId) => setCurrentStudyId(studyId)} />

            <AnimatePresence>
              {currentStudyId !== null && (
                  <motion.div
                      className="absolute top-0 left-0 w-full bg-white z-40"
                      variants={memberVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                  >
                    <StudyMember
                        studyId={currentStudyId}
                        goBack={() => setCurrentStudyId(null)} // StudyMember 비활성화
                    />
                  </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Footer />
        </div>
      </div>
  );
};

export default StudyManagement;
