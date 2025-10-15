"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  Menu,
  ChevronDown,
  Upload,
  Eye,
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const [openRealisasi, setOpenRealisasi] = useState(false);
  const [openMingguan, setOpenMingguan] = useState(false);
  const [openBulanan, setOpenBulanan] = useState(false);

  const isActive = (href: string) => pathname === href;

  // Helper untuk cek apakah ada di dalam section tertentu
  const isInSection = (section: string) => pathname.includes(section);

  // Auto-expand menu jika ada di dalam sub-menu tersebut
  useEffect(() => {
    if (pathname.includes("/realisasi")) {
      setOpenRealisasi(true);

      if (pathname.includes("/realisasi_mingguan")) {
        setOpenMingguan(true);
      }

      if (pathname.includes("/realisasi_bulanan")) {
        setOpenBulanan(true);
      }
    }
  }, [pathname]);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300 flex flex-col bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white ${
        isOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      {/* Header */}
      <div className="relative p-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h1
              className={`${
                isOpen ? "block" : "hidden"
              } text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent`}
            >
              DIGARA
            </h1>
            <p
              className={`${
                isOpen ? "block" : "hidden"
              } text-xs font-light mt-1 text-slate-400`}
            >
              Dashboard Digitalisasi Anggaran
            </p>
          </div>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Dashboard */}
        <a
          href="/dashboard"
          className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive("/dashboard")
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
              : "hover:bg-white/5 text-slate-300 hover:text-white"
          }`}
        >
          <LayoutDashboard size={20} className="flex-shrink-0" />
          <span
            className={`${isOpen ? "block" : "hidden"} font-medium text-sm`}
          >
            Dashboard
          </span>
          {isActive("/dashboard") && (
            <div className="absolute right-2 w-1 h-6 bg-white rounded-full" />
          )}
        </a>

        {/* Realisasi Group */}
        <div className="space-y-1">
          <button
            onClick={() => setOpenRealisasi(!openRealisasi)}
            className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isInSection("/realisasi")
                ? "bg-gradient-to-r from-blue-500/20 to-indigo-600/20 text-white border border-blue-500/30"
                : openRealisasi
                ? "bg-white/5 text-white"
                : "hover:bg-white/5 text-slate-300 hover:text-white"
            }`}
          >
            <FileText size={20} className="flex-shrink-0" />
            <span
              className={`${
                isOpen ? "block" : "hidden"
              } font-medium text-sm flex-1 text-left`}
            >
              Realisasi
            </span>
            {isOpen && (
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  openRealisasi ? "rotate-180" : ""
                }`}
              />
            )}
            {isInSection("/realisasi") && (
              <div className="absolute right-2 w-1 h-6 bg-blue-400 rounded-full" />
            )}
          </button>

          {openRealisasi && isOpen && (
            <div className="ml-3 pl-3 border-l-2 border-white/10 space-y-1">
              {/* Mingguan */}
              <div>
                <button
                  onClick={() => setOpenMingguan(!openMingguan)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-all ${
                    isInSection("/realisasi_mingguan")
                      ? "bg-blue-500/20 text-blue-300 font-medium"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="font-medium">Mingguan</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openMingguan ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openMingguan && (
                  <div className="ml-2 pl-3 border-l border-white/10 mt-1 space-y-0.5">
                    <a
                      href="/realisasi/realisasi_mingguan/upload"
                      className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-all ${
                        isActive("/realisasi/realisasi_mingguan/upload")
                          ? "bg-blue-500/30 text-blue-200 font-semibold border-l-2 border-blue-400"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Upload size={14} />
                      Upload Data
                    </a>
                    <a
                      href="/realisasi/realisasi_mingguan"
                      className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-all ${
                        isActive("/realisasi/realisasi_mingguan") ||
                        pathname === "/realisasi/realisasi_mingguan"
                          ? "bg-blue-500/30 text-blue-200 font-semibold border-l-2 border-blue-400"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Eye size={14} />
                      Lihat Data
                    </a>
                  </div>
                )}
              </div>

              {/* Bulanan */}
              <div>
                <button
                  onClick={() => setOpenBulanan(!openBulanan)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-all ${
                    isInSection("/realisasi_bulanan")
                      ? "bg-blue-500/20 text-blue-300 font-medium"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="font-medium">Bulanan</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openBulanan ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openBulanan && (
                  <div className="ml-2 pl-3 border-l border-white/10 mt-1 space-y-0.5">
                    <a
                      href="/realisasi/realisasi_bulanan/upload"
                      className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-all ${
                        isActive("/realisasi/realisasi_bulanan/upload")
                          ? "bg-blue-500/30 text-blue-200 font-semibold border-l-2 border-blue-400"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Upload size={14} />
                      Upload Data
                    </a>
                    <a
                      href="/realisasi/realisasi_bulanan/data"
                      className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-all ${
                        isActive("/realisasi/realisasi_bulanan/data")
                          ? "bg-blue-500/30 text-blue-200 font-semibold border-l-2 border-blue-400"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Eye size={14} />
                      Lihat Data
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Analisis */}
        <a
          href="/analisis"
          className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive("/analisis")
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
              : "hover:bg-white/5 text-slate-300 hover:text-white"
          }`}
        >
          <BarChart3 size={20} className="flex-shrink-0" />
          <span
            className={`${isOpen ? "block" : "hidden"} font-medium text-sm`}
          >
            Analisis
          </span>
          {isActive("/analisis") && (
            <div className="absolute right-2 w-1 h-6 bg-white rounded-full" />
          )}
        </a>

        {/* Pengaturan */}
        <a
          href="/pengaturan"
          className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive("/pengaturan")
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
              : "hover:bg-white/5 text-slate-300 hover:text-white"
          }`}
        >
          <Settings size={20} className="flex-shrink-0" />
          <span
            className={`${isOpen ? "block" : "hidden"} font-medium text-sm`}
          >
            Pengaturan
          </span>
          {isActive("/pengaturan") && (
            <div className="absolute right-2 w-1 h-6 bg-white rounded-full" />
          )}
        </a>
      </nav>

      {/* Footer */}
      <div
        className={`relative p-4 border-t border-white/10 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-3 py-2 bg-white/5 rounded-lg backdrop-blur-sm">
          <p className="text-xs text-slate-400">Version 1.0.0</p>
          <p className="text-xs text-slate-500 mt-0.5">© 2024 DIGARA</p>
        </div>
      </div>
    </aside>
  );
}
