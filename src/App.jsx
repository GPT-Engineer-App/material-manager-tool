import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NavigationHeader from "./components/NavigationHeader";
import Home from "./pages/Home";
import Stores from "./pages/Stores";

function App() {
  return (
    <Router>
      <NavigationHeader />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/materials" element={<Index />} />
        <Route path="/stores" element={<Stores />} />
      </Routes>
    </Router>
  );
}

export default App;
