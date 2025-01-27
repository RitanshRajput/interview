import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import FormBuilder from "./components/formBuilder";
import InfiniteScrolling from "./components/InfiniteScrolling";
import WeatherApp from "./components/Weather";
import BuggyCode from "./components/BuggyCode";

function App() {
  return (
    <Router>
      <nav className="w-full h-[80px] flex justify-around items-center bg-blue-400 text-white text-md font-semibold">
        <a href="/">Home</a>
        <a href="/formBuilder">FormBuilder</a>
        <a href="/infinite">Virtualizedlist</a>
        <a href="/weather">Weather</a>
        <a href="/buggy">buggycode</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formBuilder" element={<FormBuilder />} />
        <Route path="/infinite" element={<InfiniteScrolling />} />
        <Route path="/weather" element={<WeatherApp />} />
        <Route path="/buggy" element={<BuggyCode />} />
      </Routes>
    </Router>
  );
}

export default App;
