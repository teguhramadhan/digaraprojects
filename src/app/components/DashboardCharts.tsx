"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";

type MonthlyData = {
  name: string;
  realisasi: number;
  target: number;
};

type Props = {
  dataBulanan: MonthlyData[];
  formatRupiah: (value: number) => string;
};

export default function DashboardCharts({ dataBulanan, formatRupiah }: Props) {
  console.log("📊 DashboardCharts - Data:", dataBulanan);

  // Pisahkan data berdasarkan kategori jika dataBulanan sudah gabungan
  // Atau jika dataBulanan sudah per kategori, langsung pakai

  return (
    <div className="mt-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <TrendingUp size={18} className="text-blue-500" />
          Perbandingan Rencana dan Realisasi Terakhir Tiap Bulan
        </h3>

        <div className="grid grid-cols-1 gap-8">
          <ChartSection
            title="Data Realisasi vs Target"
            data={dataBulanan}
            formatRupiah={formatRupiah}
          />
        </div>
      </div>
    </div>
  );
}

function ChartSection({
  title,
  data,
  formatRupiah,
}: {
  title: string;
  data: { name: string; realisasi: number; target: number }[];
  formatRupiah: (v: number) => string;
}) {
  return (
    <div className="w-full">
      <h1 className="text-center text-gray-700 mb-3 font-medium">{title}</h1>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `${v / 1_000_000_000}M`} />
          <Tooltip formatter={(v) => formatRupiah(v as number)} />
          <Legend />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Rencana (Target)"
          />
          <Line
            type="monotone"
            dataKey="realisasi"
            stroke="#2563EB"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Realisasi"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
