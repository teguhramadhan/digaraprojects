"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  PieLabelRenderProps,
} from "recharts";
import { TrendingUp, Package, Users } from "lucide-react";
import { RealisasiMingguan } from "@/app/type/realisasi";

type Props = {
  current: RealisasiMingguan;
  formatRupiah: (value: number) => string;
};

export default function DashboardCharts({ current, formatRupiah }: Props) {
  const dataLine = [
    { name: "Jan", realisasi: 12000000000, target: 15000000000 },
    { name: "Feb", realisasi: 9000000000, target: 13000000000 },
    { name: "Mar", realisasi: 15000000000, target: 15000000000 },
    { name: "Apr", realisasi: 18000000000, target: 17000000000 },
  ];

  const dataBar = [
    {
      name: "Pegawai",
      realisasi: current.realisasi_belanja_pegawai,
      pagu: current.pagu_anggaran_belanja_pegawai,
    },
    {
      name: "Barang",
      realisasi: current.realisasi_belanja_barang,
      pagu: current.pagu_anggaran_belanja_barang,
    },
    {
      name: "Modal",
      realisasi: current.realisasi_belanja_modal,
      pagu: current.pagu_anggaran_belanja_modal,
    },
  ];

  const dataPie = [
    { name: "Pegawai", value: current.realisasi_belanja_pegawai ?? 0 },
    { name: "Barang", value: current.realisasi_belanja_barang ?? 0 },
    { name: "Modal", value: current.realisasi_belanja_modal ?? 0 },
  ];

  const renderPieLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } =
      props;

    if (
      typeof cx !== "number" ||
      typeof cy !== "number" ||
      typeof midAngle !== "number" ||
      typeof innerRadius !== "number" ||
      typeof outerRadius !== "number" ||
      typeof percent !== "number"
    ) {
      return null; // skip jika ada nilai tidak valid
    }

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${dataPie[index].name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Line Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-blue-500" />
          Tren Realisasi Periode
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataLine}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(v) => `${v / 1000000000}M`} />
            <Tooltip formatter={(v) => formatRupiah(v as number)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="realisasi"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Package size={18} className="text-green-500" />
          Perbandingan Jenis Belanja
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataBar}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(v) => `${v / 1000000000}M`} />
            <Tooltip formatter={(v) => formatRupiah(v as number)} />
            <Legend />
            <Bar dataKey="pagu" fill="#d1d5db" radius={[4, 4, 0, 0]} />
            <Bar dataKey="realisasi" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users size={18} className="text-amber-500" />
          Proporsi Realisasi Belanja
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={dataPie}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={renderPieLabel}
            >
              <Cell fill="#3b82f6" />
              <Cell fill="#10b981" />
              <Cell fill="#f59e0b" />
            </Pie>
            <Tooltip formatter={(v) => formatRupiah(v as number)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
