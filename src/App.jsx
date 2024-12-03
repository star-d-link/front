import List from "./pages/list.jsx";
import StudyDetail from "./pages/StudyDetail.jsx";
import DetailedSearch from "./pages/DetailedSearch.jsx";
import StudyCreate from './pages/StudyCreate';
import CourseReviewForm from "./component/course/Course";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import StudyMember from "./pages/StudyMember.jsx";

function App() {
  return (
    <Routes>
      <Route path="/study-member" element={<StudyMember />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/list" element={<List />} />
      <Route path="/study/:studyId" element={<StudyDetail />} />
      <Route path="/detailed-search" element={<DetailedSearch />} />
      <Route path="/study-create" element={<StudyCreate />} />
      <Route path="/course-review-form" element={<CourseReviewForm />} />
    </Routes>
  );
}

export default App;
