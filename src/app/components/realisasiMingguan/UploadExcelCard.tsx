"use client";

import { useState } from "react";
import { FileDown, RefreshCw } from "lucide-react";

export default function UploadExcelCard({
  fetchData,
}: {
  fetchData: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDownload = async () => {
    const res = await fetch("/api/download-template");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template-upload-anggaran.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) return setMessage("Pilih file terlebih dahulu!");
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-excel", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`✅ ${result.message}`);
        setFile(null);
        (document.getElementById("file-input") as HTMLInputElement).value = "";
        fetchData();
      } else {
        setMessage(`❌ ${result.error}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(`❌ Error: ${err.message}`);
      } else {
        setMessage("❌ Terjadi kesalahan tidak diketahui");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Upload File Excel
        </h2>
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md font-medium transition-all text-sm sm:text-base"
          >
            <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Download Template</span>
          </button>
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg shadow-md font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <RefreshCw className="w-4 h-4 animate-spin" /> Uploading...
              </span>
            ) : (
              "Upload Data"
            )}
          </button>
        </div>
      </div>

      <input
        id="file-input"
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600 file:mr-2 sm:file:mr-4 file:py-2 sm:file:py-3 file:px-3 sm:file:px-6 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 hover:border-blue-400 transition-colors"
      />

      {file && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          📄 File terpilih: <span className="font-semibold">{file.name}</span>
        </div>
      )}

      {message && (
        <div
          className={`mt-4 p-4 rounded-lg text-sm font-medium ${
            message.includes("✅")
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
