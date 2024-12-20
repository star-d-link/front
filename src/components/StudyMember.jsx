import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ApiClient from "../auth/apiClient.jsx";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const StudyMember = ({ studyId, goBack, isManaging }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState({
    active: [], // 참여 중인 멤버
    pending: [], // 대기 중인 멤버
  });
  const [currentUserStatus, setCurrentUserStatus] = useState(null); // 현재 사용자 상태
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const navigate = useNavigate();

  // 멤버 데이터 가져오기
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await ApiClient.get(`/study/${studyId}/manage`);
        const { admin, joined, currentUser } = response.data.data;

        // 멤버 분류
        const activeMembers = [
          ...admin,
          ...joined.filter((member) => member.status === "참여중"),
        ];
        const pendingMembers = joined.filter(
            (member) => member.status === "대기중"
        );

        setMembers({
          active: activeMembers,
          pending: pendingMembers,
        });

        // 현재 사용자 상태 설정
        setCurrentUserStatus(currentUser?.status);
      } catch (err) {
        console.error("멤버 목록 불러오기 오류:", err);
        setError("멤버 목록을 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [studyId]);

  // 승인 처리
  const approveMember = async (studyManageId) => {
    try {
      await ApiClient.put(`/study/${studyId}/manage/${studyManageId}/accept`);
      setSnackbar({ open: true, message: "멤버가 승인되었습니다." });

      // 승인 후 상태 업데이트
      setMembers((prev) => {
        const approvedMember = prev.pending.find(
            (member) => member.studyManageId === studyManageId
        );
        return {
          active: [...prev.active, { ...approvedMember, status: "참여중" }],
          pending: prev.pending.filter(
              (member) => member.studyManageId !== studyManageId
          ),
        };
      });
    } catch (err) {
      console.error("멤버 승인 오류:", err);
      setSnackbar({ open: true, message: "멤버 승인에 실패했습니다." });
    }
  };

  // 거절 처리
  const rejectMember = async (studyManageId) => {
    try {
      await ApiClient.delete(`/study/${studyId}/manage/${studyManageId}/reject`);
      setSnackbar({ open: true, message: "멤버가 거절되었습니다." });

      // 거절 후 상태 업데이트
      setMembers((prev) => ({
        ...prev,
        pending: prev.pending.filter(
            (member) => member.studyManageId !== studyManageId
        ),
      }));
    } catch (err) {
      console.error("멤버 거절 오류:", err);
      setSnackbar({ open: true, message: "멤버 거절에 실패했습니다." });
    }
  };

  // 스낵바 닫기
  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "" });
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
          <CircularProgress />
        </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  return (
      <div className="relative p-6 bg-gray-100 min-h-screen">
        {/* 뒤로가기 버튼 */}
        <IconButton
            onClick={goBack}
            style={{
              position: "absolute",
              top: "80px",
              right: "16px",
            }}
        >
          <CloseIcon />
        </IconButton>

        <h2 className="text-4xl font-bold text-center mb-6">스터디 관리</h2>

        {/* 참여 중인 멤버 */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">참여 중인 멤버</h3>
          {members.active.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1">
                {members.active.map((member) => (
                    <Card key={member.studyManageId} className="shadow-md">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          이름: {member.username}
                        </Typography>
                        <Typography color="textSecondary">역할: {member.role}</Typography>
                        <Typography color="textSecondary">상태: {member.status}</Typography>
                      </CardContent>
                    </Card>
                ))}
              </div>
          ) : (
              <div className="text-center text-gray-500">
                참여 중인 멤버가 없습니다.
              </div>
          )}
        </section>

        {/* 대기 중인 멤버 */}
        <section>
          <h3 className="text-2xl font-semibold mb-4">대기 중인 멤버</h3>
          {members.pending.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1">
                {members.pending.map((member) => (
                    <Card key={member.studyManageId} className="shadow-md">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          이름: {member.username}
                        </Typography>
                        <Typography color="textSecondary">역할: {member.role}</Typography>
                        <Typography color="textSecondary">상태: {member.status}</Typography>
                      </CardContent>
                      <CardActions className="flex justify-end">
                        {isManaging && (
                            <>
                              <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => approveMember(member.studyManageId)}
                              >
                                승인
                              </Button>
                              <Button
                                  variant="outlined"
                                  color="secondary"
                                  onClick={() => rejectMember(member.studyManageId)}
                              >
                                거절
                              </Button>
                            </>
                        )}
                        {!isManaging && (
                            <Typography color="textSecondary">
                              대기 중인 멤버를 수정할 권한이 없습니다.
                            </Typography>
                        )}
                      </CardActions>
                    </Card>
                ))}
              </div>
          ) : (
              <div className="text-center text-gray-500">
                대기 중인 멤버가 없습니다.
              </div>
          )}
        </section>

        {currentUserStatus !== "대기중" && (
            <div className="fixed bottom-4 right-4 flex gap-2">
              {/* 스터디 게시판 이동 버튼 */}
              <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`/study/group/${studyId}/list`)}
              >
                스터디 게시판
              </Button>

              {/* 일정 관리 버튼 */}
              <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/study-manage/${studyId}/schedule`)}
              >
                일정 관리
              </Button>
            </div>
        )}

        {/* 스낵바 */}
        <Snackbar
            open={snackbar.open}
            message={snackbar.message}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
        />
      </div>
  );
};

StudyMember.propTypes = {
  studyId: PropTypes.number.isRequired,
  goBack: PropTypes.func.isRequired,
  isManaging: PropTypes.bool.isRequired,
};

export default StudyMember;
