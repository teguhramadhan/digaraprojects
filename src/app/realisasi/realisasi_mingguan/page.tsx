"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { RealisasiMingguan } from "@/app/type/realisasi";
import TableMingguan from "@/app/components/realisasiMingguan/tableMingguan";
import UploadExcelCard from "@/app/components/realisasiMingguan/UploadExcelCard";
import Topbar from "@/app/components/Topbar";
import Sidebar from "@/app/components/Sidebar";
import { FileText, Database, TrendingUp } from "lucide-react";

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
      {/* Sidebar fixed */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Konten utama menyesuaikan lebar sidebar */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-20"
        } flex flex-col overflow-auto p-8 space-y-8`}
      >
        <Topbar />

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Realisasi Mingguan
              </h1>
              <p className="text-gray-500 text-sm">
                Kelola dan monitoring data realisasi anggaran mingguan
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <Database size={24} />
                  <div>
                    <p className="text-xs opacity-90">Total Data</p>
                    <p className="text-2xl font-bold">{data.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-3 text-white shadow-lg">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Upload Data Excel
              </h2>
              <p className="text-sm text-gray-500">
                Import data realisasi dari file Excel
              </p>
            </div>
          </div>
          <UploadExcelCard fetchData={fetchData} />
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-3 text-white shadow-lg">
                <TrendingUp size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Data Realisasi
                </h2>
                <p className="text-sm text-gray-500">
                  Daftar lengkap realisasi anggaran mingguan
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <p className="text-gray-500 font-medium">Memuat data...</p>
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
  );
}
