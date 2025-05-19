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
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icon components

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
  const [showTable, setShowTable] = useState(false); // State for table visibility

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
      denda: number;
    }>;
  } | null>(null);

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
    if (value === "" || (parseInt(value) > 0 && !value.startsWith("-"))) {
      setBulan(value);
      setErrors((prev) => ({ ...prev, bulan: "" }));
    }
  };

  const handleTelatChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (parseInt(value) >= 0 && !value.startsWith("-"))) {
      setTelat(value);
      setErrors((prev) => ({ ...prev, telat: "" }));
    }
  };

  const handleDendaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
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

    if (tipeHitungan === "majemuk") {
      // Formula bunga majemuk - EMI calculation
      const monthlyRate = bungaNum / 100;
      const numerator =
        pinjamanNum * monthlyRate * Math.pow(1 + monthlyRate, bulanNum);
      const denominator = Math.pow(1 + monthlyRate, bulanNum) - 1;
      angsuranPerBulan = numerator / denominator;
      totalBayar = angsuranPerBulan * bulanNum;
    } else {
      // Bunga flat calculation
      const bungaTotal = pinjamanNum * (bungaNum / 100) * bulanNum;
      totalBayar = pinjamanNum + bungaTotal;
      angsuranPerBulan = totalBayar / bulanNum;
    }

    // Calculate denda per bulan if there's delay
    const dendaPerBulan = telatNum > 0 ? pinjamanNum * (dendaNum / 100) : 0;
    const totalDenda = dendaPerBulan * telatNum;
    const totalAkhir = totalBayar + totalDenda;

    const detailCicilan = [];
    let sisaPinjaman = pinjamanNum;

    for (let i = 1; i <= bulanNum; i++) {
      let bungaBulan = 0;
      let pokok = 0;
      let dendaBulan = 0;

      if (tipeHitungan === "majemuk") {
        // For compound interest, interest is calculated on remaining balance
        bungaBulan = sisaPinjaman * (bungaNum / 100);
        pokok = angsuranPerBulan - bungaBulan;
      } else {
        // For flat interest
        bungaBulan = pinjamanNum * (bungaNum / 100);
        pokok = pinjamanNum / bulanNum;
      }

      // Calculate denda for this month
      if (i > bulanNum - telatNum) {
        dendaBulan = dendaPerBulan;
      }

      sisaPinjaman -= pokok;
      // Ensure we don't get negative values due to rounding
      sisaPinjaman = Math.max(0, sisaPinjaman);

      detailCicilan.push({
        bulan: i,
        angsuran: angsuranPerBulan,
        bunga: bungaBulan,
        pokok: pokok,
        sisaPinjaman: sisaPinjaman,
        denda: dendaBulan,
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
    setShowTable(false);
    setErrors({
      pinjaman: "",
      bunga: "",
      bulan: "",
      telat: "",
    });
  };

  const prepareChartData = () => {
    if (!hasil) return { labels: [], datasets: [] };

    const labels = hasil.detailCicilan.map((item) => item.bulan);

    const pokokData = hasil.detailCicilan.map((item) => Math.round(item.pokok));
    const bungaData = hasil.detailCicilan.map((item) => Math.round(item.bunga));
    const sisaData = hasil.detailCicilan.map((item) =>
      Math.round(item.sisaPinjaman)
    );
    const dendaData = hasil.detailCicilan.map((item) => Math.round(item.denda));

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
        {
          label: "Denda Keterlambatan",
          data: dendaData,
          borderColor: "#8B5CF6",
          backgroundColor: "rgba(139, 92, 246, 0.5)",
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
            return `${label}: Rp ${value.toLocaleString("id-ID")}`;
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

  // Toggle table visibility function
  const toggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <SectionContainer
      padded
      className="flex min-h-[calc(100vh-144px)] w-full flex-col justify-center pt-4 pb-30 lg:max-w-screen-md md:pb-4"
    >
      <div className="flex flex-col items-center justify-center w-full p-4">
        <div className="w-full space-y-4 bg-white border-1 p-4 rounded-2xl ">
          <div className="mb-2 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Label className="block mb-2">Tipe Perhitungan Bunga:</Label>
            </div>
            <div className="flex space-x-4 gap-y-4">
              <Label className="inline-flex items-center">
                <Input
                  type="radio"
                  value="majemuk"
                  checked={tipeHitungan === "majemuk"}
                  onChange={() => setTipeHitungan("majemuk")}
                  className="form-radio h-4 w-4 text-primary"
                />
                <span className="ml-2">Bunga Majemuk</span>
              </Label>
              <Label className="inline-flex items-center">
                <Input
                  type="radio"
                  value="flat"
                  checked={tipeHitungan === "flat"}
                  onChange={() => setTipeHitungan("flat")}
                  className="form-radio h-4 w-4 text-primary"
                />
                <span className="ml-2">Bunga Flat</span>
              </Label>
            </div>
            <p className="text-xs text-gray-500 my-1">
              {tipeHitungan === "majemuk"
                ? "Bunga majemuk dihitung berdasarkan sisa pinjaman (beban bunga semakin ringan seiring waktu)"
                : "Bunga flat dihitung dari nilai pinjaman awal (bunga tetap sepanjang masa pinjaman)"}
            </p>
          </div>

          {/* PINJAMAN */}
          <Label className="flex flex-col items-start">
            Jumlah Pinjaman (Rp):
            <Input
              type="text"
              value={pinjaman}
              onChange={handlePinjamanChange}
              placeholder="Contoh: 1.000.000"
              className="font-normal"
            />
            {errors.pinjaman && (
              <p className="text-red-500 text-sm mt-1">{errors.pinjaman}</p>
            )}
          </Label>

          {/* BUNGA */}
          <Label className="flex flex-col items-start">
            Bunga per Bulan (%):
            <Input
              type="number"
              min="0"
              step="0.01"
              value={bunga}
              onChange={handleBungaChange}
              placeholder="Contoh: 15"
              className="font-normal"
            />
            {errors.bunga && (
              <p className="text-red-500 text-sm mt-1">{errors.bunga}</p>
            )}
          </Label>

          {/* BULAN */}
          <Label className="flex flex-col items-start">
            Lama Pinjaman (bulan):
            <Input
              type="number"
              min="1"
              value={bulan}
              onChange={handleBulanChange}
              placeholder="Contoh: 3"
              className="font-normal"
            />
            {errors.bulan && (
              <p className="text-red-500 text-sm mt-1">{errors.bulan}</p>
            )}
          </Label>

          <Label className="flex flex-col items-start">
            Jumlah Bulan/Hari Terlambat:
            <Input
              type="number"
              min="0"
              value={telat}
              onChange={handleTelatChange}
              className={`font-normal ${
                !mandatoryFieldsValid ? "bg-gray-100" : ""
              }`}
              placeholder="Opsional"
              disabled={!mandatoryFieldsValid}
            />
            {errors.telat && (
              <p className="text-red-500 text-sm mt-1">{errors.telat}</p>
            )}
          </Label>

          <Label className="flex flex-col items-start">
            Denda per Bulan/Hari Telat (% dari pinjaman awal):
            <Input
              type="number"
              min="0"
              step="0.01"
              value={denda}
              onChange={handleDendaChange}
              className={`font-normal ${
                !mandatoryFieldsValid ? "bg-gray-100" : ""
              }`}
              placeholder="Opsional"
              disabled={!mandatoryFieldsValid}
            />
          </Label>

          <Button
            variant={"default"}
            onClick={hitungSimulasi}
            className="mt-4 w-full"
          >
            Hitung Simulasi
          </Button>

          <Button variant={"outline"} onClick={resetForm} className=" w-full">
            Reset
          </Button>
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

            <div className="mt-4 w-full" style={{ height: 300 }}>
              <h3 className="text-lg font-semibold mb-2">Grafik Cicilan:</h3>
              <div className="bg-white p-4 border rounded-lg shadow h-full">
                <Line data={prepareChartData()} options={chartOptions} />
              </div>
            </div>

            <div className="mt-12 w-full flex flex-col">
              <div className="p-4 bg-primary text-white rounded text-center relative overflow-hidden group">
                <button
                  className="flex items-center justify-center w-full space-x-2 focus:outline-none transition-all duration-300"
                  onClick={toggleTable}
                >
                  <span className="font-medium">
                    {showTable
                      ? "Sembunyikan Data Tabel"
                      : "Tampilkan Data Tabel"}
                  </span>
                  <span className="ml-2 transition-transform duration-300">
                    {showTable ? (
                      <ChevronUp className="animate-pulse" size={20} />
                    ) : (
                      <ChevronDown className="animate-bounce" size={20} />
                    )}
                  </span>
                </button>
              </div>

              {showTable && (
                <div className="overflow-x-auto mt-2">
                  <table className="min-w-full bg-white border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border">Bulan</th>
                        <th className="py-2 px-4 border">Angsuran</th>
                        <th className="py-2 px-4 border">Pokok</th>
                        <th className="py-2 px-4 border">Bunga</th>
                        <th className="py-2 px-4 border">Denda</th>
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
                            {formatRupiah(cicilan.denda)}
                          </td>
                          <td className="py-2 px-4 border text-right">
                            {formatRupiah(cicilan.sisaPinjaman)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};
