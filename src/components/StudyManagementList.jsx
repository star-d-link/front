import { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ApiClient from "../auth/apiClient";

const StudyList = ({ onSelectStudy }) => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await ApiClient.get("/study/admin/list"); // 관리 스터디 목록 API 호출
        setStudies(response.data.data || []); // 데이터 업데이트
      } catch (err) {
        console.error("스터디 목록을 가져오는 중 오류 발생:", err);
        setError("스터디 목록을 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-4xl font-bold text-center mb-6">내 스터디 목록</h2>
        <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1">
          {studies.map((study) => (
              <Card key={study.studyId} className="shadow-md">
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {study.title}
                  </Typography>
                  <Typography color="textSecondary">
                    {study.region}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    생성일: {study.createDate}
                  </Typography>
                </CardContent>
                <div className="flex justify-end p-2">
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onSelectStudy(study.studyId)}
                  >
                    관리하기
                  </Button>
                </div>
              </Card>
          ))}
        </div>
      </div>
  );
};

StudyList.propTypes = {
  onSelectStudy: PropTypes.func.isRequired,
};

export default StudyList;