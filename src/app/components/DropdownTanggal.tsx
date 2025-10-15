"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function DropdownTanggal({
  tanggalList,
  selectedTanggal,
  setSelectedTanggal,
}: {
  tanggalList: string[];
  selectedTanggal: string;
  setSelectedTanggal: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const formatTanggal = (tgl: string) => {
    const date = new Date(tgl);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="relative w-64">
      <button
        onClick={() => setOpen(!open)}
        className="w-full border-2 border-gray-200 text-gray-700 rounded-xl px-4 py-3 text-base font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer bg-white hover:border-blue-300 flex justify-between items-center"
      >
        <span>
          {selectedTanggal
            ? formatTanggal(selectedTanggal)
            : "Pilih periode tanggal"}
        </span>
        <span
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      {open && (
        <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50 animate-fadeIn">
          {tanggalList.map((tanggal, idx) => (
            <li
              key={idx}
              className={`px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer ${
                tanggal === selectedTanggal ? "bg-blue-100" : ""
              }`}
              onClick={() => {
                setSelectedTanggal(tanggal);
                setOpen(false);
              }}
            >
              {formatTanggal(tanggal)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
