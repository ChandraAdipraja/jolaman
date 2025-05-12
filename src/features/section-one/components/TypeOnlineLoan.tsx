import { FaCheck } from "react-icons/fa6";
export const TypeOnlineLoan = () => {
  const legalList = [
    {
      name: "Terdaftar di Badan Usaha Milik Negara (BUMN)",
      icon: <FaCheck className="text-primary" />,
    },
    {
      name: "Penawaran Melalui Platform Resmi",
      icon: <FaCheck className="text-primary" />,
    },
    {
      name: "Proses Seleksi dan Verifikasi Kredit",
      icon: <FaCheck className="text-primary" />,
    },
    {
      name: "Bunga, Biaya, dan Denda Transparan ",
      icon: <FaCheck className="text-primary" />,
    },
    {
      name: "Identitas Perusahaan dan Layanan Pengaduan Jelas ",
      icon: <FaCheck className="text-primary" />,
    },
  ];
  const illegalList = [
    {
      name: "Tidak Terdaftar di Badan Usaha Milik Negara (BUMN)",
      icon: <FaCheck className="text-red-500" />,
    },
    {
      name: "Penawaran Melalui Saluran Pribadi (SMS/WhatsApp)",
      icon: <FaCheck className="text-red-500" />,
    },
    {
      name: "Proses Pengajuan Tanpa Verifikasi",
      icon: <FaCheck className="text-red-500" />,
    },
    {
      name: "Bunga, Biaya, dan Denda Tidak Transparan",
      icon: <FaCheck className="text-red-500" />,
    },
    {
      name: "Penagihan dengan Ancaman, Teror, atau Intimidasi",
      icon: <FaCheck className="text-red-500" />,
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center md:gap-y-10">
      <div className="pb-4">
        <h1 className="text-2xl md:text-5xl font-semibold text-secondary text-center">
          Jenis Pinjol
        </h1>
        <p className="text-xs md:text-sm font-semibold text-muted-foreground">
          Cara Membedakan Jenis Pinjol Yang Legal dan Illegal
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:gap-x-5 gap-y-10">
        <div className="flex flex-col bg-white shadow-2xl rounded-2xl p-8 space-y-4">
          <h1 className="text-3xl font-semibold uppercase">Legal</h1>

          <div className="flex flex-col items-center gap-x-5 gap-y-2">
            {legalList.map((item) => (
              <div className="flex items-center self-start gap-x-2 text-sm">
                {item.icon}
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-white shadow-2xl rounded-2xl p-8 space-y-4">
          <h1 className="text-3xl font-semibold uppercase">Illegal</h1>

          <div className="flex flex-col items-center gap-x-5 gap-y-2">
            {illegalList.map((item) => (
              <div className="flex items-center self-start gap-x-2 text-sm">
                {item.icon}
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
