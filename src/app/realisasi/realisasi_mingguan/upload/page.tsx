"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { RealisasiMingguan } from "@/app/type/realisasi";
import UploadExcelCard from "@/app/components/realisasiMingguan/UploadExcelCard";
import Topbar from "@/app/components/Topbar";
import Sidebar from "@/app/components/Sidebar";
import { FileText, ChevronRight } from "lucide-react";

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
              <li>
                <div className="flex items-center">
                  <ChevronRight className="flex-shrink-0 h-4 w-4 text-gray-400" />
                  <span className="ml-2 text-gray-600 text-sm font-medium">
                    Upload Data
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Upload Data Realisasi Mingguan
              </h1>
              <p className="text-gray-500 text-sm">
                Import data realisasi anggaran mingguan dari file Excel
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section with Info - LAYOUT KIRI-KANAN */}
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
                Import data realisasi anggaran mingguan dari file Excel
              </p>
            </div>
          </div>

          {/* Grid Layout Kiri-Kanan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Kolom Kiri: Info Panduan Upload */}
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-800 mb-3 text-lg">
                  📋 Panduan Upload Data
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <div>
                      <strong>Format File</strong>
                      <p className="text-gray-600">
                        File harus berformat <strong>.xlsx</strong> atau{" "}
                        <strong>.xls</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <div>
                      <strong>Struktur Kolom</strong>
                      <p className="text-gray-600">
                        Kolom harus sesuai dengan struktur database
                      </p>
                      <ul className="list-disc list-inside ml-4 text-gray-600 text-xs mt-1 space-y-1">
                        <li>
                          <strong>Tanggal</strong>: format YYYY-MM-DD
                        </li>
                        <li>
                          <strong>Nilai Angka</strong>: numeric tanpa pemisah
                          ribuan
                        </li>
                        <li>
                          <strong>Persentase</strong>: angka 0-100
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <div>
                      <strong>Nama Kolom</strong>
                      <p className="text-gray-600">
                        Harus sama persis dengan nama field di database
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
                      <span className="text-xs font-bold">4</span>
                    </div>
                    <div>
                      <strong>Data Bersih</strong>
                      <p className="text-gray-600">
                        Pastikan tidak ada baris kosong di awal dan akhir file
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
                      <span className="text-xs font-bold">5</span>
                    </div>
                    <div>
                      <strong>Satu Record per Baris</strong>
                      <p className="text-gray-600">
                        Setiap baris mewakili satu record realisasi mingguan
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-xs font-medium">
                    ⚠️ Ikuti ketentuan di atas agar upload berhasil tanpa error
                  </p>
                </div>
              </div>

              {/* Tips Tambahan */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-semibold text-green-800 mb-2 text-sm">
                  💡 Tips Sukses Upload
                </h4>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>
                    • Download template terlebih dahulu untuk memastikan format
                    benar
                  </li>
                  <li>• Periksa tipe data setiap kolom sebelum upload</li>
                  <li>• Pastikan tidak ada karakter khusus di nama kolom</li>
                  <li>• Validasi data di Excel sebelum upload</li>
                </ul>
              </div>
            </div>

            {/* Kolom Kanan: Upload Card */}
            <div className="flex flex-col">
              <UploadExcelCard fetchData={fetchData} />

              {/* Status Data */}
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Status Data Saat Ini
                    </p>
                    <p className="text-xs text-gray-500">
                      Total data realisasi mingguan
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {data.length}
                    </p>
                    <p className="text-xs text-gray-500">records</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
