import { Chip, Stack } from "@mui/material";
import PropTypes from "prop-types";

const StudyDetailTag = ({ hashtag }) => (
    <Stack direction="row" spacing={1}>
      {hashtag.split(" ").map((tag, index) => (
          <Chip key={index} label={tag} variant="outlined" />
      ))}
    </Stack>
);

StudyDetailTag.propTypes = {
    hashtag: PropTypes.string.isRequired,
};

export default StudyDetailTag;
