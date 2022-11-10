import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import Header from "./components/header";
import Footer from "./components/footer";
import RecordList from "./components/customer/index";
import CustomerForm from "./components/customer/form";

const App = () => {
  return (
      <div>
        <Header />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<RecordList />} />
          <Route exact path="/customer/form" element={<CustomerForm />} />
        </Routes>
        <Footer />
      </div>
  );
};

export default App;