import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

//pages
import { Authentication } from "./pages/authentication/Authentication";
import "./App.scss";

function App() {
  return (
    <div className="app-container">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authentication />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
