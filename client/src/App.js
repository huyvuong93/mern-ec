import './App.css';
import {Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Index";
import React, {useContext} from "react";
import {AuthContext} from "./contexts/AuthContext";
import {Navigate} from "react-router";
import ProductDetail from "./pages/product/ProductDetail";

function App() {
  const {currentUser, isLoading} = useContext(AuthContext);
  if(isLoading) return <div>Loading...</div>
  return (
    <div className="m-0">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/auth/login" element={currentUser ? <Navigate to="/me" /> : <Login/>} />
        <Route path="/auth/register" element={currentUser ? <Navigate to="/me" /> : <Register/>} />
        <Route path="/me" element={currentUser ? <Profile/> : <Navigate to="/auth/login" /> } />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
