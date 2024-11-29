import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PropTypes from "prop-types";

const StudyDetailHeader = ({ username, createDate, likesCount }) => (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
      <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
      <Typography variant="body1" color="text.primary">
        {username}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {createDate}
      </Typography>
      <IconButton>
        <FavoriteBorderIcon color="action" fontSize="medium" />
      </IconButton>
      <Typography variant="body2" color="text.secondary">
        {likesCount || 0}
      </Typography>
    </Stack>
);
StudyDetailHeader.propTypes = {
  username: PropTypes.string.isRequired,
  createDate: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
};

export default StudyDetailHeader;
