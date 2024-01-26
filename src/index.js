import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import Product from './pages/Product';
import Sale from './pages/Sale';
import ReportBillSale from './pages/ReportBillSale';
import ReportSumSalePerDay from './pages/ReportSumSalePerDay';
import ReportSumSalePerMonth from './pages/ReportSumSalePerMonth';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/changeProfile",
    element: <UserProfile />
  },
  {
    path: "/products",
    element: <Product />
  },
  {
    path: "/sale",
    element: <Sale />
  },
  {
    path: "/reportBillSale",
    element: <ReportBillSale />
  },
  {
    path: "/reportSumSalePerDay",
    element: <ReportSumSalePerDay />
  },
  {
    path: "/reportSumSalePerMonth",
    element: <ReportSumSalePerMonth />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);


reportWebVitals();
