"use client";
import { useState, useEffect } from "react";
import {
  RefreshCw,
  Filter,
  Calendar,
  X,
  TrendingUp,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { RealisasiMingguan } from "../../type/realisasi";
import Link from "next/link";

type TableMingguanProps = {
  data: RealisasiMingguan[];
  loading: boolean;
  fetchData: () => Promise<void>;
};

export default function TableMingguan({
  data,
  loading,
  fetchData,
}: TableMingguanProps) {
  const [filteredData, setFilteredData] = useState<RealisasiMingguan[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFilteredData(data);
    setCurrentPage(1);
  }, [data]);

  const formatRupiah = (number?: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number ?? 0);

  const formatPercent = (value?: number) =>
    typeof value === "number" ? `${value.toFixed(2)}%` : "-";

  const formatValue = (
    key: string,
    value: string | number | undefined | null
  ) => {
    if (key.includes("persentase") || key === "kenaikan")
      return formatPercent(
        typeof value === "number" ? value : parseFloat(String(value)) || 0
      );

    if (
      ["pagu", "belanja", "realisasi", "target", "sisa"].some((k) =>
        key.includes(k)
      )
    )
      return formatRupiah(
        typeof value === "number" ? value : parseFloat(String(value)) || 0
      );

    if (key === "tanggal")
      return value
        ? new Date(value).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "-";

    return value ?? "-";
  };

  const handleFilter = () => {
    if (!startDate || !endDate) {
      alert("Silakan pilih tanggal mulai dan tanggal akhir");
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filtered = data.filter((item) => {
      const tgl = new Date(item.tanggal);
      return tgl >= start && tgl <= end;
    });
    setFilteredData(filtered);
    setIsFiltered(true);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilteredData(data);
    setStartDate("");
    setEndDate("");
    setIsFiltered(false);
    setCurrentPage(1);
  };

  if (!mounted) return null;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const lastUpdate =
    filteredData.length > 0
      ? new Date(
          filteredData[filteredData.length - 1].updatedAt || new Date()
        ).toLocaleDateString("id-ID")
      : "-";

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white shadow-lg">
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Data Realisasi Mingguan
              </h2>
              <p className="text-sm text-gray-600">
                Daftar lengkap realisasi anggaran mingguan
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg shadow-sm hover:bg-blue-50 transition-colors font-medium"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <Link
              href="/realisasi/realisasi_mingguan/upload"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-medium"
            >
              <PlusCircle size={18} />
              Tambah Data
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Section - DIPERBAIKI */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-4">
          {/* Input tanggal */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Tanggal Mulai
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Tanggal Akhir
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Tombol filter - di sebelah kanan, tidak full width */}
          <div className="flex-none flex gap-3">
            <button
              onClick={handleFilter}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors font-medium shadow-sm whitespace-nowrap"
            >
              <Filter size={18} />
              Terapkan Filter
            </button>
            {isFiltered && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-5 py-2.5 rounded-lg transition-colors font-medium shadow-sm whitespace-nowrap"
              >
                <X size={18} />
                Reset
              </button>
            )}
          </div>
        </div>

        {isFiltered && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-700">
              <span className="text-lg">📊</span>
              <span className="text-sm font-medium">
                Menampilkan {filteredData.length} data dari{" "}
                {new Date(startDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                sampai{" "}
                {new Date(endDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <button
              onClick={handleReset}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Hapus Filter
            </button>
          </div>
        )}
      </div>

      {/* Loading / Empty State */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          </div>
          <p className="text-gray-600 font-medium">Memuat data...</p>
          <p className="text-gray-500 text-sm mt-1">Silakan tunggu sebentar</p>
        </div>
      ) : paginatedData.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Tidak ada data
          </p>
          <p className="text-gray-500">
            {isFiltered
              ? "Tidak ada data pada rentang tanggal yang dipilih"
              : "Belum ada data realisasi mingguan"}
          </p>
        </div>
      ) : (
        <>
          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th
                    rowSpan={2}
                    className="border border-gray-300 px-4 py-3 bg-yellow-100 text-yellow-800 font-semibold text-left"
                  >
                    Tanggal
                  </th>
                  <th
                    colSpan={12}
                    className="border border-gray-300 px-4 py-2 bg-blue-100 text-blue-800 font-semibold"
                  >
                    Pagu Anggaran
                  </th>
                  <th
                    colSpan={6}
                    className="border border-gray-300 px-4 py-2 bg-green-100 text-green-800 font-semibold"
                  >
                    Realisasi
                  </th>
                  <th
                    colSpan={8}
                    className="border border-gray-300 px-4 py-2 bg-purple-100 text-purple-800 font-semibold"
                  >
                    Target
                  </th>
                  <th
                    colSpan={8}
                    className="border border-gray-300 px-4 py-2 bg-pink-100 text-pink-800 font-semibold"
                  >
                    Sisa Pagu
                  </th>
                  <th
                    rowSpan={2}
                    className="border border-gray-300 px-4 py-2 bg-orange-100 text-orange-800 font-semibold"
                  >
                    Kenaikan
                  </th>
                </tr>
                <tr>
                  {/* Pagu Anggaran Headers */}
                  {[
                    "Pagu",
                    "%",
                    "Realisasi",
                    "%",
                    "Sisa",
                    "%",
                    "Belanja Pegawai",
                    "%",
                    "Belanja Barang",
                    "%",
                    "Belanja Modal",
                    "%",
                  ].map((label, i) => (
                    <th
                      key={i}
                      className="border border-gray-300 px-3 py-2 bg-blue-50 text-blue-900 font-medium text-xs"
                    >
                      {label}
                    </th>
                  ))}
                  {/* Realisasi Headers */}
                  {[
                    "Belanja Pegawai",
                    "%",
                    "Belanja Barang",
                    "%",
                    "Belanja Modal",
                    "%",
                  ].map((label, i) => (
                    <th
                      key={i}
                      className="border border-gray-300 px-3 py-2 bg-green-50 text-green-900 font-medium text-xs"
                    >
                      {label}
                    </th>
                  ))}
                  {/* Target Headers */}
                  {[
                    "Pagu",
                    "%",
                    "Belanja Pegawai",
                    "%",
                    "Belanja Barang",
                    "%",
                    "Belanja Modal",
                    "%",
                  ].map((label, i) => (
                    <th
                      key={i}
                      className="border border-gray-300 px-3 py-2 bg-purple-50 text-purple-900 font-medium text-xs"
                    >
                      {label}
                    </th>
                  ))}
                  {/* Sisa Pagu Headers */}
                  {[
                    "Pagu",
                    "%",
                    "Belanja Pegawai",
                    "%",
                    "Belanja Barang",
                    "%",
                    "Belanja Modal",
                    "%",
                  ].map((label, i) => (
                    <th
                      key={i}
                      className="border border-gray-300 px-3 py-2 bg-pink-50 text-pink-900 font-medium text-xs"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-200 hover:bg-blue-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800 bg-yellow-50 whitespace-nowrap">
                      {formatValue("tanggal", row.tanggal)}
                    </td>
                    {Object.entries(row)
                      .filter(
                        ([key]) =>
                          ![
                            "id",
                            "tanggal",
                            "created_at",
                            "updated_at",
                            "kenaikan",
                          ].includes(key)
                      )
                      .map(([key, value], i) => (
                        <td
                          key={i}
                          className={`border border-gray-300 px-3 py-2 text-gray-700 ${
                            key.includes("persentase")
                              ? "font-semibold text-center"
                              : "text-right"
                          }`}
                        >
                          {formatValue(key, value)}
                        </td>
                      ))}
                    <td className="border border-gray-300 px-3 py-2 font-bold text-orange-700 bg-orange-50 text-center">
                      {formatValue("kenaikan", row.kenaikan)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Menampilkan{" "}
                  <span className="font-semibold">
                    {(currentPage - 1) * itemsPerPage + 1} -{" "}
                    {Math.min(currentPage * itemsPerPage, filteredData.length)}
                  </span>{" "}
                  dari{" "}
                  <span className="font-semibold">{filteredData.length}</span>{" "}
                  data
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                    Prev
                  </button>

                  <div className="flex gap-1">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
              <span className="text-gray-600">
                Total Data:{" "}
                <span className="font-semibold text-blue-600">
                  {filteredData.length}
                </span>{" "}
                entri
              </span>
              <span className="text-gray-500">
                Terakhir diperbarui:{" "}
                <span className="font-semibold text-green-600">
                  {lastUpdate}
                </span>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
