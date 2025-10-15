"use client";
import React, { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import * as XLSX from "xlsx";

interface UploadExcelCardProps {
  fetchData: () => void;
}

export default function UploadExcelCard({ fetchData }: UploadExcelCardProps) {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = evt.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Simpan ke Supabase
      for (const row of jsonData) {
        await supabase.from("realisasi_mingguan").upsert(row);
      }

      setLoading(false);
      fetchData(); // refresh data
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center gap-4">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="cursor-pointer"
      />
      {loading && <p className="text-gray-500 text-sm">Mengunggah...</p>}
    </div>
  );
}
