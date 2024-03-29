import React from "react";
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Interest from "./pages/Interest"
import SignUp from "./pages/SignUp"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from 'react-cookie'
import "./App.css";

function App() {
  const [ cookies ] = useCookies(['user'])

  const authToken = cookies.AuthToken
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home /> } /> 
          { authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
          { authToken && <Route path="/signup" element={<SignUp /> } /> }
          <Route path="/interests" element={<Interest /> } /> 
        </Routes>
      </BrowserRouter>
  );
}

export default App;
