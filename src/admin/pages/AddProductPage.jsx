import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/api';

function AddProductPage() {
  const navigate = useNavigate();

  const handleSaveProduct = (formData) => {
    axios.post(`${API_BASE_URL}/admin/createProduct`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(() => navigate('/AdminDashboard'))
      .catch((error) => alert(error.response?.data?.message || error.message));
  };

  return (
    <div className="max-w-7xl mx-auto w-full font-sans">
      <ProductForm
        product={null}
        onSave={handleSaveProduct}
      />
    </div>
  );
}

export default AddProductPage;
