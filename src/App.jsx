import React, { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
import "./App.css";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <h1>React Form</h1>
      <RegisterForm />
      <LoginForm />
    </>
  );
}

export default App;
