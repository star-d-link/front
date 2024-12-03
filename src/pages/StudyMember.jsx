import { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StudyMember = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [members, setMembers] = useState([
    {
      studyManageId: 1,
      user: { username: 'user1' },
      role: '멤버',
      status: '신청중',
    },
    {
      studyManageId: 2,
      user: { username: 'user2' },
      role: '관리자',
      status: '참여중',
    },
    {
      studyManageId: 3,
      user: { username: 'user3' },
      role: '멤버',
      status: '신청중',
    },
    {
      studyManageId: 4,
      user: { username: 'user4' },
      role: '멤버',
      status: '참여중',
    },
  ]);

  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // 스터디 멤버 승인 함수 (로컬 데이터만 수정)
  const approveMember = (memberId) => {
    setMembers((prevMembers) =>
        prevMembers.map((member) =>
            member.studyManageId === memberId
                ? { ...member, status: '참여중' }
                : member
        )
    );
  };

  // 스터디 멤버 거절 함수 (로컬 데이터만 수정)
  const rejectMember = (memberId) => {
    setMembers((prevMembers) =>
        prevMembers.filter((member) => member.studyManageId !== memberId)
    );
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
          <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-6">스터디 멤버 관리</h2>
            {members.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1">
                  {members.map((member) => (
                      <Card key={member.studyManageId} className="shadow-md">
                        <CardContent>
                          <Typography variant="h6" component="div" gutterBottom>
                            이름: {member.user.username}
                          </Typography>
                          <Typography color="textSecondary">
                            역할: {member.role}
                          </Typography>
                          <Typography color="textSecondary">
                            상태: {member.status}
                          </Typography>
                        </CardContent>
                        <CardActions className="flex justify-end">
                          {member.status === "신청중" && (
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
                                    className="ml-2"
                                >
                                  거절
                                </Button>
                              </>
                          )}
                        </CardActions>
                      </Card>
                  ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-4">스터디 멤버가 없습니다.</div>
            )}
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </div>
  );
};

export default StudyMember;