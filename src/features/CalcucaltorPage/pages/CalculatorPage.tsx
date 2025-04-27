import { SectionContainer } from "../../../layouts/Section";
import { useState } from "react";

export const CalculatorPage = () => {
  const [pinjaman, setPinjaman] = useState("");
  const [bunga, setBunga] = useState("");
  const [bulan, setBulan] = useState("");
  const [telat, setTelat] = useState("");
  const [denda, setDenda] = useState("");
  const [hasil, setHasil] = useState<{
    totalBayar: number;
    totalDenda: number;
    totalAkhir: number;
  } | null>(null);

  const hitungSimulasi = () => {
    const pinjamanNum = parseFloat(pinjaman) || 0;
    const bungaNum = parseFloat(bunga) || 0;
    const bulanNum = parseInt(bulan) || 0;
    const telatNum = parseInt(telat) || 0;
    const dendaNum = parseFloat(denda) || 0;

    const r = 1 + bungaNum / 100;
    const totalBayar = pinjamanNum * Math.pow(r, bulanNum);
    const totalDenda =
      telatNum > 0 ? pinjamanNum * (dendaNum / 100) * telatNum : 0;
    const totalAkhir = totalBayar + totalDenda;

    setHasil({ totalBayar, totalDenda, totalAkhir });
  };

  return (
    <SectionContainer
      padded
      className="flex min-h-screen w-full flex-col justify-center items-center mb-20"
    >
      <div className="flex flex-col items-center justify-center space-y-8 max-w-xl w-full  p-4">
        <h1 className="text-5xl text-center font-semibold text-secondary">
          Kalkulator <span className="text-primary">Simulasi Pinjol</span>
        </h1>

        <p className="text-center font-light text-md text-secondary px-8 md:px-16">
          Cek seberapa besar bunga dan denda yang harus kamu bayar jika meminjam
          dari pinjol.
        </p>

        <div className="w-full space-y-4 bg-white border-2 p-4 rounded-2xl ">
          <label className="block">
            Jumlah Pinjaman (Rp):
            <input
              type="number"
              value={pinjaman}
              onChange={(e) => setPinjaman(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            Bunga per Bulan (%):
            <input
              type="number"
              value={bunga}
              onChange={(e) => setBunga(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            Lama Pinjaman (bulan):
            <input
              type="number"
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            Jumlah Bulan Terlambat:
            <input
              type="number"
              value={telat}
              onChange={(e) => setTelat(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            Denda per Bulan Telat (% dari pinjaman awal):
            <input
              type="number"
              value={denda}
              onChange={(e) => setDenda(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </label>

          <button
            onClick={hitungSimulasi}
            className="mt-4 w-full bg-primary text-white py-2 rounded shadow hover:opacity-90"
          >
            Hitung Simulasi
          </button>
        </div>

        {hasil && (
          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 w-full">
            <p>
              <strong>Total pembayaran setelah {bulan} bulan:</strong> Rp
              {hasil.totalBayar.toFixed(0)}
            </p>
            <p>
              <strong>Denda keterlambatan:</strong> Rp
              {hasil.totalDenda.toFixed(0)}
            </p>
            <p>
              <strong>Total yang harus dibayar:</strong>{" "}
              <span className="text-red-700 font-bold">
                Rp{hasil.totalAkhir.toFixed(0)}
              </span>
            </p>
            <p className="mt-2 italic text-sm text-red-700">
              ⚠️ Hati-hati! Pinjaman online dengan bunga majemuk dan denda
              keterlambatan dapat membuat total utang membengkak drastis.
            </p>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};
