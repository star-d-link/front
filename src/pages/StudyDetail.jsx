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
  const { user } = useAuth();
  const [study, setStudy] = useState(null);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
        const response = await ApiClient.get(
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
          ? await ApiClient.delete(`http://localhost:8080/study/${studyId}/like`)
          : await ApiClient.post(`http://localhost:8080/study/${studyId}/like`);
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
      const response = await ApiClient.post(
          `http://localhost:8080/study/${studyId}/apply`
      );
      if (response.status === 200) {
        alert("스터디에 성공적으로 신청되었습니다.");
      }
    } catch (e) {
      console.error("스터디 신청 중 문제가 발생했습니다.", e);
    }
  };

  const isOwner = user && study && user.username === study.username;

  console.log("현재 사용자:", user ? user.username : "로그인되지 않음");
  console.log("작성자:", study ? study.username : "데이터 로딩 중");


  const handleEdit = () => {
    navigate(`/study-edit/${studyId}`); // 수정 페이지로 이동
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await ApiClient.delete(`/study/${studyId}`);
        alert("스터디가 삭제되었습니다.");
        navigate("/list"); // 삭제 후 목록 페이지로 이동
      } catch {
        alert("스터디 삭제 중 문제가 발생했습니다.");
      }
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
            {isOwner && (
                <div className="flex gap-4">
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
