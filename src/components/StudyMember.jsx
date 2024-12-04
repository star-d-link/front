import { useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const StudyMember = ({ studyId, goBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studyTitle, setStudyTitle] = useState(`스터디 ${studyId} 제목`);

  // 초기 멤버 데이터 설정
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
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-4xl font-bold text-center mb-6">{studyTitle}</h2>
        <Button
            variant="outlined"
            color="primary"
            onClick={goBack}
            className="mb-4"
        >
          뒤로가기
        </Button>

        {/* 멤버 관리 UI */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">승인 대기 중인 멤버</h3>
          {members.filter((member) => member.status === '신청중').length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1">
                {members
                .filter((member) => member.status === '신청중')
                .map((member) => (
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
                      </CardActions>
                    </Card>
                ))}
              </div>
          ) : (
              <div className="text-center text-gray-500">승인 대기 중인 멤버가 없습니다.</div>
          )}
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">참여중인 멤버</h3>
          {members.filter((member) => member.status === '참여중').length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1">
                {members
                .filter((member) => member.status === '참여중')
                .map((member) => (
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

export default StudyMember;