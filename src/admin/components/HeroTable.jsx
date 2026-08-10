import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ITEMS_PER_PAGE = 6;

function HeroTable({ heroes, onEdit, onDeleteClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredHeroes = heroes.filter((hero) => {
    const title = hero.title || '';
    const subtitle = hero.subtitle || '';
    const description = hero.description || '';
    const search = searchTerm.toLowerCase();

    return (
      title.toLowerCase().includes(search) ||
      subtitle.toLowerCase().includes(search) ||
      description.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(filteredHeroes.length / ITEMS_PER_PAGE) || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [heroes, totalPages, currentPage]);

  const paginatedHeroes = filteredHeroes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative min-w-[280px]">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search hero banners by title, subtitle, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 focus:border-gold rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none transition-colors font-sans shadow-xs"
            />
          </div>
        </div>

        <div className="text-xs font-semibold text-gray-500 font-sans">
          Total Hero Banners: <span className="font-extrabold text-gray-900 font-outfit">{filteredHeroes.length}</span>
        </div>
      </div>

      {/* Hero Table */}
      <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs font-sans">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200/80 bg-gray-50/60 font-outfit">
                <th className="py-3.5 px-3 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest w-14">Image</th>
                <th className="py-3.5 px-3.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest min-w-[200px]">Banner Headlines</th>
                <th className="py-3.5 px-3.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest whitespace-nowrap">Price Highlight</th>
                <th className="py-3.5 px-3.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest min-w-[240px]">Description</th>
                <th className="py-3.5 px-3.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans">
              {paginatedHeroes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-400 text-xs font-semibold">
                    No matching hero section banners found.
                  </td>
                </tr>
              ) : (
                paginatedHeroes.map((hero) => {
                  return (
                    <tr key={hero._id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="w-14 h-10 rounded-xl overflow-hidden shrink-0 bg-gray-100 shadow-2xs">
                          <img
                            src={hero.image}
                            alt={hero.title || 'Hero Banner'}
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
                            {hero.title || 'Untitled Banner'}
                          </div>
                          <div className="text-[10px] text-amber-600 uppercase font-bold tracking-wider mt-0.5 font-outfit">
                            {hero.subtitle || 'No Subtitle'}
                          </div>
                        </div>
                      </td>

                      <td className="py-2.5 px-3.5 font-outfit text-sm text-gray-900 font-black whitespace-nowrap">
                        {hero.price || '-'}
                      </td>

                      <td className="py-2.5 px-3.5">
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {hero.description || 'No description provided.'}
                        </p>
                      </td>

                      <td className="py-2.5 px-3.5 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => onEdit(hero)}
                            className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:text-gold hover:border-gold/30 hover:bg-gold/10 transition-all cursor-pointer"
                            title="Edit hero section details"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteClick(hero)}
                            className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer"
                            title="Delete hero section"
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

      {/* Pagination Bar */}
      {filteredHeroes.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 font-sans">
          <div className="text-xs font-medium text-gray-500">
            Showing <span className="font-bold text-gray-900 font-outfit">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
            <span className="font-bold text-gray-900 font-outfit">
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredHeroes.length)}
            </span>{' '}
            of <span className="font-bold text-gray-900 font-outfit">{filteredHeroes.length}</span> hero items
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

export default HeroTable;
