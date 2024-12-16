import { Stack, Chip } from "@mui/material";
import PropTypes from "prop-types";

const StudyDetailInfo = ({ isRecruit, region, isOnline, headCount }) => (
    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
      {isRecruit ? (
          <Chip label="모집 중" color="success" />
      ) : (
          <Chip label="모집 완료" color="default" />
      )}
      {isOnline ? (
          <Chip label="온라인" color="primary" />
      ) : (
          <Chip label="오프라인" color="secondary" />
      )}
      {!isOnline && <Chip label={`${region}`} variant="outlined" />} {/* 오프라인일 때만 지역 표시 */}
      <Chip label={` ${headCount}명`} variant="outlined" />
    </Stack>
);

StudyDetailInfo.propTypes = {
  isRecruit: PropTypes.bool.isRequired,
  region: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
  headCount: PropTypes.number.isRequired,
};

export default StudyDetailInfo;
