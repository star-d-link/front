import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiClient from "../auth/apiClient";
import { Card, CardContent, Button, CircularProgress, Snackbar } from "@mui/material";
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
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const response = await ApiClient.get(`/study/${studyId}`);
        setStudy(response.data.data);
        setIsLiked(response.data.data.isLiked);
      } catch (error) {
        console.error("스터디 정보를 가져오는 중 오류 발생:", error);
        setError("스터디 정보를 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchStudy();
  }, [studyId]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await ApiClient.get(`/study/${studyId}/like/status`);
        setIsLiked(response.data.data);
      } catch (error) {
        console.error("좋아요 상태 조회 중 오류 발생:", error);
      }
    };

    if (user) {
      fetchLikeStatus();
    }
  }, [studyId, user]);

  const handleLikeToggle = async () => {
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
        setSnackbar({
          open: true,
          message: isLiked ? "좋아요를 취소했습니다." : "좋아요를 눌렀습니다.",
        });
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
      setSnackbar({ open: true, message: "좋아요 처리에 실패했습니다." });
    }
  };

  const handleApply = async () => {
    try {
      const response = await ApiClient.post(`/study/${studyId}/apply`);
      if (response.status === 200) {
        setSnackbar({ open: true, message: "스터디에 성공적으로 신청되었습니다." });
      }
    } catch (error) {
      console.error("스터디 신청 중 오류 발생:", error);
      setSnackbar({ open: true, message: "스터디 신청에 실패했습니다." });
    }
  };

  // 스터디 모집 완료 처리 핸들러
  const handleCompleteRecruitment = async () => {
    try {
      const response = await ApiClient.put(`/study/${studyId}/complete`);
      if (response.status === 200) {
        setStudy((prev) => ({ ...prev, isRecruit: false }));
        setSnackbar({ open: true, message: "스터디 모집이 완료되었습니다." });
      }
    } catch (error) {
      console.error("스터디 모집 완료 처리 중 오류 발생:", error);
      setSnackbar({ open: true, message: "스터디 모집 완료에 실패했습니다." });
    }
  };

  const handleEdit = () => navigate(`/study-edit/${studyId}`);
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await ApiClient.delete(`/study/${studyId}`);
        setSnackbar({ open: true, message: "스터디가 삭제되었습니다." });
        navigate("/list");
      } catch (error) {
        setSnackbar({ open: true, message: "스터디 삭제에 실패했습니다." });
        console.error("스터디 삭제 중 오류 발생:", error);
      }
    }
  };

  const handleSnackbarClose = () => setSnackbar({ open: false, message: "" });

  const isOwner = user && study && user.username === study.username;

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!study) {
    return (
        <div className="text-center mt-4">
          <CircularProgress />
        </div>
    );
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
                      onClick={handleLikeToggle}
                      className="text-red-500"
                      startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  >
                    {study.likesCount}
                  </Button>
                </div>
                <StudyContent title={study.title} content={study.content} />
                <div className="mt-6">
                  <Studytag hashtag={study.hashtag} />
                </div>
                {!study.isOnline && (
                    <KakaoMap latitude={study.latitude} longitude={study.longitude} />
                )}

                <div className="flex gap-4 justify-center mt-4">
                  <Button variant="contained" color="primary" onClick={handleApply}>
                    스터디 신청
                  </Button>
                  {isOwner && study.isRecruit && (
                      <Button variant="contained" color="secondary" onClick={handleCompleteRecruitment}>
                        스터디 모집 완료
                      </Button>
                  )}
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

        <Snackbar
            open={snackbar.open}
            message={snackbar.message}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
        />
      </div>
  );
};

export default StudyDetail;
