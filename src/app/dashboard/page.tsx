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
import DashboardCharts from "../components/DashboardCharts";

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
    if (selectedTanggal) {
      fetchDataByTanggal(selectedTanggal);
    } else {
      setCurrent(null);
    }
  }, [selectedTanggal]);

  const fetchTanggalList = async () => {
    const { data, error } = await supabase
      .from("realisasi_mingguan")
      .select("tanggal")
      .order("tanggal", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    if (data) {
      const list = data.map((item) => item.tanggal);
      setTanggalList(list);
      setLoading(false);
    }
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Konten utama menyesuaikan lebar sidebar */}
      <div
        className={`flex-1 p-8 space-y-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        <Topbar />

        {/* Header Section */}
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

          {/* Date Selector */}
          <div className="relative">
            <Calendar
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500"
              size={20}
            />
            <DropdownTanggal
              tanggalList={tanggalList}
              selectedTanggal={selectedTanggal}
              setSelectedTanggal={setSelectedTanggal}
            />
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <p className="text-gray-600 font-medium">Memuat data...</p>
            </div>
          </div>
        ) : !selectedTanggal ? (
          <div className="flex flex-col justify-center items-center h-64 bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300">
            <div className="bg-blue-100 rounded-full p-4 mb-4">
              <Calendar size={48} className="text-blue-500" />
            </div>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Pilih Periode Tanggal
            </p>
            <p className="text-sm text-gray-600">
              Silakan pilih tanggal untuk melihat data realisasi anggaran
            </p>
          </div>
        ) : !current ? (
          <div className="flex flex-col justify-center items-center h-64 bg-white rounded-2xl shadow-lg border-2 border-yellow-200">
            <div className="bg-yellow-100 rounded-full p-4 mb-4">
              <AlertCircle size={48} className="text-yellow-600" />
            </div>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Data Tidak Tersedia
            </p>
            <p className="text-sm text-gray-600">
              Tidak ada data untuk tanggal {selectedTanggal}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Grid */}
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
              {/* Charts Section */}
              <DashboardCharts current={current} formatRupiah={formatRupiah} />
            </div>

            {/* Realisasi Belanja Section */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full w-full">
                <CardStatsWithHeader
                  title="Belanja Pegawai"
                  value={formatRupiah(current.realisasi_belanja_pegawai)}
                  pagu={formatRupiah(current.pagu_anggaran_belanja_pegawai)}
                  percentage={current.realisasi_persentase_belanja_pegawai}
                  icon={<Users size={24} />}
                  color="flex flex-col justify-between bg-gradient-to-br from-sky-600 to-blue-700 text-white"
                />

                <CardStatsWithHeader
                  title="Belanja Barang"
                  value={formatRupiah(current.realisasi_belanja_barang)}
                  pagu={formatRupiah(current.pagu_anggaran_belanja_barang)}
                  percentage={current.realisasi_persentase_belanja_barang}
                  color="bg-gradient-to-br from-emerald-600 to-green-700 text-white"
                  icon={<Package size={24} />}
                />
                <CardStatsWithHeader
                  title="Belanja Modal"
                  value={formatRupiah(current.realisasi_belanja_modal)}
                  pagu={formatRupiah(current.pagu_anggaran_belanja_modal)}
                  percentage={current.realisasi_persentase_belanja_modal}
                  color="bg-gradient-to-br from-orange-600 to-amber-700 text-white"
                  icon={<Building2 size={24} />}
                />
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl shadow-sm">
              <table className="min-w-[1200px] w-full text-sm text-center border-collapse text-gray-700">
                <thead className="bg-gray-100 uppercase text-md">
                  <tr className="text-center text-gray-600 font-semibold px-3 py-2">
                    <th className="px-3 py-2 bg-sky-400 ">Pagu</th>
                    <th className="px-3 py-2 bg-sky-400 ">Jenis Belanja</th>
                    <th className="px-3 py-2 bg-sky-400 ">Realisasi</th>
                    <th className="px-3 py-2 bg-sky-400 ">Target</th>
                    <th className="px-3 py-2 bg-sky-400 ">Sisa Saldo</th>
                  </tr>
                </thead>

                <tbody className="uppercase">
                  {/* Belanja Pegawai */}
                  <tr>
                    <td className="text-xs px-3 py-2 bg-amber-200 font-semibold align-middle">
                      Belanja Pegawai
                    </td>
                    <td className="px-3 py-2 ">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">
                          {formatRupiah(current.pagu_anggaran_belanja_pegawai)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {current.pagu_anggaran_persentase_belanja_pegawai} %
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 ">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">
                          {formatRupiah(current.realisasi_belanja_pegawai)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {current.realisasi_persentase_belanja_pegawai} %
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 ">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">
                          {formatRupiah(current.target_belanja_pegawai)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {current.target_persentase_belanja_pegawai} %
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 ">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">
                          {formatRupiah(current.sisa_pagu_belanja_pegawai)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {current.sisa_pagu_persentase_belanja_pegawai} %
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Belanja Barang */}
                  <tr>
                    <td className="text-xs px-3 py-2 bg-amber-200 font-semibold align-middle">
                      Belanja Barang
                    </td>
                    <td className="px-3 py-2 ">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">
                          {formatRupiah(current.pagu_anggaran_belanja_barang)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {current.pagu_anggaran_persentase_belanja_barang} %
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">
                          {formatRupiah(current.realisasi_belanja_barang)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {current.realisasi_persentase_belanja_barang} %
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">
                          {formatRupiah(current.target_belanja_barang)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {current.target_persentase_belanja_barang} %
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">
                          {formatRupiah(current.sisa_pagu_belanja_barang)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {current.sisa_pagu_persentase_belanja_barang} %
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Belanja Modal */}
                  <tr>
                    <td className="text-xs px-3 py-2 bg-amber-200 font-semibold align-middle">
                      Belanja Modal
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">
                          {formatRupiah(current.pagu_anggaran_belanja_modal)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {current.pagu_anggaran_persentase_belanja_modal} %
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">
                          {formatRupiah(current.realisasi_belanja_modal)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {current.realisasi_persentase_belanja_modal} %
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">
                          {formatRupiah(current.target_belanja_modal)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {current.target_persentase_belanja_modal} %
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">
                          {formatRupiah(current.sisa_pagu_belanja_modal)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {current.sisa_pagu_persentase_belanja_modal} %
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
