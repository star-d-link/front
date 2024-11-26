import PropTypes from "prop-types";

const StudyCard = ({ study }) => {
  return (
      <div key={study.studyId} className="">
        <h2 className="font-bold">{study.title}</h2>
        <p className="">작성자: {study.username}</p>
        <p className="">지역: {study.region}</p>
        <p className="">모집 중: {study.isRecruit ? "예" : "아니오"}</p>
        <p className="">온라인 여부: {study.isOnline ? "온라인" : "오프라인"}</p>
        <p className="">생성일: {study.createDate}</p>
      </div>
  );
};

// PropTypes 정의
StudyCard.propTypes = {
  study: PropTypes.shape({
    studyId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    region: PropTypes.string,
    isRecruit: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool.isRequired,
    createDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default StudyCard;