import {Chip, Divider, Stack} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const StudyDetailTag = ({ hashtag }) => {
    const navigate = useNavigate();

    const handleTagClick = (tag) => {
        navigate(`/detailed-search?hashtag=${encodeURIComponent(tag)}`);
    };

    return (
        <>
            <Stack direction="row" spacing={1}>
                {hashtag.split(" ").map((tag, index) => (
                    <Chip
                        key={index}
                        label={tag}
                        variant="outlined"
                        clickable
                        onClick={() => handleTagClick(tag)}
                    />
                ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
        </>
    );
};
StudyDetailTag.propTypes = {
    hashtag: PropTypes.string.isRequired,
};

export default StudyDetailTag;
