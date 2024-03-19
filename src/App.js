// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Pages/Home";
import { Hotel } from "./Components/Pages/Hotel";
import { List } from "./Components/Pages/List";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/hotels" exact element={<List />} />
        <Route path="/hotels/:id" exact element={<Hotel />} />
      </Routes>
    </Router>
  );
}

export default App;
