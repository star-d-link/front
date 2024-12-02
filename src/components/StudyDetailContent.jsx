import { Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";

const StudyDetailContent = ({ title, content }) => (
    <>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.primary" paragraph>
        {content}
      </Typography>
      <Divider sx={{ my: 2 }} />
    </>
);

StudyDetailContent.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default StudyDetailContent;
