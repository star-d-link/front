import "./App.css";
import List from "./pages/list.jsx";
import {Route, Routes} from "react-router-dom";

function App() {
  return <>
    <Routes>
      <Route path="/list" element={<List />} />
    </Routes>
  </>;
}

export default App;
