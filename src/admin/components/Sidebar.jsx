import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiGrid, FiBox, FiPlusCircle, FiImage, FiLogOut, FiChevronLeft } from 'react-icons/fi';

function Sidebar({ activeTab, setActiveTab, collapsed: propCollapsed, setCollapsed: propSetCollapsed, onCloseMobile }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [localCollapsed, setLocalCollapsed] = useState(false);

  const collapsed = propCollapsed !== undefined ? propCollapsed : localCollapsed;
  const setCollapsed = propSetCollapsed || setLocalCollapsed;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminEmail');
    if (onCloseMobile) onCloseMobile();
    navigate('/admin/login');
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard Stats',
      icon: <FiGrid className="w-5 h-5 shrink-0" />,
      path: '/AdminDashboard'
    },
    {
      id: 'products',
      label: 'Manage Products',
      icon: <FiBox className="w-5 h-5 shrink-0" />,
      path: '/AdminDashboard/ManageProducts'
    },
    {
      id: 'add-product',
      label: 'Add New Product',
      icon: <FiPlusCircle className="w-5 h-5 shrink-0" />,
      path: '/AdminDashboard/AddProduct'
    },
    {
      id: 'hero-management',
      label: 'Hero Management',
      icon: <FiImage className="w-5 h-5 shrink-0" />,
      path: '/AdminDashboard/HeroManagement'
    },
    {
      id: 'add-hero',
      label: 'Add New Hero',
      icon: <FiPlusCircle className="w-5 h-5 shrink-0" />,
      path: '/AdminDashboard/AddHero'
    }
  ];

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } max-[575px]:w-64 bg-white border-r border-gray-200/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 shadow-xs font-sans transition-[width] duration-300 ease-in-out will-change-[width] relative z-20 overflow-x-hidden`}
    >
      <div>
        {/* Brand & Logo Header */}
        <div className="p-4 sm:p-5 border-b border-gray-300 flex items-center justify-between min-h-[72px]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0 font-outfit font-black text-lg shadow-xs">
              C
            </div>
            <div
              className={`flex flex-col text-left whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                collapsed ? 'opacity-0 max-w-0 max-[575px]:opacity-100 max-[575px]:max-w-[160px]' : 'opacity-100 max-w-[160px]'
              }`}
            >
              <span className="font-outfit font-extrabold text-base tracking-wider text-gray-900 leading-none">
                CASHMEWALA
              </span>
              <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest mt-1 font-sans">
                Optical Studio
              </span>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setCollapsed((prev) => !prev);
              if (onCloseMobile) onCloseMobile();
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0 select-none"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <FiChevronLeft
              className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                collapsed ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
        </div>

        {/* Navigation Items List */}
        <nav className="p-3 space-y-1.5 mt-3">
          {navItems.map((item) => {
            const currentPath = location.pathname.replace(/\/$/, '');
            const targetPath = item.path.replace(/\/$/, '');
            const isActive = currentPath === targetPath || activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (currentPath !== targetPath) {
                    navigate(item.path);
                  }
                  if (setActiveTab) {
                    setActiveTab(item.id);
                  }
                  if (onCloseMobile) {
                    onCloseMobile();
                  }
                }}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer overflow-hidden ${
                  isActive
                    ? 'bg-gold text-white shadow-sm shadow-gold/20 font-bold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <span
                  className={`truncate text-left font-outfit whitespace-nowrap transition-all duration-300 ease-in-out ${
                    collapsed ? 'opacity-0 max-w-0 max-[575px]:opacity-100 max-[575px]:max-w-[140px]' : 'opacity-100 max-w-[140px]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer & Logout Section */}
      <div className="p-3 border-t border-gray-100 space-y-2">
        <button
          type="button"
          onClick={handleLogout}
          title={collapsed ? "Admin Logout" : undefined}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 hover:border-red-200 border border-transparent transition-colors duration-200 cursor-pointer overflow-hidden"
        >
          <div className="w-6 h-6 flex items-center justify-center shrink-0">
            <FiLogOut className="w-4.5 h-4.5 text-red-500" />
          </div>
          <span
            className={`font-outfit uppercase tracking-wider text-[11px] whitespace-nowrap transition-all duration-300 ease-in-out ${
              collapsed ? 'opacity-0 max-w-0 max-[575px]:opacity-100 max-[575px]:max-w-[140px]' : 'opacity-100 max-w-[140px]'
            }`}
          >
            Logout Session
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
