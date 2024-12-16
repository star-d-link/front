import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const StudyList = ({ studies, onSelectStudy }) => {
  return (
      <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1">
        {studies.map((study) => (
            <Card key={study.studyId} className="shadow-md">
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {study.title}
                </Typography>
                <Typography color="textSecondary">{study.region}</Typography>
                <Typography variant="body2" color="textSecondary">
                  생성일: {study.createDate}
                </Typography>
              </CardContent>
              <div className="flex justify-end p-2">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onSelectStudy(study)}
                >
                  관리하기
                </Button>
              </div>
            </Card>
        ))}
      </div>
  );
};

StudyList.propTypes = {
  studies: PropTypes.array.isRequired,
  onSelectStudy: PropTypes.func.isRequired,
};

export default StudyList;
