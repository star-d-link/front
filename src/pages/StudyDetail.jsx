import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@mui/material";
import StudyHeader from "../components/StudyDetailHeader";
import StudyContent from "../components/StudyDetailContent";
import StudyInfo from "../components/StudyDetailInfo";
import Studytag from "../components/StudyDetailTag";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import KakaoMap from "../components/KakaoMap.jsx";

const StudyDetail = () => {
  const { studyId } = useParams();
  const [study, setStudy] = useState(null);
  const [error, setError] = useState(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    const fetchStudy = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/study/${studyId}`);
        setStudy(response.data.data);
      } catch {
        setError("스터디 정보를 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchStudy();
  }, [studyId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!study) {
    return <div>스터디 정보를 찾을 수 없습니다.</div>;
  }

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
          <Header isMobile={isMobile} toggleSidebar={setIsSidebarOpen}/>
          <div className="bg-gray-100 min-h-screen p-4">
            <Card sx={{maxWidth: 800, margin: "auto", mt: 4, p: 2}}>
              <CardContent>
                <StudyInfo isRecruit={study.isRecruit} region={study.region}
                           isOnline={study.isOnline}
                           headCount={study.headCount}/>
                <StudyHeader username={study.username}
                             createDate={study.createDate}
                             likesCount={study.likesCount}/>
                <StudyContent title={study.title} content={study.content}/>
                <Studytag hashtag={study.hashtag}/>
                {!study.isOnline && (<KakaoMap />)}
              </CardContent>
            </Card>
          </div>
          <Footer/>
        </div>
      </div>
  );
};

export default StudyDetail;
