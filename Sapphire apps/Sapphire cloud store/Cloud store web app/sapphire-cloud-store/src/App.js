import React from "react";
import { SnackBar } from "./controls/snackBar/SnackBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

//pages
import { Authentication } from "./pages/authentication/Authentication";
import { Home } from "./pages/home/Home";
import "./App.scss";

function App() {
  return (
    <div className="app-container">
      <Provider store={store}>
        <SnackBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
