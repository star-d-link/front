import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Avatar, IconButton, Chip, Stack, Divider } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StudyDetail = () => {
  const { studyId } = useParams();
  const [study, setStudy] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8080/study/${studyId}`);
        setStudy(response.data.data);
      } catch {
        setError("스터디 정보를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudy();
  }, [studyId]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!study) {
    return <div>스터디 정보를 찾을 수 없습니다.</div>;
  }

  return (
      <Card sx={{ maxWidth: 800, margin: "auto", mt: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {study.title}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Avatar>{study.username.charAt(0).toUpperCase()}</Avatar>
            <Typography variant="body1" color="text.primary">
              {study.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {study.createDate}
            </Typography>
            <IconButton>
              <FavoriteBorderIcon color="action" fontSize="medium" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {study.likesCount || 0}
            </Typography>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" color="text.primary" paragraph>
            {study.content}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            모집 정보
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            모집 여부: {study.isRecruit ? "모집 중" : "모집 완료"}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            지역: {study.region}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            온라인 여부: {study.isOnline ? "온라인" : "오프라인"}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            모집 인원: {study.headCount}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={1}>
            {study.hashtag.split(" ").map((tag, index) => (
                <Chip key={index} label={tag} variant="outlined" />
            ))}
          </Stack>
        </CardContent>
      </Card>
  );
};

export default StudyDetail;
