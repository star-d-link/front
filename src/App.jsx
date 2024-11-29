import List from "./pages/list.jsx";
import StudyDetail from "./pages/StudyDetail.jsx";
import DetailedSearch from "./pages/DetailedSearch.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/list" element={<List />} />
      <Route path="/study/:studyId" element={<StudyDetail />} />
      <Route path="/detailed-search" element={<DetailedSearch />} />
    </Routes>
  );
}

export default App;
