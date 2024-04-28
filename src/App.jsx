import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NavigationHeader from './components/NavigationHeader';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <NavigationHeader />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/materials" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
