import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import IdeaDetails from "./pages/IdeaDetails";

import "./App.css";

const App = () => {
  const [savedApplications, setSavedApplications] = useState([]);
  const [profiles, setProfiles] = useState([]);

  // Custom component to conditionally render Navbar
  const MainLayout = ({ children }) => {
    const location = useLocation();
    const hideNavbar = location.pathname === "/" || location.pathname === "/signup";

    return (
      <>
        {!hideNavbar && <Navbar />}
        {children}
      </>
    );
  };

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard profiles={profiles} setSavedApplications={setSavedApplications} />} />
          <Route path="/idea/:id" element={<IdeaDetails />} />
          <Route path="/browse-ideas" element={<Dashboard profiles={profiles} setSavedApplications={setSavedApplications} />} />
          <Route path="/my-applications" element={<Applications savedApplications={savedApplications} />} />
          <Route path="/profile" element={<Profile setProfiles={setProfiles} />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
