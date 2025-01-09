import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoList from "./View/Gallery/photoList";
import PhotoDetails from "./View/Gallery/photoDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhotoList />} />
        <Route path="/photo-gallery/details/:id" element={<PhotoDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
