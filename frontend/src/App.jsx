// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LandingPage from "./Pages/LandingPage";
import ProfilePage from "./Pages/ProfilePage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import AddProduct from "./Pages/AddProduct";
import MyListings from "./Pages/MyListings";
import MyPurchases from "./Pages/MyPurchases";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Public routes - redirect to home if authenticated */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        
        {/* Protected routes - redirect to login if not authenticated */}
        <Route path="/home" element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/product" element={
          <ProtectedRoute>
            <ProductPage />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        } />
        
        {/* Catch all route - redirect to home if authenticated, else to login */}
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/mylistings" element={<MyListings />} />
        <Route path="/mypurchases" element={<MyPurchases />} />
      </Routes>
    </Router>
  );
}

export default App;