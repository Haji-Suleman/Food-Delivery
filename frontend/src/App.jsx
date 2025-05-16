import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import { ToastContainer } from "react-toastify";
import Verify from "./pages/Verify/Verify.jsx";
import MyOrder from "./pages/MyOrders/MyOrder.jsx";
import { Route, Routes } from "react-router-dom";
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrder />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;