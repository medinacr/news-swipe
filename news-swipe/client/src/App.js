import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Interest from "./pages/Interest"
import SignUp from "./pages/SignUp"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TinderCards from "./components/TinderCards";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home /> } /> 
          <Route path="/dashboard" element={<Dashboard /> } /> 
          <Route path="/signup" element={<SignUp /> } /> 
          <Route path="/interests" element={<Interest /> } /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
