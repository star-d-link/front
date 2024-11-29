import "./App.css";
import List from "./pages/list.jsx";
import StudyDetail from "./pages/StudyDetail.jsx"
import {Route, Routes} from "react-router-dom";
import DetailedSearch from "./pages/DetailedSearch.jsx";

function App() {
  return <>
    <Routes>
      <Route path="/list" element={<List />} />
      <Route path="/study/:studyId" element={<StudyDetail />} />
      <Route path="/detailed-search" element={<DetailedSearch />} />
    </Routes>
  </>;
}

export default App;
