import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../src/hooks/AuthContext';
import Navbar from './components/navbar';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { CreateHome } from './pages/addhome';
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home-create" element={<CreateHome/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
