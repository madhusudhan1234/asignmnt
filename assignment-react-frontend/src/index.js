import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/dashboard/Index";
import Home from "./pages/home/Index";
import Login from "./pages/login/Index";
import Product from "./pages/product/Index";
import Subscribe from "./pages/subscribe/Index";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/products/:productid",
    Component: Product,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/subscribe",
    Component: Subscribe,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
