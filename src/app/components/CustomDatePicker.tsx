"use client";
import { useState } from "react";
import { Calendar } from "lucide-react";

export default function CustomDatePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="relative w-52">
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        <Calendar className="inline w-3 h-3 mr-1" />
        {label}
      </label>
      <div
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer hover:border-gray-400 transition"
      >
        <span>{value || "Pilih tanggal"}</span>
        <Calendar className="w-4 h-4 text-gray-500" />
      </div>

      {showCalendar && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <input
            type="date"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setShowCalendar(false);
            }}
            className="w-full p-2 text-sm outline-none"
          />
        </div>
      )}
    </div>
  );
}
