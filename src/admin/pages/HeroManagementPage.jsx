import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeroTable from '../components/HeroTable';
import HeroForm from '../components/HeroForm';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { AnimatePresence } from 'framer-motion';

function HeroManagementPage() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formMode, setFormMode] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [heroToDelete, setHeroToDelete] = useState(null);

  const navigate = useNavigate();

  const fetchHeroes = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://chashme-wala-backend.vercel.app/api/admin/getHero');
      const formatted = res.data.map((h) => ({
        ...h,
        image: h.image && h.image.startsWith('/uploads') ? `http://localhost:5000${h.image}` : h.image
      }));
      setHeroes(formatted);
    } catch (err) {
      console.error('Error fetching heroes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleUpdateHero = async (formData) => {
    if (!selectedHero) return;
    try {
      await axios.put(`https://chashme-wala-backend.vercel.app/api/admin/hero/${selectedHero._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchHeroes();
      setFormMode(null);
      setSelectedHero(null);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleDeleteHero = async () => {
    if (!heroToDelete) return;
    try {
      await axios.delete(`https://chashme-wala-backend.vercel.app/api/admin/hero/${heroToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchHeroes();
      setShowDeleteModal(false);
      setHeroToDelete(null);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleEditClick = (hero) => {
    setSelectedHero(hero);
    setFormMode('edit');
  };

  const handleDeleteClick = (hero) => {
    setHeroToDelete(hero);
    setShowDeleteModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto w-full font-sans">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 font-sans">
          <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">
            Fetching hero section slides...
          </p>
        </div>
      ) : formMode === 'edit' ? (
        <HeroForm
          hero={selectedHero}
          onSave={handleUpdateHero}
          onCancel={() => {
            setFormMode(null);
            setSelectedHero(null);
          }}
        />
      ) : (
        <HeroTable
          heroes={heroes}
          onEdit={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      )}

      <AnimatePresence>
        {showDeleteModal && heroToDelete && (
          <DeleteConfirmModal
            productName={heroToDelete.title || 'Hero Banner'}
            onConfirm={handleDeleteHero}
            onCancel={() => {
              setShowDeleteModal(false);
              setHeroToDelete(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroManagementPage;
