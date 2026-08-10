import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ITEMS_PER_PAGE = 6;

function ProductTable({ products, onEdit, onDeleteClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      prod.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [products, totalPages, currentPage]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative min-w-[280px]">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search catalog by title, brand, or specs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 focus:border-gold rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none transition-colors font-sans shadow-xs"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-200 focus:border-gold rounded-xl text-xs font-semibold text-gray-700 focus:outline-none transition-colors cursor-pointer font-sans shadow-xs"
          >
            <option value="All">All Categories</option>
            <option value="Men">Men Eyewear</option>
            <option value="Women">Women Eyewear</option>
            <option value="Kids">Kids Eyewear</option>
          </select>
        </div>

        <div className="text-xs font-semibold text-gray-500 font-sans">
          Total Products: <span className="font-extrabold text-gray-900 font-outfit">{filteredProducts.length}</span>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs font-sans">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200/80 bg-gray-50/60 font-outfit">
                <th className="py-3.5 px-3 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest w-14">Image</th>
                <th className="py-3.5 px-3.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest min-w-[180px]">Product Details</th>
                <th className="py-3.5 px-3.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest whitespace-nowrap">Category</th>
                <th className="py-3.5 px-3.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest whitespace-nowrap">Original Price</th>
                <th className="py-3.5 px-3.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest whitespace-nowrap">Discount</th>
                <th className="py-3.5 px-3.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest whitespace-nowrap">Final Price</th>
                <th className="py-3.5 px-3.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest whitespace-nowrap">Stock Status</th>
                <th className="py-3.5 px-3.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-gray-400 text-xs font-semibold">
                    No matching products found in catalog.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((prod) => {
                  const fullImagePath = prod.image;

                  return (
                    <tr key={prod._id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-gray-100 shadow-2xs">
                          <img
                            src={fullImagePath}
                            alt={prod.productName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=150&q=80";
                            }}
                          />
                        </div>
                      </td>

                      <td className="py-2.5 px-3.5">
                        <div>
                          <div className="font-extrabold text-gray-900 text-sm line-clamp-1 font-outfit">
                            {prod.productName}
                          </div>
                          <div className="text-[10px] text-amber-600 uppercase font-bold tracking-wider mt-0.5 font-outfit">
                            {prod.brand}
                          </div>
                        </div>
                      </td>

                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md border border-gray-200/60">
                          {prod.category}
                        </span>
                      </td>

                      <td className="py-2.5 px-3.5 font-outfit text-xs text-gray-500 font-medium whitespace-nowrap">
                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                      </td>

                      <td className="py-2.5 px-3.5 font-outfit text-xs text-amber-600 font-bold whitespace-nowrap">
                        {prod.discount > 0 ? `${prod.discount}%` : '-'}
                      </td>

                      <td className="py-2.5 px-3.5 font-outfit text-sm text-gray-900 font-black whitespace-nowrap">
                        ₹{prod.finalPrice.toLocaleString('en-IN')}
                      </td>

                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        {prod.stock === 0 ? (
                          <span className="inline-flex items-center text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-red-50 text-red-600 border border-red-200/60 rounded-full whitespace-nowrap">
                            Sold Out
                          </span>
                        ) : prod.stock <= 10 ? (
                          <span className="inline-flex items-center text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-full whitespace-nowrap">
                            Low ({prod.stock} units)
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full whitespace-nowrap">
                            In Stock ({prod.stock} units)
                          </span>
                        )}
                      </td>

                      <td className="py-2.5 px-3.5 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => onEdit(prod)}
                            className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:text-gold hover:border-gold/30 hover:bg-gold/10 transition-all cursor-pointer"
                            title="Edit product details"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteClick(prod)}
                            className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer"
                            title="Delete product"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Premium Pagination Bar */}
      {filteredProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 font-sans">
          <div className="text-xs font-medium text-gray-500">
            Showing <span className="font-bold text-gray-900 font-outfit">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
            <span className="font-bold text-gray-900 font-outfit">
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
            </span>{' '}
            of <span className="font-bold text-gray-900 font-outfit">{filteredProducts.length}</span> catalog items
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer font-sans shadow-xs"
            >
              <FiChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-xl text-xs font-bold font-outfit transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-gold text-white shadow-md shadow-gold/20'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer font-sans shadow-xs"
            >
              <span>Next</span>
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductTable;
