import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Interest from "./pages/Interest"
import SignUp from "./pages/SignUp"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from 'react-cookie'
import TinderCards from "./components/TinderCards";
import "./App.css";

function App() {
  const [ cookies, setCookie, removeCookie ] = useCookies(['user'])

  const authToken = cookies.AuthToken
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home /> } /> 
          { authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
          { authToken && <Route path="/signup" element={<SignUp /> } /> }
          <Route path="/interests" element={<Interest /> } /> 
        </Routes>
      </BrowserRouter>
  );
}

export default App;
