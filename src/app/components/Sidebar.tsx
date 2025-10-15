"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  Menu,
  ChevronRight,
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    {
      icon: FileText,
      label: "Realisasi Mingguan",
      href: "/realisasi/realisasi_mingguan",
    },
    { icon: BarChart3, label: "Analisis", href: "/analisis" },
    { icon: Settings, label: "Pengaturan", href: "/pengaturan" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300 flex flex-col shadow-2xl bg-gradient-to-b from-indigo-900 via-blue-900 to-blue-800 text-white ${
        isOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-blue-700/50 relative z-10">
        <h1
          className={`${
            isOpen ? "block" : "hidden"
          } text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent`}
        >
          DIGARA
        </h1>
        <button
          onClick={toggleSidebar}
          className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10 hover:border-white/20"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <a
              key={idx}
              href={item.href}
              className={`group relative w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white text-blue-900 shadow-lg shadow-blue-500/20"
                  : "hover:bg-white/10 text-blue-100 hover:text-white backdrop-blur-sm"
              }`}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-600 rounded-r-full"></div>
              )}

              <div className={`${isActive ? "text-blue-600" : "text-current"}`}>
                <item.icon size={22} />
              </div>

              <span
                className={`${
                  isOpen ? "block" : "hidden"
                } font-medium text-sm flex-1`}
              >
                {item.label}
              </span>

              {isOpen && (
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-200 ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              )}
            </a>
          );
        })}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="p-6 border-t border-blue-700/50 relative z-10">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 shadow-xl border border-blue-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <BarChart3 size={20} />
              </div>
              <div>
                <p className="text-xs text-blue-200 font-medium">
                  Tahun Anggaran
                </p>
                <p className="text-2xl font-bold">2025</p>
              </div>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full w-3/4 shadow-lg"></div>
            </div>
            <p className="text-xs text-blue-200 mt-2">Progress: 75%</p>
          </div>
        </div>
      )}
    </aside>
  );
}
