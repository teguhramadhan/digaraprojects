import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { supabase } from "@/app/lib/supabase";
import { RealisasiMingguan } from "@/app/type/realisasi";
import { v4 as uuidv4 } from "uuid";

type ExcelCell = string | number | null;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "File tidak ditemukan" },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const allData: ExcelCell[][] = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: null,
    });

    if (allData.length < 3) {
      return NextResponse.json(
        {
          error:
            "File Excel harus memiliki minimal 3 baris (2 header + 1 data)",
        },
        { status: 400 }
      );
    }

    const dataRows = allData.slice(2);
    const filteredData: ExcelCell[][] = dataRows.filter((row) =>
      row.some(
        (cell) =>
          cell !== null && cell !== undefined && String(cell).trim() !== ""
      )
    );

    const parseDate = (value: ExcelCell): string => {
      if (!value) return new Date().toISOString().split("T")[0];
      if (typeof value === "number") {
        const base = new Date(1899, 11, 30);
        const date = new Date(base.getTime() + value * 86400000);
        return date.toISOString().split("T")[0];
      }
      if (typeof value === "string") {
        const parsed = new Date(value);
        return isNaN(parsed.getTime())
          ? new Date().toISOString().split("T")[0]
          : parsed.toISOString().split("T")[0];
      }
      return new Date().toISOString().split("T")[0];
    };

    const toInt = (v: ExcelCell): number => {
      if (!v) return 0;
      if (typeof v === "number") return Math.round(v);
      if (typeof v === "string") v = v.replace(/\./g, "").replace(/,/g, ".");
      const parsed = parseFloat(v);
      return isNaN(parsed) ? 0 : Math.round(parsed);
    };

    const toFloat = (v: ExcelCell): number => {
      if (!v) return 0;
      if (typeof v === "number") return parseFloat(v.toFixed(2));
      if (typeof v === "string") v = v.replace(/%/g, "").replace(/,/g, ".");
      const parsed = parseFloat(v);
      return isNaN(parsed) ? 0 : parseFloat(parsed.toFixed(2));
    };

    const mapped: RealisasiMingguan[] = filteredData.map((row) => ({
      id: uuidv4(),
      tanggal: parseDate(row[0]),
      pagu_anggaran_pagu: toInt(row[1]),
      pagu_anggaran_persentase_pagu: toFloat(row[2]),
      pagu_anggaran_realisasi: toInt(row[3]),
      pagu_anggaran_persentase_realisasi: toFloat(row[4]),
      pagu_anggaran_sisa: toInt(row[5]),
      pagu_anggaran_persentase_sisa: toFloat(row[6]),
      pagu_anggaran_belanja_pegawai: toInt(row[7]),
      pagu_anggaran_persentase_belanja_pegawai: toFloat(row[8]),
      pagu_anggaran_belanja_barang: toInt(row[9]),
      pagu_anggaran_persentase_belanja_barang: toFloat(row[10]),
      pagu_anggaran_belanja_modal: toInt(row[11]),
      pagu_anggaran_persentase_belanja_modal: toFloat(row[12]),
      realisasi_belanja_pegawai: toInt(row[13]),
      realisasi_persentase_belanja_pegawai: toFloat(row[14]),
      realisasi_belanja_barang: toInt(row[15]),
      realisasi_persentase_belanja_barang: toFloat(row[16]),
      realisasi_belanja_modal: toInt(row[17]),
      realisasi_persentase_belanja_modal: toFloat(row[18]),
      target_pagu: toInt(row[19]),
      target_persentase_pagu: toFloat(row[20]),
      target_belanja_pegawai: toInt(row[21]),
      target_persentase_belanja_pegawai: toFloat(row[22]),
      target_belanja_barang: toInt(row[23]),
      target_persentase_belanja_barang: toFloat(row[24]),
      target_belanja_modal: toInt(row[25]),
      target_persentase_belanja_modal: toFloat(row[26]),
      sisa_pagu_sisa_pagu: toInt(row[27]),
      sisa_pagu_persentase_sisa_pagu: toFloat(row[28]),
      sisa_pagu_belanja_pegawai: toInt(row[29]),
      sisa_pagu_persentase_belanja_pegawai: toFloat(row[30]),
      sisa_pagu_belanja_barang: toInt(row[31]),
      sisa_pagu_persentase_belanja_barang: toFloat(row[32]),
      sisa_pagu_belanja_modal: toInt(row[33]),
      sisa_pagu_persentase_belanja_modal: toFloat(row[34]),
      kenaikan: toFloat(row[35]),
    }));

    const { data, error } = await supabase
      .from("realisasi_mingguan")
      .insert(mapped)
      .select();

    if (error) {
      return NextResponse.json(
        { error: "Gagal menyimpan: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Berhasil upload ${data.length} data`,
    });
  } catch (err) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    return NextResponse.json(
      { error: "Terjadi kesalahan: " + error.message },
      { status: 500 }
    );
  }
}
