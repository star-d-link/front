import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const studyPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
      <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => onPageChange(page)}
            siblingCount={2}
            shape="circular"
            color="standard"
        />
      </Stack>
  );
};

export default studyPagination;
