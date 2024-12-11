import List from "./pages/list.jsx";
import StudyDetail from "./pages/StudyDetail.jsx";
import DetailedSearch from "./pages/DetailedSearch.jsx";
import StudyCreate from "./pages/StudyCreate";
import StudyEdit from "./pages/StudyEdit.jsx";
import CourseReviewForm from "./component/course/Course";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import StudyManagement from "./pages/StudyManagement.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import CourseDetail from "./component/course/CourseDetail.jsx";
import StudySchedule from "./pages/StudySchedule.jsx";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/study-schedule" element={<StudySchedule />} />
        <Route path="/study-manage" element={<StudyManagement />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<List />} />
        <Route path="/study/:studyId" element={<StudyDetail />} />
        <Route path="/detailed-search" element={<DetailedSearch />} />
        <Route path="/study-create" element={<StudyCreate />} />
        <Route path="/study-edit/:studyId" element={<StudyEdit />} />
        <Route path="/course-detail" element={<CourseDetail />} />
        <Route path="/course-review-form" element={<CourseReviewForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
