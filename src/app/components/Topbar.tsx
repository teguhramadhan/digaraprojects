"use client";
import React, { useState } from "react";
import { Bell, Search, ChevronDown, LogOut, User } from "lucide-react";

export default function Topbar() {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <header className="bg-white border-b border-gray-200 rounded-2xl shadow-lg px-8 py-5">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-xl">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari data, laporan, atau informasi..."
              className="w-full pl-12 pr-6 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Notification Button */}
          <button className="relative p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
            <Bell
              size={22}
              className="text-gray-600 group-hover:text-blue-600 transition-colors"
            />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Divider */}
          <div className="h-10 w-px bg-gray-200"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3 relative">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl transition-all duration-200">
                AD
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  Administrator
                </p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <ChevronDown
                size={18}
                className={`text-gray-400 transition-transform duration-200 ${
                  openDropdown ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            {openDropdown && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOpenDropdown(false)}
                ></div>

                {/* Menu */}
                <div className="absolute right-0 top-full mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                  {/* Profile Section */}
                  <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                        AD
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">
                          Administrator
                        </p>
                        <p className="text-xs text-gray-500">admin@digara.id</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors flex items-center gap-3 group">
                      <User
                        size={18}
                        className="text-gray-400 group-hover:text-blue-600"
                      />
                      <span className="font-medium">Profil Saya</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 group font-medium"
                    >
                      <LogOut
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
