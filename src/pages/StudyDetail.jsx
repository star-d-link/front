import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiClient from "../auth/apiClient";
import { Card, CardContent, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StudyHeader from "../components/StudyDetailHeader";
import StudyContent from "../components/StudyDetailContent";
import StudyInfo from "../components/StudyDetailInfo";
import Studytag from "../components/StudyDetailTag";

import Header from "../components/Header";
import KakaoMap from "../components/KakaoMap.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

const StudyDetail = () => {
  const { studyId } = useParams();
  const { user } = useAuth(); // 현재 로그인 사용자 정보
  const [study, setStudy] = useState(null);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 화면 크기에 따라 모바일 여부 확인
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 스터디 정보 가져오기
  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const response = await ApiClient.get(`/study/${studyId}`);
        setStudy(response.data.data);
        setIsLiked(response.data.data.isLiked); // 좋아요 상태 설정
      } catch (error) {
        console.error("스터디 정보를 가져오는 중 오류 발생:", error);
        setError("스터디 정보를 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchStudy();
  }, [studyId]);

  // 좋아요 기능
  const handleLike = async () => {
    try {
      const response = isLiked
          ? await ApiClient.delete(`/study/${studyId}/like`)
          : await ApiClient.post(`/study/${studyId}/like`);

      if (response.status === 200) {
        setIsLiked(!isLiked);
        setStudy((prev) => ({
          ...prev,
          likesCount: isLiked ? prev.likesCount - 1 : prev.likesCount + 1,
        }));
      }
    } catch (error) {
      console.error("좋아요 기능 처리 중 오류 발생:", error);
    }
  };

  // 스터디 신청 기능
  const handleApply = async () => {
    try {
      const response = await ApiClient.post(`/study/${studyId}/apply`);
      if (response.status === 200) {
        alert("스터디에 성공적으로 신청되었습니다.");
      }
    } catch (error) {
      console.error("스터디 신청 중 오류 발생:", error);
    }
  };

  // 수정 및 삭제 핸들러
  const handleEdit = () => {
    navigate(`/study-edit/${studyId}`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await ApiClient.delete(`/study/${studyId}`);
        alert("스터디가 삭제되었습니다.");
        navigate("/list");
      } catch (error) {
        alert("스터디 삭제 중 문제가 발생했습니다.");
        console.error("삭제 중 오류 발생:", error);
      }
    }
  };

  const isOwner = user && study && user.username === study.username;

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!study) {
    return <div className="text-center">스터디 정보를 불러오는 중입니다...</div>;
  }

  return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="flex flex-col flex-1">
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
            {isOwner && (
                <div className="flex gap-4 justify-center mt-4">
                  <Button variant="outlined" color="primary" onClick={handleEdit}>
                    수정
                  </Button>
                  <Button variant="contained" color="secondary" onClick={handleDelete}>
                    삭제
                  </Button>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default StudyDetail;