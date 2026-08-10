import React, { useEffect } from 'react';
import axios from 'axios';
import HeroForm from '../components/HeroForm';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/api';

function AddNewHeroPage() {
  const navigate = useNavigate();

  const handleSaveHero = async (formData) => {
    try {
      await axios.post(`${API_BASE_URL}/admin/createHero`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Hero Section created successfully!');
      navigate('/AdminDashboard/HeroManagement');
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full font-sans">
      <HeroForm
        hero={null}
        onSave={handleSaveHero}
      />
    </div>
  );
}

export default AddNewHeroPage;
