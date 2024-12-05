import List from "./pages/list.jsx";
import StudyDetail from "./pages/StudyDetail.jsx";
import DetailedSearch from "./pages/DetailedSearch.jsx";
import StudyCreate from "./pages/StudyCreate";
import CourseReviewForm from "./component/course/Course";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import CourseDetail from "./component/course/CourseDetail.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/list" element={<List />} />
      <Route path="/study/:studyId" element={<StudyDetail />} />
      <Route path="/detailed-search" element={<DetailedSearch />} />
      <Route path="/study-create" element={<StudyCreate />} />
      <Route path="/course-detail" element={<CourseDetail />} />
      <Route path="/course-review-form" element={<CourseReviewForm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
