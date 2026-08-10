import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Mobile Menu/Open Button (Visible only at <= 575px when sidebar is closed) */}
      {!mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="min-[576px]:hidden fixed top-3 left-3 z-40 p-2.5 bg-white border border-gray-200/90 rounded-xl shadow-md text-gray-700 hover:text-gold hover:border-gold/40 transition-all cursor-pointer flex items-center gap-2"
          title="Open Menu"
        >
          <FiMenu className="w-5 h-5 text-gold" />
          <span className="text-xs font-bold text-gray-800 font-outfit">Menu</span>
        </button>
      )}

      {/* Mobile Overlay Backdrop (Visible only at <= 575px when sidebar is open) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="min-[576px]:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Fixed / Overlay Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-screen z-50 transition-transform duration-300 ease-in-out max-[575px]:w-64 ${
          mobileOpen ? "max-[575px]:translate-x-0" : "max-[575px]:-translate-x-full"
        }`}
      >
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onCloseMobile={() => setMobileOpen(false)}
        />
      </div>

      {/* Scrollable Main Content */}
      <main
        className={`transition-all duration-300 flex-1 overflow-y-auto bg-gray-100 p-6 max-[575px]:p-4 max-[575px]:pt-16 max-[575px]:ml-0 ${
          collapsed ? "min-[576px]:ml-20" : "min-[576px]:ml-64"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
