"use client";
import { useState, useEffect } from "react";
import { RefreshCw, Filter, Calendar, X } from "lucide-react";
import type { RealisasiMingguan } from "../../type/realisasi";

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
    setMounted(true); // hydratation-safe
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

  if (!mounted) return null; // hydratation-safe

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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Data Realisasi Mingguan
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Monitoring realisasi anggaran per minggu
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-700 px-4 py-2 rounded-lg transition font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </button>
      </div>

      {/* Filter */}
      <div className="border-b border-gray-200 px-6 py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full sm:w-auto text-gray-700">
            <div>
              <label className="block text-xs font-semibold mb-1">
                <Calendar className="inline w-3 h-3 mr-1" /> Tanggal Mulai
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-200 text-sm rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition hover:border-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">
                <Calendar className="inline w-3 h-3 mr-1" /> Tanggal Akhir
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-200 text-sm rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition hover:border-gray-300"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleFilter}
              className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium shadow-sm"
            >
              <Filter size={16} />
              Terapkan Filter
            </button>
            {isFiltered && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition font-medium shadow-sm"
              >
                <X size={16} />
                Reset
              </button>
            )}
          </div>
        </div>

        {isFiltered && (
          <div
            className={`mt-3 border rounded-lg px-4 py-2 flex items-center justify-between text-sm ${
              filteredData.length > 0
                ? "text-green-700 bg-green-50 border-green-200"
                : "text-blue-700 bg-blue-50 border-blue-200"
            }`}
          >
            📊 Menampilkan {filteredData.length} data dari{" "}
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
          </div>
        )}
      </div>

      {/* Loading / Empty */}
      {loading ? (
        <div className="text-center py-16 text-gray-500">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          </div>
          <p className="text-sm font-medium">Memuat data...</p>
        </div>
      ) : paginatedData.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-lg font-medium text-gray-700">Tidak ada data</p>
          <p className="text-sm text-gray-500 mt-1">
            {isFiltered
              ? "Tidak ada data pada rentang tanggal yang dipilih"
              : "Belum ada data realisasi mingguan"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="min-w-[1200px] w-full text-sm text-center border-collapse">
            <thead className="sticky top-0 z-20 bg-gray-100">
              <tr>
                <th rowSpan={2} className="border px-3 py-2 bg-yellow-400">
                  Tanggal
                </th>
                <th colSpan={12} className="border px-2 py-2 bg-blue-200">
                  Pagu Anggaran
                </th>
                <th colSpan={6} className="border px-2 py-2 bg-green-200">
                  Realisasi
                </th>
                <th colSpan={8} className="border px-2 py-2 bg-purple-200">
                  Target
                </th>
                <th colSpan={8} className="border px-2 py-2 bg-pink-200">
                  Sisa Pagu
                </th>
                <th rowSpan={2} className="border px-2 py-2 bg-orange-200">
                  Kenaikan
                </th>
              </tr>
              <tr>
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
                    className="border px-2 py-1 bg-blue-50 text-blue-900 font-semibold"
                  >
                    {label}
                  </th>
                ))}
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
                    className="border px-2 py-1 bg-green-50 text-green-900 font-semibold"
                  >
                    {label}
                  </th>
                ))}
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
                    className="border px-2 py-1 bg-purple-50 text-purple-900 font-semibold"
                  >
                    {label}
                  </th>
                ))}
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
                    className="border px-2 py-1 bg-pink-50 text-pink-900 font-semibold"
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
                  className={`border-b ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="border px-3 py-2 font-semibold text-gray-800 bg-yellow-50">
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
                        className={`border px-2 py-2 text-gray-700 ${
                          key.includes("persentase") ? "font-semibold" : ""
                        }`}
                      >
                        {formatValue(key, value)}
                      </td>
                    ))}
                  <td className="border px-2 py-2 font-bold text-orange-700 bg-orange-50">
                    {formatValue("kenaikan", row.kenaikan)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end items-center gap-2 my-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className={`px-3 py-1 border rounded ${
                  currentPage === 1
                    ? "border-gray-300 text-gray-300 cursor-not-allowed"
                    : "border-gray-200 text-gray-400 hover:bg-gray-300 hover:text-white"
                }`}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "border border-blue-600/50 text-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className={`px-3 py-1 border rounded ${
                  currentPage === totalPages
                    ? "border-gray-300 text-gray-300 cursor-not-allowed"
                    : "border-gray-200 text-gray-400 hover:bg-gray-300 hover:text-white"
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-300 px-6 py-4 flex flex-wrap justify-between text-sm">
            <span className="text-gray-600 font-medium">
              Total Data:{" "}
              <span className="text-blue-600 font-bold">
                {filteredData.length}
              </span>{" "}
              data
            </span>
            <span className="text-gray-500 text-xs font-bold">
              Terakhir diperbarui:{" "}
              <span className="text-green-700">{lastUpdate}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
