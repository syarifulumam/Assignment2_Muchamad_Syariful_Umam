import "./App.css";
import Detail from "./Detail.jsx";
import Home from "./Home.jsx";
import Layout from "./Layout.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/detail/:nameCountry" element={<Detail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
