import { Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";


const StudyDetailContent = ({ title, content }) => {
  const sanitizedContent = DOMPurify.sanitize(content); // HTML Sanitization

  return (
      <>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography
            variant="body1"
            color="text.primary"
            component="div"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            style={{
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
            }}
        />
        <Divider sx={{ my: 2 }} />
      </>
  );
};

StudyDetailContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};



StudyDetailContent.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default StudyDetailContent;
