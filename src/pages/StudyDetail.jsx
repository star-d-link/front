import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StudyHeader from "../components/StudyDetailHeader";
import StudyContent from "../components/StudyDetailContent";
import StudyInfo from "../components/StudyDetailInfo";
import Studytag from "../components/StudyDetailTag";

import Header from "../components/Header";
import Footer from "../components/Footer";
import KakaoMap from "../components/KakaoMap.jsx";

const StudyDetail = () => {
  const { studyId } = useParams();
  const [study, setStudy] = useState(null);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

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
        const response = await axios.get(
            `http://localhost:8080/study/${studyId}`
        );
        setStudy(response.data.data);
        setIsLiked(response.data.data.isLiked); // 좋아요 상태 설정
      } catch {
        setError("스터디 정보를 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchStudy();
  }, [studyId]);

  // 좋아요
  const handleLike = async () => {
    try {
      const response = isLiked
          ? await axios.delete(`http://localhost:8080/study/${studyId}/like`)
          : await axios.post(`http://localhost:8080/study/${studyId}/like`);
      if (response.status === 200) {
        setIsLiked(!isLiked);
      }
    } catch (e) {
      console.error("좋아요 기능에 문제가 발생했습니다.", e);
    }
  };
  // 스터디 신청
  const handleApply = async () => {
    try {
      const response = await axios.post(
          `http://localhost:8080/study/${studyId}/apply`
      );
      if (response.status === 200) {
        alert("스터디에 성공적으로 신청되었습니다.");
      }
    } catch (e) {
      console.error("스터디 신청 중 문제가 발생했습니다.", e);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!study) {
    return <div>스터디 정보를 찾을 수 없습니다.</div>;
  }

  return (
      <div className="flex flex-col md:flex-row min-h-screen">

        <div className="flex flex-col flex-1">
          {/* Header */}
          <Header isMobile={isMobile} toggleSidebar={setIsSidebarOpen} />
          <div className="bg-gray-100 min-h-screen p-4">
            <Card className="max-w-2xl mx-auto mt-4 p-4">
              <CardContent>
                <StudyInfo
                    isRecruit={study.isRecruit}
                    region={study.region}
                    isOnline={study.isOnline}
                    headCount={study.headCount}
                />
                <StudyHeader
                    username={study.username}
                    createDate={study.createDate}
                    likesCount={study.likesCount}
                />
                <div className="flex items-center justify-between my-2">
                  <Button
                      onClick={handleLike}
                      className="text-red-500"
                      startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  >
                    {study.likesCount}
                  </Button>
                </div>
                <StudyContent title={study.title} content={study.content} />
                <Studytag hashtag={study.hashtag} />
                {!study.isOnline && (
                    <KakaoMap latitude={study.latitude} longitude={study.longitude} />
                )}
                <div className="text-center mt-4">
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={handleApply}
                  >
                    스터디 신청
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <Footer />
        </div>
      </div>
  );
};

export default StudyDetail;
