import React from "react";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import AddTodo from "./components/AddTodo/AddTodo";
import { Route, Routes, Navigate } from "react-router-dom";
import ViewTodo from "./components/ViewTodo/ViewTodo";
import HeroSection from "./components/HeroSection/HeroSection";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-todo" element={<AddTodo />} />
        <Route path="/todos" element={<ViewTodo />} />
      </Routes>
    </div>
  );
};

export default App;
