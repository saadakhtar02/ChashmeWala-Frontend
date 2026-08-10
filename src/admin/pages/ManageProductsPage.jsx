import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { AnimatePresence } from 'framer-motion';
import API_BASE_URL, { getImageUrl } from '../../config/api';

function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formMode, setFormMode] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/getProduct`);
      const formatted = res.data.map((p) => ({
        ...p,
        image: getImageUrl(p.image)
      }));
      setProducts(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateProduct = async (formData) => {
    if (!selectedProduct) return;
    try {
      await axios.put(`${API_BASE_URL}/admin/product/${selectedProduct._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchProducts();
      setFormMode(null);
      setSelectedProduct(null);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/product/${productToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchProducts();
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleEditClick = (prod) => {
    setSelectedProduct(prod);
    setFormMode('edit');
  };

  const handleDeleteClick = (prod) => {
    setProductToDelete(prod);
    setShowDeleteModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto w-full font-sans">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 font-sans">
          <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">
            Fetching catalog products...
          </p>
        </div>
      ) : formMode === 'edit' ? (
        <ProductForm
          product={selectedProduct}
          onSave={handleUpdateProduct}
          onCancel={() => {
            setFormMode(null);
            setSelectedProduct(null);
          }}
        />
      ) : (
        <ProductTable
          products={products}
          onEdit={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      )}

      <AnimatePresence>
        {showDeleteModal && productToDelete && (
          <DeleteConfirmModal
            productName={productToDelete.productName}
            onConfirm={handleDeleteProduct}
            onCancel={() => {
              setShowDeleteModal(false);
              setProductToDelete(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default ManageProductsPage;
