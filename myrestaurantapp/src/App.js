import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import MenuList from "./Components/MenuList"; 
import ReservationForm from "./Components/ReservationForm";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<MenuList />} />
          <Route path="/reservation" element={<ReservationForm />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
