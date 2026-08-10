import React, { useState, useEffect } from 'react';
import { FiUpload, FiCheck, FiEye } from 'react-icons/fi';

function HeroForm({ hero, onSave, onCancel }) {
  const isEdit = !!hero;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      setTitle(hero.title || '');
      setSubtitle(hero.subtitle || '');
      setPrice(hero.price || '');
      setDescription(hero.description || '');
      setImagePreview(hero.image || '');
      setImageFile(null);
    } else {
      setTitle('');
      setSubtitle('');
      setPrice('');
      setDescription('');
      setImageFile(null);
      setImagePreview('');
    }
  }, [hero, isEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!title.trim()) tempErrors.title = 'Main title is required';
    if (!subtitle.trim()) tempErrors.subtitle = 'Subtitle is required';
    if (!description.trim()) tempErrors.description = 'Description is required';
    if (!isEdit && !imageFile && !imagePreview) {
      tempErrors.image = 'Please upload a hero banner image';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('price', price);
    formData.append('description', description);

    if (imageFile) {
      formData.append('image', imageFile);
    } else if (imagePreview) {
      formData.append('image', imagePreview);
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans text-left max-w-5xl mx-auto">
      {/* STEP 1: Hero Headlines & Copywriting */}
      <div className="bg-white border border-gray-200/80 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-gold border border-amber-200/60 flex items-center justify-center font-outfit font-extrabold text-xs">
            1
          </div>
          <div>
            <h3 className="font-outfit font-extrabold text-base text-gray-900">
              Banner Headlines & Copywriting
            </h3>
            <p className="text-[11px] text-gray-400 font-sans">
              Set tagline subtitle badge, main headline, and banner description
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Eyebrow Tagline Subtitle *
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className={`w-full px-4 py-3 bg-white border ${
                errors.subtitle ? 'border-red-500' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/15'
              } rounded-xl text-xs text-gray-900 focus:outline-none transition-all font-sans font-medium`}
              placeholder="e.g. CASHMEWALA OPTICS • LUXURY 2026"
            />
            {errors.subtitle && <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.subtitle}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Main Hero Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 bg-white border ${
                errors.title ? 'border-red-500' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/15'
              } rounded-xl text-xs text-gray-900 focus:outline-none transition-all font-sans font-medium`}
              placeholder="e.g. TITANIUM AIR SPECS"
            />
            {errors.title && <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Hero Body Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className={`w-full px-4 py-3 bg-white border ${
                errors.description ? 'border-red-500' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/15'
              } rounded-xl text-xs text-gray-900 focus:outline-none transition-all resize-none font-sans leading-relaxed`}
              placeholder="Write an enticing hero description highlighting frame craftsmanship and exclusivity..."
            />
            {errors.description && <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.description}</p>}
          </div>
        </div>
      </div>

      {/* STEP 2: Price Highlight */}
      <div className="bg-white border border-gray-200/80 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center font-outfit font-extrabold text-xs">
            2
          </div>
          <div>
            <h3 className="font-outfit font-extrabold text-base text-gray-900">
              Price Highlight Tag
            </h3>
            <p className="text-[11px] text-gray-400 font-sans">Set optional highlight price tag for the hero banner</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Highlight Price Tag
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/15 rounded-xl text-xs text-gray-900 focus:outline-none transition-all font-sans font-medium"
            placeholder="e.g. ₹14,999"
          />
        </div>
      </div>

      {/* STEP 3: Hero Image Upload & Real-Time Banner Slide Preview */}
      <div className="bg-white border border-gray-200/80 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 border border-purple-200/60 flex items-center justify-center font-outfit font-extrabold text-xs">
            3
          </div>
          <div>
            <h3 className="font-outfit font-extrabold text-base text-gray-900">
              Hero Showcase Image & Real-Time Render
            </h3>
            <p className="text-[11px] text-gray-400 font-sans">Upload banner image asset and inspect the live slide preview</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Upload Dropzone */}
          <div className="lg:col-span-6 space-y-4">
            <label
              className={`flex flex-col items-center justify-center border-2 border-dashed ${
                errors.image ? 'border-red-400 bg-red-50/20' : 'border-gray-200 hover:border-gold/60 bg-gray-50/40 hover:bg-gold/5'
              } rounded-2xl p-8 cursor-pointer transition-all text-center min-h-[240px]`}
            >
              <div className="w-14 h-14 rounded-full bg-white shadow-xs border border-gray-200/80 flex items-center justify-center mb-3">
                <FiUpload className="w-6 h-6 text-gold" />
              </div>
              <span className="text-xs font-extrabold text-gray-800 uppercase tracking-wider font-outfit">
                Upload Hero Banner Asset
              </span>
              <span className="text-[11px] text-gray-400 mt-1 font-sans">
                PNG or WEBP format recommended
              </span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {errors.image && <p className="text-[11px] text-red-500 font-medium">{errors.image}</p>}
          </div>

          {/* Live Render Preview */}
          <div className="lg:col-span-6 bg-gray-900 text-white p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[320px] border border-amber-500/20 shadow-xl text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2 text-gold">
                <FiEye className="w-4 h-4" />
                <span className="font-outfit font-extrabold text-xs uppercase tracking-wider text-white">
                  Live Hero Banner Render
                </span>
              </div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                Live Preview
              </span>
            </div>

            <div className="relative z-10">
              <span className="font-outfit font-bold text-[10px] uppercase tracking-widest text-amber-400 block mb-1">
                {subtitle || 'TAGLINE SUBTITLE'}
              </span>

              <h3 className="font-display font-black text-2xl text-white mb-2 leading-tight">
                {title || 'Main Hero Title'}
              </h3>

              {price && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-outfit font-black text-xl text-amber-400">{price}</span>
                </div>
              )}

              <p className="text-xs text-gray-300 leading-relaxed line-clamp-2 mb-3 font-sans">
                {description || 'Hero banner description preview will appear here...'}
              </p>
            </div>

            <div className="flex justify-center my-2 h-28 relative z-10">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Hero Slide"
                  className="max-h-full max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                />
              ) : (
                <div className="flex items-center justify-center text-xs text-gray-500 font-medium border border-dashed border-white/20 w-full rounded-xl">
                  No Image Uploaded
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="bg-white border-2 border-gold/30 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
        <div>
          <h4 className="font-outfit font-extrabold text-base text-gray-900">
            {isEdit ? 'Ready to update Hero Banner?' : 'Ready to save Hero Banner?'}
          </h4>
          <p className="text-xs text-gray-500 font-sans">
            Review headlines, pricing tag, and image preview before saving.
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
            <span>{isEdit ? 'Update Hero Banner' : 'Save & Publish Hero'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default HeroForm;
