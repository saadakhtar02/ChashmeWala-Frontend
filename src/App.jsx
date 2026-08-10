import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './home/Home';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import ManageProductsPage from './admin/pages/ManageProductsPage';
import AddProductPage from './admin/pages/AddProductPage';
import HeroManagementPage from './admin/pages/HeroManagementPage';
import AddNewHeroPage from './admin/pages/AddNewHeroPage';
import AdminLayout from './admin/components/AdminLayout';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/AdminDashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="ManageProducts" element={<ManageProductsPage />} />
            <Route path="AddProduct" element={<AddProductPage />} />
            <Route path="HeroManagement" element={<HeroManagementPage />} />
            <Route path="AddHero" element={<AddNewHeroPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router >
  );
}

export default App;
