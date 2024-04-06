import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./Routes/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Inputform from "./Routes/Inputvpn/Inputform";
import "./apps.css";
import Searchbar from "./Components/searchBar/Searchbar";
import CSVDownload from "./Routes/Reports/CSVDownload";

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Searchbar />} />
        {/* <Route path="search" element={<Searchbar />} /> */}
        <Route path="addvpn" element={<Inputform />} />
        <Route path="reports" element={<CSVDownload />} />
      </Routes>
    </>
  );
};

// const root = createRoot(document.getElementById("root"));

// root.render(<App />);

export default App;
