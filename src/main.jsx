import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import { Provider } from "react-redux"; // Import Provider
import store from "./state/store/store"; //
// import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
// import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
// import "popper.js";
import "flatpickr/dist/themes/airbnb.css"; // Choose a Flatpickr theme
// import "jquery/dist/jquery.min.js"; // Import jQuery
import "bootstrap/dist/js/bootstrap.min.js"; // Import Bootstrap JavaScript

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path={"/*"} element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
