// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { SelectedConversationProvider } from './context/selectedConversationContext'; 
import { AuthContextProvider } from './context/AuthContext'; 
import { SocketContextProvider } from './context/SocketContext'; 
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';

function App() {
  return (
   
    <AuthContextProvider> 
      <SelectedConversationProvider> 
        <SocketContextProvider> 
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </Router>
        </SocketContextProvider>
      </SelectedConversationProvider>
    </AuthContextProvider>
  );
}

export default App;
