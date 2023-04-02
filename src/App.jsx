import { useState, useEffect } from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import supabase from "./supabase/client";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
