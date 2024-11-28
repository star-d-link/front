import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@mui/material";
import StudyHeader from "../components/StudyDetailHeader";
import StudyContent from "../components/StudyDetailContent";
import StudyInfo from "../components/StudyDetailInfo";
import StudyTag from "../components/StudyDetailTag";

const StudyDetail = () => {
  const { studyId } = useParams();
  const [study, setStudy] = useState(null);
  const [error, setError] = useState(null);

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
      <Card sx={{ maxWidth: 800, margin: "auto", mt: 4, p: 2 }}>
        <CardContent>
          <StudyInfo isRecruit={study.isRecruit} region={study.region} isOnline={study.isOnline} headCount={study.headCount} />
          <StudyHeader username={study.username} createDate={study.createDate} likesCount={study.likesCount} />
          <StudyContent title={study.title} content={study.content} />
          <StudyTag hashtag={study.hashtag} />
        </CardContent>
      </Card>
  );
};

export default StudyDetail;
