import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/inventario" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;
