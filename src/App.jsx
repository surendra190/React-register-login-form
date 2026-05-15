import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";
import Home from "./components/Home";
import UncontrolledForm from "./components/UncontrolledForm";
import AllComponentForm from "./components/AllComponentForm";
function App() {
  return (
    <Router>
      <header style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
        <nav style={{ display: "flex", gap: "12px" }}>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/all_ui_components">All UI Components Form</Link>
          <Link to="/uncontrolled">Uncontrolled form </Link>
        </nav>
      </header>

      <main style={{ padding: "16px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/all_ui_components" element={<AllComponentForm />} />
          <Route path="/uncontrolled" element={<UncontrolledForm />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
