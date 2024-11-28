import "./App.css";
import List from "./pages/list.jsx";
import StudyDetail from "./pages/StudyDetail.jsx"
import {Route, Routes} from "react-router-dom";

function App() {
  return <>
    <Routes>
      <Route path="/list" element={<List />} />
      <Route path="/study/:studyId" element={<StudyDetail />} />
    </Routes>
  </>;
}

export default App;
