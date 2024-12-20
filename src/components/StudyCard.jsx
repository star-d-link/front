import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, Typography, Chip, Avatar, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Stack from "@mui/material/Stack";

const StudyCard = ({ study, onClick, className }) => {
  return (
      <Card
          onClick={onClick}
          className={className}
          sx={{ cursor: "pointer", transition: "0.3s", "&:hover": { boxShadow: 6 } }}
      >
        <CardHeader
            avatar={<Avatar sx={{ width: 32, height: 32 }}>{study.username.charAt(0).toUpperCase()}</Avatar>}
            title={
              <Typography variant="body1" color="text.primary">
                {study.username}
              </Typography>
            }
            action={
              <Stack direction="row" alignItems="center" spacing={1} sx={{ alignItems: "center" }}>
                <IconButton>
                  <FavoriteBorderIcon color="action" fontSize="small" />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {study.likesCount}
                </Typography>
              </Stack>
            }
        />
        <CardContent sx={{ paddingTop: 1 }}>
          <Typography variant="subtitle1" component="div" gutterBottom fontWeight="bold">
            {study.title}
          </Typography>
          {/* HTML 콘텐츠 렌더링 */}
          <Typography
              variant="body2"
              color="text.secondary"
              dangerouslySetInnerHTML={{
                __html: study.content.length > 100
                    ? `${study.content.substring(0, 100)}...`
                    : study.content,
              }}
          />
          {study.hashtag && study.hashtag.trim() !== "" && (
              <div>
                {study.hashtag.split(" ").map((tag, index) => (
                    <Chip key={index} label={tag} variant="outlined" size="small" sx={{ margin: "2px" }} />
                ))}
              </div>
          )}

        </CardContent>
      </Card>
  );
};

// PropTypes 정의
StudyCard.propTypes = {
  study: PropTypes.shape({
    username: PropTypes.string.isRequired,
    likesCount: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    hashtag: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default StudyCard;
