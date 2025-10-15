"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { RealisasiMingguan } from "@/app/type/realisasi";
import CardStat from "@/app/components/CardStats";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import {
  Calendar,
  AlertCircle,
  Users,
  Package,
  Building2,
  TrendingUp,
} from "lucide-react";
import DropdownTanggal from "../components/DropdownTanggal";
import CardStatsWithHeader from "../components/CardStatsWithHeader";

export default function Dashboard() {
  const [selectedTanggal, setSelectedTanggal] = useState<string>("");
  const [current, setCurrent] = useState<RealisasiMingguan | null>(null);
  const [tanggalList, setTanggalList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    fetchTanggalList();
  }, []);

  useEffect(() => {
    if (selectedTanggal) fetchDataByTanggal(selectedTanggal);
  }, [selectedTanggal]);

  const fetchTanggalList = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("realisasi_mingguan")
      .select("tanggal")
      .order("tanggal", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    if (data && data.length > 0) {
      const list = data.map((item) => item.tanggal);
      setTanggalList(list);
      setSelectedTanggal(list[0]);
    }
    setLoading(false);
  };

  const fetchDataByTanggal = async (tanggal: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("realisasi_mingguan")
      .select("*")
      .eq("tanggal", tanggal)
      .single();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setCurrent(data);
    setLoading(false);
  };

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  const getColor = (value: number | string) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "text-gray-700";
    return num < 50 ? "text-amber-700" : "text-emerald-700";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 p-8 space-y-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        <Topbar />

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard Realisasi Anggaran
              </h1>
              <p className="text-gray-600 text-sm">
                Monitoring dan analisis realisasi anggaran secara real-time
              </p>
            </div>
            <div className="flex flex-col justify-center items-center border border-blue-50 text-blue-400 px-6 py-3 rounded-xl shadow-xs">
              <p className="text-xs opacity-90">Tahun Anggaran</p>
              <p className="text-2xl font-bold">2025</p>
            </div>
          </div>

          <div className="relative">
            <Calendar
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500"
              size={20}
            />
            {tanggalList.length > 0 ? (
              <DropdownTanggal
                tanggalList={tanggalList}
                selectedTanggal={selectedTanggal}
                setSelectedTanggal={setSelectedTanggal}
              />
            ) : (
              <div className="text-center text-gray-500 py-4">
                Belum ada data realisasi di database
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium text-sm">Memuat data...</p>
          </div>
        ) : !current ? (
          <div className="flex flex-col justify-center items-center h-64 border-2 border-dashed border-gray-300 rounded-2xl">
            <div className="bg-yellow-100 rounded-full p-4 mb-4">
              <AlertCircle size={48} className="text-yellow-600" />
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Tidak ada data untuk ditampilkan
            </p>
            <p className="text-sm text-gray-500">
              Silakan tambahkan data realisasi di database
            </p>
          </div>
        ) : (
          <>
            {/* Card Stats */}
            <div className="text-gray-800 bg-white px-8 py-12 rounded-2xl shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <CardStat
                  title="Pagu"
                  value={formatRupiah(current.pagu_anggaran_pagu)}
                  percentage={current.pagu_anggaran_persentase_pagu}
                  color="bg-white text-gray-900"
                  icon={<Calendar size={20} />}
                />
                <CardStat
                  title="Realisasi"
                  value={formatRupiah(current.pagu_anggaran_realisasi)}
                  percentage={current.pagu_anggaran_persentase_realisasi}
                  color="bg-white text-gray-900"
                  icon={<TrendingUp size={20} />}
                />
                <CardStat
                  title="Target"
                  value={formatRupiah(current.target_pagu)}
                  percentage={current.target_persentase_pagu}
                  color="bg-white text-gray-900"
                  icon={<Package size={20} />}
                />
                <CardStat
                  title="Sisa Saldo"
                  value={formatRupiah(current.pagu_anggaran_sisa)}
                  percentage={current.pagu_anggaran_persentase_sisa}
                  color="bg-white text-gray-900"
                  icon={<AlertCircle size={20} />}
                />
                <CardStat
                  title="Kenaikan"
                  value={`${current.kenaikan}%`}
                  color="bg-white text-gray-900"
                  icon={<TrendingUp size={20} />}
                />
              </div>
            </div>

            {/* Belanja Section */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full w-full">
                {[
                  {
                    label: "Belanja Pegawai",
                    pagu: current.pagu_anggaran_belanja_pegawai,
                    paguPercent:
                      current.pagu_anggaran_persentase_belanja_pegawai,
                    realisasi: current.realisasi_belanja_pegawai,
                    realisasiPercent:
                      current.realisasi_persentase_belanja_pegawai,
                    target: current.target_belanja_pegawai,
                    targetPercent: current.target_persentase_belanja_pegawai,
                    sisa: current.sisa_pagu_belanja_pegawai,
                    sisaPercent: current.sisa_pagu_persentase_belanja_pegawai,
                    icon: <Users size={24} />,
                    color:
                      "flex flex-col justify-between bg-gradient-to-br from-sky-600 to-blue-700 text-white",
                  },
                  {
                    label: "Belanja Barang",
                    pagu: current.pagu_anggaran_belanja_barang,
                    paguPercent:
                      current.pagu_anggaran_persentase_belanja_barang,
                    realisasi: current.realisasi_belanja_barang,
                    realisasiPercent:
                      current.realisasi_persentase_belanja_barang,
                    target: current.target_belanja_barang,
                    targetPercent: current.target_persentase_belanja_barang,
                    sisa: current.sisa_pagu_belanja_barang,
                    sisaPercent: current.sisa_pagu_persentase_belanja_barang,
                    icon: <Package size={24} />,
                    color:
                      "bg-gradient-to-br from-emerald-600 to-green-700 text-white",
                  },
                  {
                    label: "Belanja Modal",
                    pagu: current.pagu_anggaran_belanja_modal,
                    paguPercent: current.pagu_anggaran_persentase_belanja_modal,
                    realisasi: current.realisasi_belanja_modal,
                    realisasiPercent:
                      current.realisasi_persentase_belanja_modal,
                    target: current.target_belanja_modal,
                    targetPercent: current.target_persentase_belanja_modal,
                    sisa: current.sisa_pagu_belanja_modal,
                    sisaPercent: current.sisa_pagu_persentase_belanja_modal,
                    icon: <Building2 size={24} />,
                    color:
                      "bg-gradient-to-br from-orange-600 to-amber-700 text-white",
                  },
                ].map((item, idx) => (
                  <CardStatsWithHeader
                    key={idx}
                    title={item.label}
                    value={formatRupiah(item.realisasi)}
                    pagu={formatRupiah(item.pagu)}
                    percentage={item.realisasiPercent}
                    icon={item.icon}
                    color={item.color}
                  />
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow-sm">
              <table className="min-w-[1200px] w-full text-sm text-center border-collapse text-gray-700">
                <thead className="bg-gray-100 uppercase text-md">
                  <tr className="text-center text-gray-600 font-semibold px-3 py-2">
                    <th className="px-3 py-2 bg-sky-400">Jenis Belanja</th>
                    <th className="px-3 py-2 bg-sky-400">Pagu</th>
                    <th className="px-3 py-2 bg-sky-400">Realisasi</th>
                    <th className="px-3 py-2 bg-sky-400">Target</th>
                    <th className="px-3 py-2 bg-sky-400">Sisa Saldo</th>
                  </tr>
                </thead>

                <tbody className="uppercase">
                  {[
                    {
                      label: "Belanja Pegawai",
                      pagu: current.pagu_anggaran_belanja_pegawai,
                      paguPercent:
                        current.pagu_anggaran_persentase_belanja_pegawai,
                      realisasi: current.realisasi_belanja_pegawai,
                      realisasiPercent:
                        current.realisasi_persentase_belanja_pegawai,
                      target: current.target_belanja_pegawai,
                      targetPercent: current.target_persentase_belanja_pegawai,
                      sisa: current.sisa_pagu_belanja_pegawai,
                      sisaPercent: current.sisa_pagu_persentase_belanja_pegawai,
                    },
                    {
                      label: "Belanja Barang",
                      pagu: current.pagu_anggaran_belanja_barang,
                      paguPercent:
                        current.pagu_anggaran_persentase_belanja_barang,
                      realisasi: current.realisasi_belanja_barang,
                      realisasiPercent:
                        current.realisasi_persentase_belanja_barang,
                      target: current.target_belanja_barang,
                      targetPercent: current.target_persentase_belanja_barang,
                      sisa: current.sisa_pagu_belanja_barang,
                      sisaPercent: current.sisa_pagu_persentase_belanja_barang,
                    },
                    {
                      label: "Belanja Modal",
                      pagu: current.pagu_anggaran_belanja_modal,
                      paguPercent:
                        current.pagu_anggaran_persentase_belanja_modal,
                      realisasi: current.realisasi_belanja_modal,
                      realisasiPercent:
                        current.realisasi_persentase_belanja_modal,
                      target: current.target_belanja_modal,
                      targetPercent: current.target_persentase_belanja_modal,
                      sisa: current.sisa_pagu_belanja_modal,
                      sisaPercent: current.sisa_pagu_persentase_belanja_modal,
                    },
                  ].map((item, idx) => (
                    <tr key={idx}>
                      <td className="text-xs px-3 py-2 bg-amber-200 font-semibold align-middle">
                        {item.label}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-col items-center">
                          <span
                            className={`font-bold ${getColor(
                              item.paguPercent
                            )}`}
                          >
                            {formatRupiah(item.pagu)}
                          </span>
                          <span
                            className={`text-xs ${getColor(item.paguPercent)}`}
                          >
                            {item.paguPercent} %
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-col items-center">
                          <span
                            className={`font-bold ${getColor(
                              item.realisasiPercent
                            )}`}
                          >
                            {formatRupiah(item.realisasi)}
                          </span>
                          <span
                            className={`text-xs ${getColor(
                              item.realisasiPercent
                            )}`}
                          >
                            {item.realisasiPercent} %
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-col items-center">
                          <span
                            className={`font-bold ${getColor(
                              item.targetPercent
                            )}`}
                          >
                            {formatRupiah(item.target)}
                          </span>
                          <span
                            className={`text-xs ${getColor(
                              item.targetPercent
                            )}`}
                          >
                            {item.targetPercent} %
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-col items-center">
                          <span
                            className={`font-bold ${getColor(
                              item.sisaPercent
                            )}`}
                          >
                            {formatRupiah(item.sisa)}
                          </span>
                          <span
                            className={`text-xs ${getColor(item.sisaPercent)}`}
                          >
                            {item.sisaPercent} %
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
