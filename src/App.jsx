import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="materials" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
