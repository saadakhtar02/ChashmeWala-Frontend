import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiTrash2 } from 'react-icons/fi';

function DeleteConfirmModal({ productName, onConfirm, onCancel }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm font-sans"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="w-full max-w-md bg-white border border-gray-200/80 rounded-2xl shadow-2xl p-6 relative overflow-hidden"
      >
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-red-500/10 rounded-full blur-xl" />

        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl shrink-0">
            <FiAlertTriangle className="w-6 h-6" />
          </div>

          <div className="text-left flex-grow">
            <h3 className="text-lg font-outfit font-bold text-gray-900 mb-2">
              Confirm Product Removal
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 font-sans">
              Are you sure you want to delete <span className="text-gray-900 font-semibold">"{productName}"</span>? This action is permanent and cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200/80 pt-4 mt-2 font-sans">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 rounded text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-semibold flex items-center gap-2 shadow-lg shadow-red-500/10 active:scale-95 transition-all cursor-pointer font-outfit"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
            <span>Confirm Delete</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default DeleteConfirmModal;
