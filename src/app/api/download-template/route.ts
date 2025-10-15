import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    const headerRow1 = [
      "Tanggal",
      "Pagu Anggaran",
      "Pagu Anggaran",
      "Pagu Anggaran",
      "Pagu Anggaran",
      "Pagu Anggaran",
      "Pagu Anggaran",
      "Pagu Anggaran",
      "Pagu Anggaran",
      "Pagu Anggaran",
      "Pagu Anggaran",
      "Pagu Anggaran",
      "Pagu Anggaran",
      "Realisasi",
      "Realisasi",
      "Realisasi",
      "Realisasi",
      "Realisasi",
      "Realisasi",
      "Target",
      "Target",
      "Target",
      "Target",
      "Target",
      "Target",
      "Target",
      "Target",
      "Sisa Pagu",
      "Sisa Pagu",
      "Sisa Pagu",
      "Sisa Pagu",
      "Sisa Pagu",
      "Sisa Pagu",
      "Sisa Pagu",
      "Sisa Pagu",
      "Kenaikan",
    ];

    const headerRow2 = [
      "Tanggal",
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
      "Belanja Pegawai",
      "%",
      "Belanja Barang",
      "%",
      "Belanja Modal",
      "%",
      "Pagu",
      "%",
      "Belanja Pegawai",
      "%",
      "Belanja Barang",
      "%",
      "Belanja Modal",
      "%",
      "Sisa Pagu",
      "%",
      "Belanja Pegawai",
      "%",
      "Belanja Barang",
      "%",
      "Belanja Modal",
      "%",
      "Kenaikan",
    ];

    const exampleRow = [
      "1 Agustus 2025",
      "118314261000",
      "100",
      "51271436951",
      "43.33",
      "67042824049",
      "56.67",
      "38097926000",
      "32.20",
      "69181335000",
      "58.47",
      "11035000000",
      "9.33",
      "26273934535",
      "68.96",
      "23421762113",
      "33.86",
      "1575740303",
      "14.28",
      "18634413728",
      "75.17",
      "446130441",
      "76.12",
      "424683280",
      "19.87",
      "8876995250",
      "88.45",
      "67042824050",
      "56.67",
      "11823991465",
      "31.04",
      "45759572887",
      "66.14",
      "9459259697",
      "85.72",
      "2.39",
    ];

    const emptyRow = Array(headerRow2.length).fill("");

    const sheetData = [
      headerRow1,
      headerRow2,
      exampleRow,
      emptyRow,
      emptyRow,
      emptyRow,
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
      { s: { r: 0, c: 1 }, e: { r: 0, c: 12 } },
      { s: { r: 0, c: 13 }, e: { r: 0, c: 18 } },
      { s: { r: 0, c: 19 }, e: { r: 0, c: 26 } },
      { s: { r: 0, c: 27 }, e: { r: 0, c: 34 } },
      { s: { r: 0, c: 35 }, e: { r: 1, c: 35 } },
    ];

    worksheet["!cols"] = Array(headerRow2.length).fill({ wch: 18 });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template Upload");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          "attachment; filename=template-upload-anggaran.xlsx",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error generating Excel:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
