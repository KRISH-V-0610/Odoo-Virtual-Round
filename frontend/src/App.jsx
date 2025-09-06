import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LandingPage from "./Pages/LandingPage";
import ProfilePage from "./Pages/ProfilePage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import AddProduct from "./Pages/AddProduct";
import MyListings from "./Pages/MyListings";
import MyPurchases from "./Pages/MyPurchases";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/mylistings" element={<MyListings />} />
        <Route path="/mypurchases" element={<MyPurchases />} />
      </Routes>
    </Router>
  );
}

export default App;