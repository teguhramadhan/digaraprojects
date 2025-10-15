"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { RealisasiMingguan } from "@/app/type/realisasi";
import TableMingguan from "@/app/components/realisasiMingguan/tableMingguan";
import Topbar from "@/app/components/Topbar";
import Sidebar from "@/app/components/Sidebar";
import { Database, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [data, setData] = useState<RealisasiMingguan[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("realisasi_mingguan")
      .select("*")
      .order("tanggal", { ascending: false });

    if (!error && data) {
      setData(data);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-20"
        } flex flex-col overflow-auto p-8 space-y-8`}
      >
        <Topbar />

        {/* Header Section dengan Breadcrumb */}
        <div className="my-6 mx-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <div className="flex items-center">
                  <a
                    href="/dashboard"
                    className="text-gray-400 hover:text-gray-500 text-sm font-medium"
                  >
                    Dashboard
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="flex-shrink-0 h-4 w-4 text-gray-400" />
                  <a
                    href="#"
                    className="ml-2 text-gray-400 hover:text-gray-500 text-sm font-medium"
                  >
                    Realisasi
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="flex-shrink-0 h-4 w-4 text-gray-400" />
                  <a
                    href="/realisasi/realisasi_mingguan"
                    className="ml-2 text-gray-400 hover:text-gray-500 text-sm font-medium"
                  >
                    Realisasi Mingguan
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Table Section */}
        <div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8">
              {loading ? (
                <div className="flex flex-col justify-center items-center h-64 space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 font-medium text-sm">
                    Memuat data...
                  </p>
                </div>
              ) : data.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-64 border-2 border-dashed border-gray-300 rounded-2xl">
                  <div className="bg-gray-100 rounded-full p-4 mb-4">
                    <Database size={48} className="text-gray-400" />
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Belum Ada Data
                  </p>
                  <p className="text-sm text-gray-500">
                    Upload file Excel untuk menambahkan data realisasi
                  </p>
                </div>
              ) : (
                <TableMingguan
                  data={data}
                  loading={loading}
                  fetchData={fetchData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
