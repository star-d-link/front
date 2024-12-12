import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ApiClient from "../auth/apiClient";
import { Button, Card, CardContent, CardActions, Typography, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StudyMember = ({ studyId, goBack }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studyTitle, setStudyTitle] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await ApiClient.get(`/study/${studyId}/manage`);
        setMembers(response.data.data || []); // 멤버 데이터를 리스트로 저장
        setStudyTitle(response.data.studyTitle || `스터디 ${studyId}`); // 스터디 제목 설정
      } catch (err) {
        console.error("스터디 멤버를 가져오는 중 오류 발생:", err);
        setError("스터디 멤버를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [studyId]);

  // 멤버 승인
  const approveMember = async (memberId) => {
    try {
      await ApiClient.put(`/study/${studyId}/manage/${memberId}/accept`);
      setMembers((prevMembers) =>
          prevMembers.map((member) =>
              member.studyManageId === memberId ? { ...member, status: "참여중" } : member
          )
      );
    } catch (err) {
      console.error("멤버 승인 중 오류 발생:", err);
      setError("멤버 승인 중 문제가 발생했습니다.");
    }
  };

  // 멤버 거절
  const rejectMember = async (memberId) => {
    try {
      await ApiClient.delete(`/study/${studyId}/members/${memberId}/reject`);
      setMembers((prevMembers) => prevMembers.filter((member) => member.studyManageId !== memberId));
    } catch (err) {
      console.error("멤버 거절 중 오류 발생:", err);
      setError("멤버 거절 중 문제가 발생했습니다.");
    }
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
              top: "16px",
              right: "16px",
            }}
        >
          <CloseIcon />
        </IconButton>

        <h2 className="text-4xl font-bold text-center mb-6">{studyTitle}</h2>

        {/* 승인 대기 중인 멤버 */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">승인 대기 중인 멤버</h3>
          {members.filter((member) => member.status === "대기중").length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1">
                {members
                .filter((member) => member.status === "대기중")
                .map((member) => (
                    <Card key={member.studyManageId} className="shadow-md">
                      <CardContent>
                        <Typography variant="h6" component="div" gutterBottom>
                          이름: {member.username}
                        </Typography>
                        <Typography color="textSecondary">
                          역할: {member.role}
                        </Typography>
                        <Typography color="textSecondary">
                          상태: {member.status}
                        </Typography>
                      </CardContent>
                      <CardActions className="flex justify-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => approveMember(member.username)}
                        >
                          승인
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => rejectMember(member.username)}
                            className="ml-2"
                        >
                          거절
                        </Button>
                      </CardActions>
                    </Card>
                ))}
              </div>
          ) : (
              <div className="text-center text-gray-500">승인 대기 중인 멤버가 없습니다.</div>
          )}
        </section>

        {/* 참여중인 멤버 */}
        <section>
          <h3 className="text-2xl font-semibold mb-4">참여중인 멤버</h3>
          {members.filter((member) => member.status === "참여중").length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1">
                {members
                .filter((member) => member.status === "참여중")
                .map((member) => (
                    <Card key={member.studyManageId} className="shadow-md">
                      <CardContent>
                        <Typography variant="h6" component="div" gutterBottom>
                          이름: {member.username}
                        </Typography>
                        <Typography color="textSecondary">
                          역할: {member.role}
                        </Typography>
                        <Typography color="textSecondary">
                          상태: {member.status}
                        </Typography>
                      </CardContent>
                    </Card>
                ))}
              </div>
          ) : (
              <div className="text-center text-gray-500">참여중인 멤버가 없습니다.</div>
          )}
        </section>
      </div>
  );
};

StudyMember.propTypes = {
  studyId: PropTypes.number.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default StudyMember;
