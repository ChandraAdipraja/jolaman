import { SectionContainer } from "../../../layouts/Section";
import { useState, useEffect, ChangeEvent } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FaClipboardCheck, FaInfo } from "react-icons/fa6";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  ChartLegend
);

export const CalculatorPage = () => {
  const [pinjaman, setPinjaman] = useState("");
  const [bunga, setBunga] = useState("");
  const [bulan, setBulan] = useState("");
  const [telat, setTelat] = useState("");
  const [denda, setDenda] = useState("");
  const [tipeHitungan, setTipeHitungan] = useState("majemuk");
  const [mandatoryFieldsValid, setMandatoryFieldsValid] = useState(false);
  const [info, setInfo] = useState(false);

  const [errors, setErrors] = useState<{
    pinjaman: string;
    bunga: string;
    bulan: string;
    telat: string;
  }>({
    pinjaman: "",
    bunga: "",
    bulan: "",
    telat: "",
  });

  const [hasil, setHasil] = useState<{
    totalBayar: number;
    totalDenda: number;
    totalAkhir: number;
    angsuranPerBulan: number;
    detailCicilan: Array<{
      bulan: number;
      angsuran: number;
      bunga: number;
      pokok: number;
      sisaPinjaman: number;
    }>;
  } | null>(null);

  // Format angka menjadi format rupiah
  const formatRupiah = (angka: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);
  };

  const cleanNumber = (str: string): string => {
    return str.replace(/\./g, "").replace(/,/g, "").replace(/[^\d]/g, "");
  };

  // Cek apakah field wajib sudah diisi dengan benar
  useEffect(() => {
    const pinjamanValid =
      pinjaman !== "" && parseFloat(cleanNumber(pinjaman)) > 0;
    const bungaValid = bunga !== "" && parseFloat(bunga) > 0;
    const bulanValid = bulan !== "" && parseInt(bulan) > 0;

    setMandatoryFieldsValid(pinjamanValid && bungaValid && bulanValid);
  }, [pinjaman, bunga, bulan]);

  // Format input pinjaman dengan separator ribuan
  const handlePinjamanChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = cleanNumber(e.target.value);
    if (value === "" || parseFloat(value) > 0) {
      const formattedValue =
        value === ""
          ? ""
          : new Intl.NumberFormat("id-ID").format(parseFloat(value));
      setPinjaman(formattedValue);
      setErrors((prev) => ({ ...prev, pinjaman: "" }));
    }
  };

  const handleBungaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Hanya menerima angka positif atau kosong
    if (value === "" || (parseFloat(value) >= 0 && !value.startsWith("-"))) {
      setBunga(value);
      setErrors((prev) => ({ ...prev, bunga: "" }));
    }
  };

  const handleBulanChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Hanya menerima angka positif atau kosong
    if (value === "" || (parseInt(value) > 0 && !value.startsWith("-"))) {
      setBulan(value);
      setErrors((prev) => ({ ...prev, bulan: "" }));
    }
  };

  const handleTelatChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Hanya menerima angka positif atau kosong
    if (value === "" || (parseInt(value) >= 0 && !value.startsWith("-"))) {
      setTelat(value);
      setErrors((prev) => ({ ...prev, telat: "" }));
    }
  };

  const handleDendaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Hanya menerima angka positif atau kosong
    if (value === "" || (parseFloat(value) >= 0 && !value.startsWith("-"))) {
      setDenda(value);
    }
  };

  const validateInputs = () => {
    const newErrors: {
      pinjaman?: string;
      bunga?: string;
      bulan?: string;
      telat?: string;
    } = {};

    if (!pinjaman || parseFloat(cleanNumber(pinjaman)) === 0) {
      newErrors.pinjaman = "Jumlah Pinjaman wajib diisi.";
    }
    if (!bunga || parseFloat(bunga) === 0) {
      newErrors.bunga = "Bunga per Bulan wajib diisi.";
    }
    if (!bulan || parseInt(bulan) === 0) {
      newErrors.bulan = "Lama Pinjaman wajib diisi.";
    }

    setErrors({
      pinjaman: newErrors.pinjaman || "",
      bunga: newErrors.bunga || "",
      bulan: newErrors.bulan || "",
      telat: newErrors.telat || "",
    });

    return Object.keys(newErrors).length === 0;
  };

  const hitungSimulasi = () => {
    if (!validateInputs()) return;

    const pinjamanNum = parseFloat(cleanNumber(pinjaman)) || 0;
    const bungaNum = parseFloat(bunga) || 0;
    const bulanNum = parseInt(bulan) || 0;
    const telatNum = parseInt(telat) || 0;
    const dendaNum = parseFloat(denda) || 0;

    let totalBayar = 0;
    let angsuranPerBulan = 0;

    // Hitung berdasarkan tipe bunga yang dipilih
    if (tipeHitungan === "majemuk") {
      // Bunga majemuk (seperti kode awal)
      const r = 1 + bungaNum / 100;
      totalBayar = pinjamanNum * Math.pow(r, bulanNum);
      angsuranPerBulan = totalBayar / bulanNum;
    } else {
      // Bunga flat (sederhana)
      const bungaTotal = pinjamanNum * (bungaNum / 100) * bulanNum;
      totalBayar = pinjamanNum + bungaTotal;
      angsuranPerBulan = totalBayar / bulanNum;
    }

    // Hitung denda jika ada keterlambatan
    const totalDenda =
      telatNum > 0 ? pinjamanNum * (dendaNum / 100) * telatNum : 0;
    const totalAkhir = totalBayar + totalDenda;

    // Buat detail cicilan per bulan
    const detailCicilan = [];
    let sisaPinjaman = pinjamanNum;

    for (let i = 1; i <= bulanNum; i++) {
      let bungaBulan = 0;
      let pokok = 0;

      if (tipeHitungan === "majemuk") {
        bungaBulan = sisaPinjaman * (bungaNum / 100);
        pokok = angsuranPerBulan - bungaBulan;
      } else {
        bungaBulan = pinjamanNum * (bungaNum / 100);
        pokok = pinjamanNum / bulanNum;
      }

      sisaPinjaman -= pokok;

      detailCicilan.push({
        bulan: i,
        angsuran: angsuranPerBulan,
        bunga: bungaBulan,
        pokok: pokok,
        sisaPinjaman: Math.max(0, sisaPinjaman),
      });
    }

    setHasil({
      totalBayar,
      totalDenda,
      totalAkhir,
      angsuranPerBulan,
      detailCicilan,
    });
  };

  const resetForm = () => {
    setPinjaman("");
    setBunga("");
    setBulan("");
    setTelat("");
    setDenda("");
    setTipeHitungan("majemuk");
    setHasil(null);
    setMandatoryFieldsValid(false);
    setErrors({
      pinjaman: "",
      bunga: "",
      bulan: "",
      telat: "",
    });
  };

  // Mengubah data cicilan untuk grafik Chart.js
  const prepareChartData = () => {
    if (!hasil) return { labels: [], datasets: [] };

    const labels = hasil.detailCicilan.map((item) => `Bulan ${item.bulan}`);

    const pokokData = hasil.detailCicilan.map((item) => Math.round(item.pokok));
    const bungaData = hasil.detailCicilan.map((item) => Math.round(item.bunga));
    const sisaData = hasil.detailCicilan.map((item) =>
      Math.round(item.sisaPinjaman)
    );

    return {
      labels,
      datasets: [
        {
          label: "Pokok Cicilan",
          data: pokokData,
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          fill: false,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 8,
        },
        {
          label: "Bunga Cicilan",
          data: bungaData,
          borderColor: "#EF4444",
          backgroundColor: "rgba(239, 68, 68, 0.5)",
          fill: false,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 8,
        },
        {
          label: "Sisa Pinjaman",
          data: sisaData,
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.5)",
          fill: false,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 8,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.parsed.y || 0;
            return `${label}: ${formatRupiah(value)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Bulan",
        },
      },
      y: {
        title: {
          display: true,
          text: "Jumlah (Rp)",
        },
        beginAtZero: true,
      },
    },
  };

  // const handleInfoClick = () => {
  //   setShowModal(true);
  // };

  return (
    <SectionContainer
      padded
      className="flex min-h-screen w-full flex-col justify-center items-center mb-20"
    >
      <div className="flex flex-col items-center justify-center space-y-8 max-w-xl w-full p-4">
        <div className="w-full space-y-4 bg-white border-2 p-4 rounded-2xl">
          {/* TIPE BUNGA */}
          <div className="mb-2">
            <div className="flex justify-between items-center">
              <label className="block mb-2">Tipe Perhitungan Bunga:</label>
              <div className="px-2 py-0.5 outline-2 outline-primary rounded-full">
                <button>
                  <FaInfo className="text-xs" />
                </button>
              </div>
            </div>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="majemuk"
                  checked={tipeHitungan === "majemuk"}
                  onChange={() => setTipeHitungan("majemuk")}
                  className="form-radio h-4 w-4 text-primary"
                />
                <span className="ml-2">Bunga Majemuk</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="flat"
                  checked={tipeHitungan === "flat"}
                  onChange={() => setTipeHitungan("flat")}
                  className="form-radio h-4 w-4 text-primary"
                />
                <span className="ml-2">Bunga Flat</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {tipeHitungan === "majemuk"
                ? "Bunga majemuk dihitung berdasarkan sisa pinjaman + bunga sebelumnya (beban bunga makin berat)"
                : "Bunga flat dihitung dari nilai pinjaman awal (lebih rendah dari bunga majemuk)"}
            </p>
          </div>

          {/* PINJAMAN */}
          <label className="block">
            Jumlah Pinjaman (Rp):
            <input
              type="text"
              value={pinjaman}
              onChange={handlePinjamanChange}
              className="mt-1 w-full p-2 border rounded"
              placeholder="Contoh: 1.000.000"
            />
            {errors.pinjaman && (
              <p className="text-red-500 text-sm mt-1">{errors.pinjaman}</p>
            )}
          </label>

          {/* BUNGA */}
          <label className="block">
            Bunga per Bulan (%):
            <input
              type="number"
              min="0"
              step="0.01"
              value={bunga}
              onChange={handleBungaChange}
              className="mt-1 w-full p-2 border rounded"
              placeholder="Contoh: 15"
            />
            {errors.bunga && (
              <p className="text-red-500 text-sm mt-1">{errors.bunga}</p>
            )}
          </label>

          {/* BULAN */}
          <label className="block">
            Lama Pinjaman (bulan):
            <input
              type="number"
              min="1"
              value={bulan}
              onChange={handleBulanChange}
              className="mt-1 w-full p-2 border rounded"
              placeholder="Contoh: 3"
            />
            {errors.bulan && (
              <p className="text-red-500 text-sm mt-1">{errors.bulan}</p>
            )}
          </label>

          {/* TELAT */}
          <label className="block">
            Jumlah Bulan Terlambat:
            <input
              type="number"
              min="0"
              value={telat}
              onChange={handleTelatChange}
              className={`mt-1 w-full p-2 border rounded ${
                !mandatoryFieldsValid ? "bg-gray-100" : ""
              }`}
              placeholder="Opsional"
              disabled={!mandatoryFieldsValid}
            />
            {errors.telat && (
              <p className="text-red-500 text-sm mt-1">{errors.telat}</p>
            )}
          </label>

          {/* DENDA */}
          <label className="block">
            Denda per Bulan Telat (% dari pinjaman awal):
            <input
              type="number"
              min="0"
              step="0.01"
              value={denda}
              onChange={handleDendaChange}
              className={`mt-1 w-full p-2 border rounded ${
                !mandatoryFieldsValid ? "bg-gray-100" : ""
              }`}
              placeholder="Opsional"
              disabled={!mandatoryFieldsValid}
            />
          </label>

          <button
            onClick={hitungSimulasi}
            className="mt-4 w-full bg-primary text-white py-2 rounded shadow hover:opacity-90"
          >
            Hitung Simulasi
          </button>

          <button
            onClick={resetForm}
            className="mt-2 w-full bg-gray-300 text-black py-2 rounded shadow hover:opacity-90"
          >
            Reset
          </button>
        </div>

        {hasil && (
          <div className="mt-6 space-y-4 w-full">
            <div className="p-4 bg-red-50 border-l-4 border-red-500 w-full">
              <p>
                <strong>Pokok Pinjaman:</strong>{" "}
                {formatRupiah(parseFloat(cleanNumber(pinjaman)))}
              </p>
              <p>
                <strong>Total pembayaran setelah {bulan} bulan:</strong>{" "}
                {formatRupiah(hasil.totalBayar)}
              </p>
              <p>
                <strong>Angsuran per Bulan:</strong>{" "}
                {formatRupiah(hasil.angsuranPerBulan)}
              </p>
              <p>
                <strong>Denda keterlambatan:</strong>{" "}
                {formatRupiah(hasil.totalDenda)}
              </p>
              <p>
                <strong>Total yang harus dibayar:</strong>{" "}
                <span className="text-red-700 font-bold">
                  {formatRupiah(hasil.totalAkhir)}
                </span>
              </p>
              <p className="mt-2 italic text-sm text-red-700">
                ⚠ Hati-hati! Pinjaman online dengan bunga{" "}
                {tipeHitungan === "majemuk" ? "majemuk" : "flat"} dan denda
                keterlambatan dapat membuat total utang membengkak drastis.
              </p>
            </div>

            {/* Grafik Rincian Cicilan */}
            <div className="mt-4 w-full" style={{ height: 300 }}>
              <h3 className="text-lg font-semibold mb-2">Grafik Cicilan:</h3>
              <div className="bg-white p-4 border rounded-lg shadow h-full">
                <Line data={prepareChartData()} options={chartOptions} />
              </div>
            </div>

            {/* Tambahkan tab untuk melihat data tabel jika diperlukan */}
            <div className="mt-4 w-full">
              <button
                className="text-blue-600 underline focus:outline-none"
                onClick={() => {
                  // Toggle tampilan tabel (bisa diimplementasikan dengan state tambahan)
                  const tableContainer =
                    document.getElementById("tableContainer");
                  if (tableContainer) {
                    tableContainer.style.display =
                      tableContainer.style.display === "none"
                        ? "block"
                        : "none";
                  }
                }}
              >
                Tampilkan/Sembunyikan Data Tabel
              </button>

              <div
                id="tableContainer"
                className="overflow-x-auto mt-2"
                style={{ display: "none" }}
              >
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border">Bulan</th>
                      <th className="py-2 px-4 border">Angsuran</th>
                      <th className="py-2 px-4 border">Pokok</th>
                      <th className="py-2 px-4 border">Bunga</th>
                      <th className="py-2 px-4 border">Sisa Pinjaman</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hasil.detailCicilan.map((cicilan) => (
                      <tr key={cicilan.bulan}>
                        <td className="py-2 px-4 border text-center">
                          {cicilan.bulan}
                        </td>
                        <td className="py-2 px-4 border text-right">
                          {formatRupiah(cicilan.angsuran)}
                        </td>
                        <td className="py-2 px-4 border text-right">
                          {formatRupiah(cicilan.pokok)}
                        </td>
                        <td className="py-2 px-4 border text-right">
                          {formatRupiah(cicilan.bunga)}
                        </td>
                        <td className="py-2 px-4 border text-right">
                          {formatRupiah(cicilan.sisaPinjaman)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};
