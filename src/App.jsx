import List from "./pages/list.jsx";
import StudyDetail from "./pages/StudyDetail.jsx";
import DetailedSearch from "./pages/DetailedSearch.jsx";
import StudyCreate from "./pages/StudyCreate";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import StudyManagement from "./pages/StudyManagement.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import CourseDetail from "./component/course/CourseDetail.jsx";
import StudyBoardForm from "./component/course/StudyBoard.jsx";

import CourseReviewForm from "./component/course/Course";

function App() {
  return (
    <Routes>
      <Route path="/study-manage" element={<StudyManagement />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/list" element={<List />} />
      <Route path="/study/:studyId" element={<StudyDetail />} />
      <Route path="/detailed-search" element={<DetailedSearch />} />
      <Route path="/study-create" element={<StudyCreate />} />
      <Route path="/course-detail" element={<CourseDetail />} />
      <Route path="/study/:studyId/board" element={<StudyBoardForm />} />
    
      <Route path="/courseReview/create" element={<CourseReviewForm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
