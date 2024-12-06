import { Button, Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

const StudyManagementList = ({ onSelectStudy }) => {
  // 임시 데이터: 유저가 관리하는 스터디 목록
  const studies = [
    { id: 1, title: "스터디 1", description: "스터디 1에 대한 설명" },
    { id: 2, title: "스터디 2", description: "스터디 2에 대한 설명" },
    { id: 3, title: "스터디 3", description: "스터디 3에 대한 설명" },
  ];

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-4xl font-bold text-center mb-6">내 스터디 목록</h2>
        <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1">
          {studies.map((study) => (
              <Card key={study.id} className="shadow-md">
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {study.title}
                  </Typography>
                  <Typography color="textSecondary">
                    {study.description}
                  </Typography>
                </CardContent>
                <div className="flex justify-end p-2">
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onSelectStudy(study.id)}
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

StudyManagementList.propTypes = {
  onSelectStudy: PropTypes.func.isRequired,
}

export default StudyManagementList;
