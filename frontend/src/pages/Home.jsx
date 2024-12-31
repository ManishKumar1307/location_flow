import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Register from '../components/Register';
import AddressList from '../components/AddressList';
import AddAddress from '../components/AddAddress';
import Login from '../components/Login';
import Navbar from '../components/navbar/Navbar';
import LandingPage from './LandingPage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addresses" element={<AddressList />} />
          <Route path="/add-address" element={<AddAddress />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
