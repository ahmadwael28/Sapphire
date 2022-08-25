import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages
import { Authentication } from "./pages/authentication/Authentication";

import "./App.scss";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
