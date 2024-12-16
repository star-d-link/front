import { Avatar, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const StudyDetailHeader = ({ username, createDate }) => (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
      <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
      <Typography variant="body1" color="text.primary">
        {username}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {createDate}
      </Typography>
    </Stack>
);
StudyDetailHeader.propTypes = {
  username: PropTypes.string.isRequired,
  createDate: PropTypes.string.isRequired,
};

export default StudyDetailHeader;
