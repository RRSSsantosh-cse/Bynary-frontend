import logo from './logo.svg';
import './App.css';
import Login from "./components/login";
import Display from "./components/Display"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admindisplay from "./components/Admindisplay"
import Detail from "./components/Detail";
import Detaile from "./components/Detaile"; 
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/display" element={<Display />} />
      <Route path="/admin" element={<Admindisplay />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/detaile/:id" element={<Detaile/>} />
   
    </Routes>
  </Router>
  );
}

export default App;
