import React, { useState, useEffect } from 'react';
import { FiUpload, FiX, FiCheck, FiTag, FiDollarSign, FiImage, FiEye, FiHeart, FiLayers, FiAlertCircle } from 'react-icons/fi';

function ProductForm({ product, onSave, onCancel }) {
  const isEdit = !!product;

  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Men');
  const [description, setDescription] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState('0');
  const [finalPrice, setFinalPrice] = useState(0);
  const [stock, setStock] = useState('0');

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      setProductName(product.productName || '');
      setBrand(product.brand || '');
      setCategory(product.category || 'Men');
      setDescription(product.description || '');
      setOriginalPrice(product.originalPrice || '');
      setDiscount(product.discount || '0');
      setFinalPrice(product.finalPrice ?? 0);
      setStock(product.stock || '0');
      setImagePreview(product.image);
    } else {
      setProductName('');
      setBrand('');
      setCategory('Men');
      setDescription('');
      setOriginalPrice('');
      setDiscount('0');
      setFinalPrice(0);
      setStock('0');
      setImageFile(null);
      setImagePreview('');
    }
  }, [product, isEdit]);

  useEffect(() => {
    const orig = Number(originalPrice) || 0;
    const disc = Number(discount) || 0;
    const final = Math.round(orig * (1 - disc / 100));
    setFinalPrice(final >= 0 ? final : 0);
  }, [originalPrice, discount]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!productName.trim()) tempErrors.productName = "Product name is required";
    if (!brand.trim()) tempErrors.brand = "Brand name is required";
    if (!description.trim()) tempErrors.description = "Description is required";
    if (!originalPrice || isNaN(originalPrice) || Number(originalPrice) <= 0) {
      tempErrors.originalPrice = "Please enter a valid original price > 0";
    }
    if (discount === '' || isNaN(discount) || Number(discount) < 0 || Number(discount) > 100) {
      tempErrors.discount = "Discount must be between 0 and 100";
    }
    if (stock === '' || isNaN(stock) || Number(stock) < 0) {
      tempErrors.stock = "Stock must be 0 or a positive number";
    }
    if (!isEdit && !imageFile) {
      tempErrors.image = "Please upload a product image file";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('originalPrice', originalPrice);
    formData.append('discount', discount);
    formData.append('finalPrice', finalPrice);
    formData.append('stock', stock);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    onSave(formData);
  };

  const currentStockNum = Number(stock) || 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans text-left max-w-5xl mx-auto">
      {/* STEP 1: Basic Product Information Card */}
      <div className="bg-white border border-gray-200/80 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-gold border border-amber-200/60 flex items-center justify-center font-outfit font-extrabold text-xs">
            1
          </div>
          <div>
            <h3 className="font-outfit font-extrabold text-base text-gray-900">
              Basic Product Details
            </h3>
            <p className="text-[11px] text-gray-400 font-sans">Enter the title, brand, category, and descriptive details</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className={`w-full px-4 py-3 bg-white border ${errors.productName ? 'border-red-500' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/15'
                  } rounded-xl text-xs text-gray-900 focus:outline-none transition-all font-sans font-medium`}
                placeholder="e.g. Wibes A26 Titanium Specs"
              />
              {errors.productName && <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.productName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Brand Name *
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className={`w-full px-4 py-3 bg-white border ${errors.brand ? 'border-red-500' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/15'
                  } rounded-xl text-xs text-gray-900 focus:outline-none transition-all font-sans font-medium`}
                placeholder="e.g. Glassinc Optics"
              />
              {errors.brand && <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.brand}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Demographic Line (Category) *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/15 rounded-xl text-xs font-bold text-gray-800 focus:outline-none transition-all cursor-pointer font-sans"
            >
              <option value="Men">Men Eyewear</option>
              <option value="Women">Women Eyewear</option>
              <option value="Kids">Kids Eyewear</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Full Product Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className={`w-full px-4 py-3 bg-white border ${errors.description ? 'border-red-500' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/15'
                } rounded-xl text-xs text-gray-900 focus:outline-none transition-all resize-none font-sans leading-relaxed`}
              placeholder="Describe frame material, craftsmanship, nose bridge fit, UV protection level, and warranty details..."
            />
            {errors.description && <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.description}</p>}
          </div>
        </div>
      </div>

      {/* STEP 2: Pricing & Stock Inventory Card */}
      <div className="bg-white border border-gray-200/80 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center font-outfit font-extrabold text-xs">
            2
          </div>
          <div>
            <h3 className="font-outfit font-extrabold text-base text-gray-900">
              Pricing & Stock Inventory
            </h3>
            <p className="text-[11px] text-gray-400 font-sans">Specify price tags, discount offers, and inventory stock counts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Original Price (₹) *
            </label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className={`w-full px-4 py-3 bg-white border ${errors.originalPrice ? 'border-red-500' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/15'
                } rounded-xl text-xs text-gray-900 focus:outline-none transition-all font-sans font-extrabold font-outfit`}
              placeholder="12,500"
              min="0"
            />
            {errors.originalPrice && <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.originalPrice}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className={`w-full px-4 py-3 bg-white border ${errors.discount ? 'border-red-500' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/15'
                } rounded-xl text-xs text-gray-900 focus:outline-none transition-all font-sans font-extrabold font-outfit`}
              placeholder="0"
              min="0"
              max="100"
            />
            {errors.discount && <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.discount}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Calculated Final Price (₹)
            </label>
            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl text-xs text-amber-600 font-black font-outfit cursor-not-allowed flex items-center justify-between">
              <span className="text-[11px] text-gray-400 uppercase font-sans">Final:</span>
              <span className="text-sm font-black text-gray-900">₹{finalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Stock Units *
            </label>
            <div className="relative">
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className={`w-full px-4 py-3 bg-white border ${errors.stock ? 'border-red-500' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/15'
                  } rounded-xl text-xs text-gray-900 focus:outline-none transition-all font-sans font-extrabold font-outfit`}
                placeholder="10"
                min="0"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {currentStockNum === 0 ? (
                  <span className="text-[9px] font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    Sold Out
                  </span>
                ) : currentStockNum <= 10 ? (
                  <span className="text-[9px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Low Stock
                  </span>
                ) : (
                  <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    In Stock
                  </span>
                )}
              </div>
            </div>
            {errors.stock && <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.stock}</p>}
          </div>
        </div>
      </div>

      {/* STEP 3: Product Image Upload & Prominent Live Card Preview */}
      <div className="bg-white border border-gray-200/80 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 border border-purple-200/60 flex items-center justify-center font-outfit font-extrabold text-xs">
            3
          </div>
          <div>
            <h3 className="font-outfit font-extrabold text-base text-gray-900">
              Product Image Asset & Live Preview
            </h3>
            <p className="text-[11px] text-gray-400 font-sans">Upload your product photo and inspect how it renders on the store homepage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Image Drag & Drop Upload Zone */}
          <div className="lg:col-span-7 space-y-4">
            <label className={`flex flex-col items-center justify-center border-2 border-dashed ${errors.image ? 'border-red-400 bg-red-50/20' : 'border-gray-200 hover:border-gold/60 bg-gray-50/40 hover:bg-gold/5'
              } rounded-2xl p-8 cursor-pointer transition-all text-center min-h-[220px]`}>
              <div className="w-14 h-14 rounded-full bg-white shadow-xs border border-gray-200/80 flex items-center justify-center mb-3">
                <FiUpload className="w-6 h-6 text-gold" />
              </div>
              <span className="text-xs font-extrabold text-gray-800 uppercase tracking-wider font-outfit">
                Upload Product Photo
              </span>
              <span className="text-[11px] text-gray-400 mt-1 font-sans">
                Drag & drop or browse JPG, PNG, WEBP files
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {errors.image && <p className="text-[11px] text-red-500 font-medium">{errors.image}</p>}
          </div>

          {/* Prominent Live Product Card Preview */}
          <div className="lg:col-span-5 bg-gray-50 border border-gray-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-gold">
              <div className="flex items-center gap-2">
                <FiEye className="w-4 h-4" />
                <span className="font-outfit font-extrabold text-xs uppercase tracking-wider text-gray-900">
                  Homepage Card Replica
                </span>
              </div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-outfit">
                Live Preview
              </span>
            </div>

            {/* Card Replica Container */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gold/30 shadow-md text-left">
              <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-amber-50/40 via-gray-50 to-amber-100/30 overflow-hidden flex items-center justify-center">
                <span className="absolute top-2.5 left-2.5 z-10 text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30 font-outfit">
                  {brand || 'EXCLUSIVES'}
                </span>

                <button
                  type="button"
                  className="absolute top-2.5 right-2.5 z-10 w-7.5 h-7.5 rounded-full bg-white/90 backdrop-blur-md border border-gold/40 flex items-center justify-center text-gold shadow-xs"
                >
                  <FiHeart className="w-3.5 h-3.5" />
                </button>

                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-xs font-semibold p-6 text-center">
                    Select an image above to render preview
                  </div>
                )}
              </div>

              <div className="p-3.5 bg-white flex flex-col justify-between text-left">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold block mb-0.5 font-outfit">
                    {brand || 'CASHMEWALA OPTICS'}
                  </span>

                  <h3 className="font-outfit font-extrabold text-sm text-gray-900 line-clamp-1 mb-1 tracking-tight">
                    {productName || 'Optical Frame Title'}
                  </h3>

                  <div className="flex flex-wrap gap-1 mb-1.5 font-sans">
                    <span className="text-[9px] font-bold text-gray-600 border border-gray-200/80 rounded-md px-1.5 py-0.5 tracking-wider uppercase bg-gray-50/80">
                      {category}
                    </span>
                    {currentStockNum === 0 ? (
                      <span className="text-[9px] font-bold text-red-500 border border-red-200 rounded-md px-1.5 py-0.5 tracking-wider uppercase bg-red-50/40">
                        Sold Out
                      </span>
                    ) : currentStockNum <= 10 ? (
                      <span className="text-[9px] font-bold text-amber-600 border border-amber-200 rounded-md px-1.5 py-0.5 tracking-wider uppercase bg-amber-50/40">
                        Low Stock
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-emerald-700 border border-emerald-200 rounded-md px-1.5 py-0.5 tracking-wider uppercase bg-emerald-50/40">
                        In Stock
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 leading-snug line-clamp-2 mb-2 font-sans">
                    {description || 'Product features and descriptions will display here...'}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-2.5 mt-auto">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold block mb-0.5 font-sans">PRICE</span>
                    <span className="text-base font-outfit font-black text-gray-900 leading-none">
                      ₹{finalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-outfit font-extrabold uppercase tracking-wider px-3 py-1 rounded-lg shadow-xs">
                    Details
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="bg-white border-2 border-gold/30 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
        <div>
          <h4 className="font-outfit font-extrabold text-base text-gray-900">
            Ready to publish?
          </h4>
          <p className="text-xs text-gray-500 font-sans">
            Review all steps above before submitting to update your catalog.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3.5 border border-gray-200 hover:border-gray-300 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all cursor-pointer font-sans"
            >
              Cancel & Exit
            </button>
          )}

          <button
            type="submit"
            className="px-8 py-3.5 bg-gold hover:bg-gold-hover text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md shadow-gold/20 hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer font-outfit"
          >
            <FiCheck className="w-4 h-4" />
            <span>{isEdit ? "Update Catalog Product" : "Save & Publish Product"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
