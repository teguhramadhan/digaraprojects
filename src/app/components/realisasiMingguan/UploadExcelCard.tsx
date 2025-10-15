"use client";

import { useState } from "react";
import { FileDown, RefreshCw, X } from "lucide-react";

export default function UploadExcelCard({
  fetchData,
}: {
  fetchData: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

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
  };

  const clearFile = () => {
    setFile(null);
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const showPopupMessage = (message: string, success: boolean) => {
    setPopupMessage(message);
    setIsSuccess(success);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    // Hanya redirect jika sukses
    if (isSuccess) {
      window.location.href = "/realisasi/realisasi_mingguan";
    }
    // Jika gagal, tidak redirect - hanya menutup popup
  };

  const handleUpload = async () => {
    if (!file) {
      showPopupMessage("Pilih file terlebih dahulu!", false);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-excel", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        showPopupMessage(`✅ ${result.message}`, true);
        clearFile();
        fetchData();
      } else {
        showPopupMessage(`❌ ${result.error}`, false);
        clearFile(); // Tetap hapus file meskipun gagal
      }
    } catch (err: unknown) {
      let errorMessage = "❌ Terjadi kesalahan tidak diketahui";
      if (err instanceof Error) {
        errorMessage = `❌ Error: ${err.message}`;
      }
      showPopupMessage(errorMessage, false);
      clearFile(); // Tetap hapus file meskipun error
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
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md font-medium transition-all text-sm sm:text-base"
        >
          <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Download Template</span>
        </button>
      </div>

      <input
        id="file-input"
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600 file:mr-2 sm:file:mr-4 file:py-2 sm:file:py-3 file:px-3 sm:file:px-6 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 hover:border-blue-400 transition-colors"
      />

      {file && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 flex justify-between items-center">
          <div>
            📄 File terpilih: <span className="font-semibold">{file.name}</span>
          </div>
          <button
            onClick={clearFile}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tombol Upload dipindah ke bawah input file */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-lg shadow-md font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-sm sm:text-base flex items-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload Data"
          )}
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto transform transition-all">
            <div className="p-6">
              <div
                className={`text-center ${
                  isSuccess ? "text-green-600" : "text-red-600"
                } mb-4`}
              >
                {isSuccess ? (
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <h3
                className={`text-lg font-semibold text-center mb-2 ${
                  isSuccess ? "text-green-800" : "text-red-800"
                }`}
              >
                {isSuccess ? "Upload Berhasil!" : "Upload Gagal!"}
              </h3>
              <p className="text-gray-600 text-center mb-6">{popupMessage}</p>
              <div className="flex justify-center">
                <button
                  onClick={closePopup}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    isSuccess
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  {isSuccess ? "Lanjutkan" : "Tutup"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
