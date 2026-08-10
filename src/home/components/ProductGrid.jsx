import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiStar, FiX, FiShield, FiPlusCircle, FiSearch, FiSliders } from 'react-icons/fi';

function ProductGrid({ activeCategory }) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    return `http://localhost:5000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      try {
        const res = await axios.get('http://localhost:5000/api/home/products');
        console.log('Products response:', res.data);
        setAllProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, searchQuery, sortBy]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (activeCategory && activeCategory !== 'All') {
      result = result.filter(p => p.category && p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        (p.productName && p.productName.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => (Number(a.finalPrice) || 0) - (Number(b.finalPrice) || 0));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => (Number(b.finalPrice) || 0) - (Number(a.finalPrice) || 0));
    }

    return result;
  }, [allProducts, activeCategory, searchQuery, sortBy]);

  const renderStars = (rating = 5, sizeClass = "w-3.5 h-3.5") => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`${sizeClass} fill-current ${i < rating ? 'text-amber-500' : 'text-gray-300 dark:text-gray-700'
          }`}
      />
    ));
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section id="products" className="py-16 px-6 max-w-7xl mx-auto w-full transition-colors duration-300 scroll-mt-20">
      <div className="text-center mb-10">
        <span className="font-outfit font-bold text-xs uppercase tracking-[0.25em] text-gold mb-2 block">
          Elite collection
        </span>
        <h2 className="font-display font-black text-4xl text-gradient-premium mb-3">
          Featured Products
        </h2>
        <p className="text-sm text-muted font-sans">
          Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} elegant frames for category: <span className="text-gold font-bold">{activeCategory}</span>
        </p>
        <div className="w-16 h-1 bg-gold mx-auto mt-3 rounded" />
      </div>

      {/* SEARCH BAR & SORTING CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 max-w-4xl mx-auto w-full">
        {/* Search Input Bar */}
        <div className="relative w-full sm:w-80 md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <FiSearch className="w-4 h-4 text-gold" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/15 rounded-xl text-xs text-gray-900 focus:outline-none transition-all shadow-xs font-sans placeholder-gray-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 font-sans whitespace-nowrap">
            <FiSliders className="w-3.5 h-3.5 text-gold" />
            <span>Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-2.5 bg-white border border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/15 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none transition-all cursor-pointer shadow-xs font-sans w-full sm:w-auto"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="glass-card max-w-md mx-auto p-12 rounded-2xl text-center font-sans space-y-3">
          <p className="text-gray-700 text-lg font-bold">No products found</p>
          {searchQuery ? (
            <p className="text-xs text-gray-500">
              No products match "{searchQuery}" in category "{activeCategory}".
            </p>
          ) : (
            <p className="text-xs text-gray-500">No products found in this category.</p>
          )}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-3 px-4 py-2 bg-gold text-white text-xs font-semibold rounded-lg hover:bg-gold-hover transition-all cursor-pointer"
            >
              Clear Search Filter
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProducts.map((product, index) => {
              const discountVal = Number(product.discount) || 0;
              const hasDiscount = discountVal > 0;
              const finalPriceNum = Number(product.finalPrice) || Number(product.originalPrice) || 0;
              const originalPriceNum = Number(product.originalPrice) || finalPriceNum;

              return (
                <motion.div
                  key={product._id || index}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: (index % 12) * 0.03
                  }}
                  className="group bg-white rounded-2xl overflow-hidden border border-gold/30 hover:border-gold shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_30px_rgba(197,145,53,0.12)] relative z-0 hover:z-10 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-amber-50/40 via-gray-50 to-amber-100/30 overflow-hidden">
                    <span className="absolute top-2.5 left-2.5 z-10 text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30 shadow-sm font-outfit">
                      {product.brand || 'EXCLUSIVE'}
                    </span>



                    <img
                      src={getImageUrl(product.image)}
                      alt={product.productName || 'Product'}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  <div className="p-3 sm:p-3.5 bg-white flex flex-col flex-grow justify-between text-left">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold block mb-0.5 font-outfit">
                        {product.brand || 'CHASHMEWALA OPTICS'}
                      </span>

                      <h3 className="font-outfit font-extrabold text-sm sm:text-base text-gray-900 line-clamp-1 mb-1 tracking-tight group-hover:text-gold transition-colors duration-200">
                        {product.productName}
                      </h3>

                      <div className="flex flex-wrap gap-1 mb-1.5 font-sans">
                        {product.category && (
                          <span className="text-[9px] font-bold text-gray-600 border border-gray-200/80 rounded-md px-1.5 py-0.5 tracking-wider uppercase bg-gray-50/80">
                            {product.category}
                          </span>
                        )}
                        {product.stock === 0 ? (
                          <span className="text-[9px] font-bold text-red-500 border border-red-200 rounded-md px-1.5 py-0.5 tracking-wider uppercase bg-red-50/40">
                            Sold Out
                          </span>
                        ) : product.stock <= 10 ? (
                          <span className="text-[9px] font-bold text-amber-600 border border-amber-200 rounded-md px-1.5 py-0.5 tracking-wider uppercase bg-amber-50/40">
                            Low Stock
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-emerald-700 border border-emerald-200 rounded-md px-1.5 py-0.5 tracking-wider uppercase bg-emerald-50/40">
                            In Stock
                          </span>
                        )}
                        {hasDiscount && (
                          <span className="text-[9px] font-bold text-red-600 border border-red-200 rounded-md px-1.5 py-0.5 tracking-wider uppercase bg-red-50/40">
                            {discountVal}% OFF
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="flex items-center gap-0.5">
                          {renderStars(5)}
                        </div>
                        <span className="text-[10px] font-semibold text-gray-400 font-sans">4.9 (120+)</span>
                      </div>

                      <p className="text-xs text-gray-500 leading-snug line-clamp-2 mb-2 font-sans">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-yellow-300 pt-2.5 mt-auto">
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold block mb-0.5 font-sans">PRICE</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base sm:text-lg font-outfit font-black text-gray-900 leading-none">
                            ₹{finalPriceNum.toLocaleString('en-IN')}
                          </span>
                          {hasDiscount && (
                            <span className="text-[10px] text-gray-400 line-through font-sans">
                              ₹{originalPriceNum.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-[10px] font-outfit font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {visibleCount < filteredProducts.length && (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="group px-8 py-3.5 bg-white border-2 border-gold text-gold hover:bg-gold hover:text-white font-outfit font-black text-xs uppercase tracking-widest rounded-lg shadow-md hover:shadow-lg hover:shadow-gold/15 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Load More Products</span>
                <FiPlusCircle className="w-4 h-4 text-gold group-hover:text-white transition-colors" />
              </button>
            </div>
          )}
        </div>
      )}

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur text-gray-600 hover:text-red-500 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="w-full md:w-1/2 relative bg-gradient-to-br from-violet-50 to-indigo-100 min-h-[300px] md:min-h-full">
              {(Number(selectedProduct.discount) || 0) > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md font-sans">
                  {selectedProduct.discount}% OFF
                </div>
              )}
              <img
                src={getImageUrl(selectedProduct.image)}
                alt={selectedProduct.productName || 'Product'}
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col max-h-[85vh] overflow-y-auto text-left font-sans">
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedProduct.category && (
                  <span className="text-[10px] font-bold text-gray-500 border border-gray-200 rounded px-2.5 py-1 tracking-wider uppercase bg-gray-50">
                    {selectedProduct.category}
                  </span>
                )}
                {selectedProduct.brand && (
                  <span className="text-[10px] font-bold text-gray-500 border border-gray-200 rounded px-2.5 py-1 tracking-wider uppercase bg-gray-50">
                    {selectedProduct.brand}
                  </span>
                )}
                {selectedProduct.stock === 0 ? (
                  <span className="text-[10px] font-bold text-red-500 border border-red-200 rounded px-2.5 py-1 tracking-wider uppercase bg-red-50">
                    Sold Out
                  </span>
                ) : selectedProduct.stock <= 10 ? (
                  <span className="text-[10px] font-bold text-amber-500 border border-amber-200 rounded px-2.5 py-1 tracking-wider uppercase bg-amber-50">
                    Only {selectedProduct.stock} Left
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-600 border border-emerald-200 rounded px-2.5 py-1 tracking-wider uppercase bg-emerald-50">
                    In Stock
                  </span>
                )}
              </div>

              <h2 className="font-display font-black text-2xl md:text-3xl text-gray-900 mb-2 leading-tight">
                {selectedProduct.productName}
              </h2>
              <div className="flex items-center gap-1.5 mb-6 pb-6 border-b border-yellow-300">
                <div className="flex items-center">
                  {renderStars(5, "w-4 h-4")}
                </div>
                <span className="text-xs text-gray-400 font-medium ml-1">(128 Reviews)</span>
              </div>

              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-1">
                  Price
                </span>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-outfit font-black text-gray-900 leading-none">
                    ₹{(Number(selectedProduct.finalPrice) || Number(selectedProduct.originalPrice) || 0).toLocaleString('en-IN')}
                  </span>
                  {(Number(selectedProduct.discount) || 0) > 0 && (
                    <span className="text-lg text-gray-400 line-through font-medium mb-1">
                      ₹{(Number(selectedProduct.originalPrice) || 0).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-2">
                  Details
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <FiShield className="text-gold w-4 h-4" /> 1 Year Premium Warranty
                  </li>
                  <li className="flex items-center gap-2">
                    <FiX className="text-gold w-4 h-4 rotate-45" /> Free returns within 14 days
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default ProductGrid;
