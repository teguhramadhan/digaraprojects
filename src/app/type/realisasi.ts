// src/app/type/realisasi.ts

export type RealisasiMingguan = {
  id: string;
  tanggal: string;
  created_at?: string;
  updatedAt?: string;

  // Pagu Anggaran
  pagu_anggaran_pagu: number;
  pagu_anggaran_persentase_pagu: number;
  pagu_anggaran_realisasi: number;
  pagu_anggaran_persentase_realisasi: number;
  pagu_anggaran_sisa: number;
  pagu_anggaran_persentase_sisa: number;
  pagu_anggaran_belanja_pegawai: number;
  pagu_anggaran_persentase_belanja_pegawai: number;
  pagu_anggaran_belanja_barang: number;
  pagu_anggaran_persentase_belanja_barang: number;
  pagu_anggaran_belanja_modal: number;
  pagu_anggaran_persentase_belanja_modal: number;

  // Realisasi
  realisasi_belanja_pegawai: number;
  realisasi_persentase_belanja_pegawai: number;
  realisasi_belanja_barang: number;
  realisasi_persentase_belanja_barang: number;
  realisasi_belanja_modal: number;
  realisasi_persentase_belanja_modal: number;

  // Target
  target_pagu: number;
  target_persentase_pagu: number;
  target_belanja_pegawai: number;
  target_persentase_belanja_pegawai: number;
  target_belanja_barang: number;
  target_persentase_belanja_barang: number;
  target_belanja_modal: number;
  target_persentase_belanja_modal: number;

  // Sisa Pagu
  sisa_pagu_sisa_pagu: number;
  sisa_pagu_persentase_sisa_pagu: number;
  sisa_pagu_belanja_pegawai: number;
  sisa_pagu_persentase_belanja_pegawai: number;
  sisa_pagu_belanja_barang: number;
  sisa_pagu_persentase_belanja_barang: number;
  sisa_pagu_belanja_modal: number;
  sisa_pagu_persentase_belanja_modal: number;

  // Lainnya
  kenaikan: number;
};
